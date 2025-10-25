import { Car, UtensilsCrossed, ShoppingBag, Ticket, HeartPulse, Home, Landmark } from 'lucide-react';
import type { Transaction, Category, Goal } from './types';

export const categories: Category[] = [
  { id: 'food', name: 'Food', icon: UtensilsCrossed, color: 'hsl(var(--chart-3))' },
  { id: 'transport', name: 'Transport', icon: Car, color: 'hsl(var(--chart-4))' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'hsl(var(--chart-5))' },
  { id: 'entertainment', name: 'Entertainment', icon: Ticket, color: 'hsl(var(--chart-2))' },
  { id: 'health', name: 'Health', icon: HeartPulse, color: 'hsl(var(--chart-1))' },
  { id: 'utilities', name: 'Utilities', icon: Home, color: 'hsl(var(--chart-3))' },
  { id: 'income', name: 'Income', icon: Landmark, color: 'hsl(var(--chart-1))' },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'expense', category: 'Food', amount: 12.5, date: new Date('2024-07-20') },
  { id: '2', type: 'expense', category: 'Transport', amount: 25, date: new Date('2024-07-20'), note: 'Train ticket' },
  { id: '3', type: 'income', category: 'Income', amount: 1500, date: new Date('2024-07-19'), note: 'Paycheck' },
  { id: '4', type: 'expense', category: 'Shopping', amount: 75, date: new Date('2024-07-18') },
  { id: '5', type: 'expense', category: 'Entertainment', amount: 40, date: new Date('2024-07-17'), note: 'Movie tickets' },
  { id: '6', type: 'expense', category: 'Food', amount: 22, date: new Date('2024-07-16') },
  { id: '7', type: 'expense', category: 'Utilities', amount: 120, date: new Date('2024-07-15'), note: 'Electricity bill' },
  { id: '8', type: 'expense', category: 'Health', amount: 50, date: new Date('2024-07-14'), note: 'Pharmacy' },
];

export const goals: Goal[] = [
  { id: '1', name: 'Save for Vacation', targetAmount: 1000, currentAmount: 350 },
  { id: '2', name: 'New Laptop', targetAmount: 1200, currentAmount: 900 },
  { id: '3', name: 'Emergency Fund', targetAmount: 5000, currentAmount: 4800 },
];
