'use client';

import { useEffect, useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFinancialInsights } from '@/lib/actions';
import { useTransactions } from '@/contexts/transactions-provider';
import { useGoals } from '@/contexts/goals-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { WithId } from '@/firebase';
import { Goal, Transaction } from '@/lib/types';
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

export function InsightsCard() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { transactions, isLoading: transactionsLoading } = useTransactions();
  const { goals, isLoading: goalsLoading } = useGoals();

  const fetchInsight = async () => {
    if (!transactions || transactions.length === 0 || !goals) return;

    setLoading(true);
    setInsight(null);
    try {
       const serializableTransactions = serializeData<Transaction>(transactions);
      const serializableGoals = serializeData<Goal>(goals);

      const result = await getFinancialInsights(serializableTransactions, serializableGoals);
      if ('error' in result) {
        console.error(result.error);
      } else if (result.insights.length > 0) {
        const topInsight = result.insights.sort((a, b) => b.relevanceScore - a.relevanceScore)[0];
        setInsight(topInsight.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!transactionsLoading && !goalsLoading) {
      fetchInsight();
    }
  }, [transactionsLoading, goalsLoading]);

  if (transactionsLoading || goalsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI-Powered Insight</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (!insight && !loading) {
    return null; // Don't show card if no transactions to analyze
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>AI-Powered Insight</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start gap-4">
        <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-yellow-500" />
        <div className="flex-1 space-y-3">
          {loading ? (
             <Skeleton className="h-12 w-full" />
          ) : (
            <p className="text-sm text-card-foreground">
              {insight}
            </p>
          )}
          <Button variant="link" size="sm" className="h-auto p-0" onClick={fetchInsight} disabled={loading}>
            Get another tip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
