'use server';

import { generateFinancialInsights } from '@/ai/flows/generate-financial-insights';
import { transactions, goals } from '@/lib/data';

export async function getFinancialInsights() {
  try {
    const insights = await generateFinancialInsights({
      spendingData: JSON.stringify(transactions),
      savingsGoals: JSON.stringify(goals),
    });
    return insights;
  } catch (error) {
    console.error('Error getting financial insights:', error);
    return { error: 'Failed to generate insights. Please try again.' };
  }
}
