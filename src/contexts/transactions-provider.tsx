'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Transaction } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';

interface TransactionsContextType {
  transactions: WithId<Transaction>[] | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'> & { date: Date }) => void;
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
    addDoc(transactionsCollection, {
      ...transaction,
      date: transaction.date,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, isLoading }}>
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
