'use server';

// The data passed to this function should be serializable.
export async function getSpendingSuggestions(
  transactions: any[]
) {
  try {
    const { generateSpendingSuggestions } = await import('@/ai/flows/generate-spending-suggestions');
    const result = await generateSpendingSuggestions({
        spendingData: JSON.stringify(transactions),
    });
    return result;
  } catch (error) {
    console.error('Error getting spending suggestions:', error);
    return { error: 'Failed to generate suggestions. Please try again.' };
  }
}
