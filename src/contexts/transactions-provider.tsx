'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Transaction } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase }from '@/firebase';
import { collection, addDoc, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


interface TransactionsContextType {
  transactions: WithId<Transaction>[] | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => void;
  deleteAllTransactions: () => Promise<void>;
  isLoading: boolean;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { firestore, user } = useFirebase();

  const transactionsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'transactions');
  }, [firestore, user]);

  const { data: transactions, isLoading } = useCollection<Transaction>(transactionsCollection);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => {
    if (!transactionsCollection) return;
    const newTransactionData = {
      ...transaction,
      date: transaction.date,
      createdAt: serverTimestamp(),
    };
    addDoc(transactionsCollection, newTransactionData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: transactionsCollection.path,
        operation: 'create',
        requestResourceData: newTransactionData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteAllTransactions = async () => {
    if (!firestore || !user || !transactions) return;
    try {
      const batch = writeBatch(firestore);
      transactions.forEach((transaction) => {
        const transactionDocRef = doc(firestore, 'users', user.uid, 'transactions', transaction.id);
        batch.delete(transactionDocRef);
      });
      await batch.commit();
    } catch (error) {
      console.error("Error deleting all transactions:", error);
      const permissionError = new FirestorePermissionError({
        path: `users/${user.uid}/transactions`,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    }
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, deleteAllTransactions, isLoading }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
