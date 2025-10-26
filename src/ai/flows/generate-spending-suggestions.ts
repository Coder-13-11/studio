'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating spending suggestions based on user transactions.
 *
 * It exports:
 * - `generateSpendingSuggestions`: An async function to generate suggestions.
 * - `SpendingSuggestionsInput`: The input type for the function.
 * - `SpendingSuggestionsOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingSuggestionsInputSchema = z.object({
  spendingData: z.string().describe('A stringified JSON array of expense objects, each with category, amount, and date.'),
});

export type SpendingSuggestionsInput = z.infer<typeof SpendingSuggestionsInputSchema>;

const SpendingSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A short, actionable suggestion to improve spending habits.')
  ).describe('An array of 2-3 personalized spending suggestions based on the data.'),
});

export type SpendingSuggestionsOutput = z.infer<typeof SpendingSuggestionsOutputSchema>;


export async function generateSpendingSuggestions(input: SpendingSuggestionsInput): Promise<SpendingSuggestionsOutput> {
  return generateSpendingSuggestionsFlow(input);
}


const prompt = ai.definePrompt({
  name: 'spendingSuggestionsPrompt',
  input: {schema: SpendingSuggestionsInputSchema},
  output: {schema: SpendingSuggestionsOutputSchema},
  prompt: `You are a friendly and encouraging financial advisor. Analyze the user's spending data and provide 2-3 short, actionable, and positive suggestions. Focus on identifying the highest spending categories and suggest simple, realistic adjustments. Do not be judgmental.

  Spending Data: {{{spendingData}}}

  Example Output:
  - "You're doing great with your budget! One area to watch is 'Food'. Maybe try swapping one dine-out meal for a home-cooked one this week?"
  - "Your 'Shopping' expenses were a bit high this month. Setting a small, specific budget for that category could make a big difference!"
`,
});

const generateSpendingSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSpendingSuggestionsFlow',
    inputSchema: SpendingSuggestionsInputSchema,
    outputSchema: SpendingSuggestionsOutputSchema,
  },
  async input => {
    try {
      // Basic validation
      const spendingData = JSON.parse(input.spendingData);
      if (!Array.isArray(spendingData)) {
        throw new Error('Spending data must be an array.');
      }
      
      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error('Error in generateSpendingSuggestionsFlow:', error);
      throw new Error(`Failed to generate spending suggestions: ${error.message}`);
    }
  }
);
