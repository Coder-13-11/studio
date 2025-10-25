'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGoals } from '@/contexts/goals-provider';
import { Skeleton } from '@/components/ui/skeleton';

export function GoalsSummaryCard() {
  const { goals, isLoading } = useGoals();
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Goals</CardTitle>
          <CardDescription>Your savings progress.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href="/goals">View All</a>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
          <>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </>
        )}
        {!isLoading && goals && goals.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No goals set yet.
          </p>
        )}
        {!isLoading &&
          goals &&
          goals.slice(0, 2).map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>{goal.name}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(goal.currentAmount)}
                  </span>
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(goal.targetAmount)}
                  </span>
                </div>
                <Progress value={progress} />
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
