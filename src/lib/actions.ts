'use server';

// The data passed to this function should be serializable.
export async function getFinancialInsights(
  transactions: any[],
  goals: any[]
) {
  try {
    const { generateFinancialInsights } = await import('@/ai/flows/generate-financial-insights');
    const result = await generateFinancialInsights({
        spendingData: JSON.stringify(transactions),
        savingsGoals: JSON.stringify(goals),
    });
    return result;
  } catch (error) {
    console.error('Error getting financial insights:', error);
    return { error: 'Failed to generate insights. Please try again.' };
  }
}
