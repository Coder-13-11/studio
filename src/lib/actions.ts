'use server';

import { generateFinancialInsights } from '@/ai/flows/generate-financial-insights';
import { Goal, Transaction } from './types';

// The data passed to this function should be serializable.
export async function getFinancialInsights(currentTransactions: Transaction[], currentGoals: Goal[]) {
  try {
    const insights = await generateFinancialInsights({
      spendingData: JSON.stringify(currentTransactions),
      savingsGoals: JSON.stringify(currentGoals),
    });
    return insights;
  } catch (error) {
    console.error('Error getting financial insights:', error);
    return { error: 'Failed to generate insights. Please try again.' };
  }
}
