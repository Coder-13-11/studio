import { PageHeader } from '@/components/page-header';
import { goals } from '@/lib/data';
import { AddGoalDialog } from './_components/add-goal-dialog';
import { GoalProgressCard } from './_components/goal-progress-card';

export default function GoalsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Savings Goals"
          description="Track your progress and stay motivated."
        />
        <AddGoalDialog />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalProgressCard key={goal.id} goal={goal} />
        ))}
      </div>
    </>
  );
}
