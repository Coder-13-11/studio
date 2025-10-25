'use client';

import { useState } from 'react';
import { Lightbulb, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { getFinancialInsights } from '@/lib/actions';
import type { FinancialInsightsOutput } from '@/ai/flows/generate-financial-insights';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactions } from '@/contexts/transactions-provider';

export function InsightsList() {
  const [insights, setInsights] = useState<FinancialInsightsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { transactions } = useTransactions();

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);
    setInsights(null);
    try {
      const result = await getFinancialInsights(transactions);
      if ('error' in result) {
        setError(result.error as string);
      } else {
        setInsights(result);
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    }
    setLoading(false);
  };

  const InsightIcon = ({ score }: { score: number }) => {
    if (score > 0.8) return <TrendingUp className="h-6 w-6 text-green-500" />;
    if (score < 0.3) return <TrendingDown className="h-6 w-6 text-red-500" />;
    return <Lightbulb className="h-6 w-6 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Sparkles className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-semibold">Ready for Your Financial Check-up?</h3>
            <p className="max-w-md text-muted-foreground">
              Click the button below to analyze your recent spending and savings goals. Our AI will provide personalized tips to help you stay on track.
            </p>
            <Button onClick={handleGenerateInsights} disabled={loading}>
              {loading ? 'Analyzing...' : 'Generate Insights'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-center text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {insights && (
        <div className="space-y-4">
          {insights.insights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="mt-1">
                  <InsightIcon score={insight.relevanceScore} />
                </div>
                <p className="flex-1 text-card-foreground">{insight.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
