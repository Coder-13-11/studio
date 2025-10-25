'use server';

import { generateFinancialInsights } from '@/ai/flows/generate-financial-insights';
import { Goal, Transaction } from './types';
import { WithId } from '@/firebase/firestore/use-collection';

export async function getFinancialInsights(currentTransactions: WithId<Transaction>[], currentGoals: WithId<Goal>[]) {
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
