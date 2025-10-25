'use client';
import { PageHeader } from '@/components/page-header';
import { useGoals } from '@/contexts/goals-provider';
import { AddGoalDialog } from './_components/add-goal-dialog';
import { GoalProgressCard } from './_components/goal-progress-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function GoalsPage() {
  const { goals, isLoading } = useGoals();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Savings Goals"
          description="Track your progress and stay motivated."
        />
        <AddGoalDialog />
      </div>

      {isLoading && (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {!isLoading && goals && goals.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalProgressCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      {!isLoading && goals && goals.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/20 py-12 text-center">
            <h3 className="text-lg font-semibold">No goals yet</h3>
            <p className="text-sm text-muted-foreground">Get started by creating a new savings goal.</p>
            <div className="mt-4">
              <AddGoalDialog />
            </div>
        </div>
      )}
    </>
  );
}
