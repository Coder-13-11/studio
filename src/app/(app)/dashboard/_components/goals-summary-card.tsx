'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
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
      <CardContent className="space-y-4">
        {isLoading && (
          <>
            <div className="flex items-center gap-4">
                <Skeleton className="h-[60px] w-[60px] rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Skeleton className="h-[60px] w-[60px] rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
          </>
        )}
        {!isLoading && goals && goals.length === 0 && (
          <p className="text-center text-muted-foreground">No goals set yet.</p>
        )}
        {!isLoading && goals && goals.slice(0, 2).map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="flex items-center gap-4">
              <ProgressRing progress={progress} size={60} />
              <div className="flex-1">
                <p className="font-medium">{goal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(goal.currentAmount)}{' '}
                  / {' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(goal.targetAmount)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
