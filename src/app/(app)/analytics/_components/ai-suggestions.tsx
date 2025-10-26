'use client';

import { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/contexts/transactions-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { getSpendingSuggestions } from '@/lib/actions';
import { WithId } from '@/firebase';
import { Transaction } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

function serializeData<T extends { createdAt?: any; deadline?: any; date?: any }>(
  items: WithId<T>[]
): T[] {
  return items.map((item: WithId<T>) => {
    const { id, ...remaningData } = item;
    const serializedItem: any = { ...remaningData };

    if (remaningData.createdAt instanceof Timestamp) {
      serializedItem.createdAt = remaningData.createdAt.toDate().toISOString();
    }
    if (remaningData.deadline instanceof Timestamp) {
      serializedItem.deadline = remaningData.deadline.toDate().toISOString();
    }
    if (remaningData.date instanceof Timestamp) {
      serializedItem.date = remaningData.date.toDate().toISOString();
    }
    return serializedItem as T;
  });
}

export function AiSuggestions() {
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { transactions, isLoading: transactionsLoading } = useTransactions();

  const handleGenerateSuggestions = async () => {
    if (!transactions || transactions.length === 0) {
      setError('No transaction data to analyze yet.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const expenseTransactions = transactions.filter(t => t.type === 'expense');
      const serializableTransactions = serializeData<Transaction>(expenseTransactions);

      const result = await getSpendingSuggestions(serializableTransactions);

      if ('error' in result) {
        setError(result.error as string);
      } else {
        setSuggestions(result.suggestions);
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>AI Spending Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!suggestions && !loading && (
            <div className="flex flex-col items-center justify-center gap-2 text-center">
                 <p className="text-sm text-muted-foreground">
                    Click the button to get personalized tips based on your spending.
                </p>
                <Button onClick={handleGenerateSuggestions} disabled={transactionsLoading}>
                    {transactionsLoading ? 'Loading Data...' : 'Analyze My Spending'}
                </Button>
            </div>
        )}

        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {suggestions && (
          <div className="space-y-4">
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-yellow-500" />
                  <p className="flex-1 text-sm text-card-foreground">
                    {suggestion}
                  </p>
                </li>
              ))}
            </ul>
             <Button variant="link" size="sm" className="h-auto p-0" onClick={handleGenerateSuggestions}>
                Get new suggestions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
