'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Goal } from '@/lib/types';

interface GoalProgressCardProps {
  goal: Goal;
}

export function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
        <CardDescription>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(goal.currentAmount)}{' '}
          / {' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(goal.targetAmount)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Progress value={progress} />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">{progress.toFixed(0)}% complete</p>
      </CardFooter>
    </Card>
  );
}
