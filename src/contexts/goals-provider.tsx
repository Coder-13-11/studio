'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { Goal } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { WithId } from '@/firebase/firestore/use-collection';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
    const newGoalData = {
      ...goal,
      createdAt: serverTimestamp(),
    };
    addDoc(goalsCollection, newGoalData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: goalsCollection.path,
        operation: 'create',
        requestResourceData: newGoalData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteGoal = (goalId: string) => {
    if (!firestore || !user) return;
    const goalDocRef = doc(firestore, 'users', user.uid, 'goals', goalId);
    deleteDoc(goalDocRef).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: goalDocRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
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
