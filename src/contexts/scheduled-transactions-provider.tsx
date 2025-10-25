'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { ScheduledTransaction } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface ScheduledTransactionsContextType {
  scheduledTransactions: WithId<ScheduledTransaction>[] | null;
  addScheduledTransaction: (transaction: Omit<ScheduledTransaction, 'id' | 'startDate'> & { startDate: Date }) => void;
  deleteScheduledTransaction: (transactionId: string) => void;
  isLoading: boolean;
}

const ScheduledTransactionsContext = createContext<ScheduledTransactionsContextType | undefined>(undefined);

export function ScheduledTransactionsProvider({ children }: { children: ReactNode }) {
  const { firestore, user } = useFirebase();

  const scheduledTransactionsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'scheduledTransactions');
  }, [firestore, user]);

  const { data: scheduledTransactions, isLoading } = useCollection<ScheduledTransaction>(scheduledTransactionsCollection);

  const addScheduledTransaction = (transaction: Omit<ScheduledTransaction, 'id' | 'startDate'> & { startDate: Date }) => {
    if (!scheduledTransactionsCollection) return;
    const newTransactionData = {
      ...transaction,
      startDate: transaction.startDate,
      createdAt: serverTimestamp(),
    };
    addDoc(scheduledTransactionsCollection, newTransactionData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: scheduledTransactionsCollection.path,
        operation: 'create',
        requestResourceData: newTransactionData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteScheduledTransaction = (transactionId: string) => {
    if (!firestore || !user) return;
    const transactionDocRef = doc(firestore, 'users', user.uid, 'scheduledTransactions', transactionId);
    deleteDoc(transactionDocRef).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: transactionDocRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  return (
    <ScheduledTransactionsContext.Provider value={{ scheduledTransactions, addScheduledTransaction, deleteScheduledTransaction, isLoading }}>
      {children}
    </ScheduledTransactionsContext.Provider>
  );
}

export function useScheduledTransactions() {
  const context = useContext(ScheduledTransactionsContext);
  if (context === undefined) {
    throw new Error('useScheduledTransactions must be used within a ScheduledTransactionsProvider');
  }
  return context;
}
