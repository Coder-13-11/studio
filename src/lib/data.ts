import { Car, UtensilsCrossed, ShoppingBag, Ticket, HeartPulse, Home, Landmark } from 'lucide-react';
import type { Category } from './types';

export const categories: Category[] = [
  { id: 'food', name: 'Food', icon: UtensilsCrossed, color: 'hsl(var(--chart-3))' },
  { id: 'transport', name: 'Transport', icon: Car, color: 'hsl(var(--chart-4))' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'hsl(var(--chart-5))' },
  { id: 'entertainment', name: 'Entertainment', icon: Ticket, color: 'hsl(var(--chart-2))' },
  { id: 'health', name: 'Health', icon: HeartPulse, color: 'hsl(var(--chart-1))' },
  { id: 'utilities', name: 'Utilities', icon: Home, color: 'hsl(var(--chart-3))' },
  { id: 'income', name: 'Income', icon: Landmark, color: 'hsl(var(--chart-1))' },
];
