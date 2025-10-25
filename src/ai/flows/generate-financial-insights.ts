'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized financial insights based on user spending habits.
 *
 * It exports:
 * - `generateFinancialInsights`: An async function to generate financial insights.
 * - `FinancialInsightsInput`: The input type for the function.
 * - `FinancialInsightsOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialInsightsInputSchema = z.object({
  spendingData: z.string().describe('A stringified JSON array of spending objects, each with category, amount, date, and optional note.'),
  savingsGoals: z.string().describe('A stringified JSON array of savings goals, each with a target amount and current progress.'),
});

export type FinancialInsightsInput = z.infer<typeof FinancialInsightsInputSchema>;

const FinancialInsightsOutputSchema = z.object({
  insights: z.array(
    z.object({
      message: z.string().describe('A personalized financial insight or suggestion.'),
      relevanceScore: z.number().describe('A score indicating the relevance of the insight to the user, from 0 to 1.'),
    })
  ).describe('An array of financial insights and suggestions.'),
});

export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

export async function generateFinancialInsights(input: FinancialInsightsInput): Promise<FinancialInsightsOutput> {
  return generateFinancialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a personal finance advisor providing insights and suggestions based on spending data and savings goals.

  Analyze the provided spending data and savings goals to identify patterns, trends, and areas for improvement.
  Provide personalized, actionable insights that the user can use to improve their financial health. The insights should feel encouraging, and actionable, not judgemental.

  Consider factors like spending habits (e.g., dining out, entertainment), savings progress, and overall financial goals when generating insights.
  Reason about when the AI should incorporate this information into a users daily routine, so the user can feel in control of their money and not judged.

  Spending Data: {{{spendingData}}}
  Savings Goals: {{{savingsGoals}}}

  Format your output as a JSON array of objects, where each object has a message and relevanceScore.
  The relevanceScore should be a number between 0 and 1, indicating how relevant the insight is to the user.
`,
});

const generateFinancialInsightsFlow = ai.defineFlow(
  {
    name: 'generateFinancialInsightsFlow',
    inputSchema: FinancialInsightsInputSchema,
    outputSchema: FinancialInsightsOutputSchema,
  },
  async input => {
    try {
      // Parse the stringified JSON data
      const spendingData = JSON.parse(input.spendingData);
      const savingsGoals = JSON.parse(input.savingsGoals);

      // Basic validation (can be expanded)
      if (!Array.isArray(spendingData)) {
        throw new Error('Spending data must be an array.');
      }
      if (!Array.isArray(savingsGoals)) {
        throw new Error('Savings goals must be an array.');
      }

      const {output} = await prompt(input);
      return output!;
    } catch (error: any) {
      console.error('Error in generateFinancialInsightsFlow:', error);
      throw new Error(`Failed to generate financial insights: ${error.message}`);
    }
  }
);
