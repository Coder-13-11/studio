'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Goal } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';

interface GoalsContextType {
  goals: WithId<Goal>[] | null;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  deleteGoal: (goalId: string) => void;
  isLoading: boolean;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const { firestore, user } = useFirebase();

  const goalsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'goals');
  }, [firestore, user]);

  const { data: goals, isLoading } = useCollection<Goal>(goalsCollection);

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    if (!goalsCollection) return;
    addDoc(goalsCollection, {
      ...goal,
      createdAt: serverTimestamp(),
    });
  };

  const deleteGoal = (goalId: string) => {
    if (!firestore || !user) return;
    const goalDocRef = doc(firestore, 'users', user.uid, 'goals', goalId);
    deleteDoc(goalDocRef);
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, deleteGoal, isLoading }}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}
