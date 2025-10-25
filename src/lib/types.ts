import type { LucideIcon } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: Date | Timestamp | string;
  note?: string;
  createdAt: Date | Timestamp | string;
};

export type Category = {
  id:string;
  name: string;
  icon: LucideIcon;
  color: string;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date | Timestamp | string;
  createdAt: Date | Timestamp | string;
};

export type ScheduledTransaction = {
    id: string;
    name: string;
    amount: number;
    category: string;
    recurrenceType: 'Monthly' | 'Weekly' | 'Bi-weekly';
    recurrenceDay: number;
    startDate: Date | Timestamp | string;
    createdAt: Date | Timestamp | string;
};
