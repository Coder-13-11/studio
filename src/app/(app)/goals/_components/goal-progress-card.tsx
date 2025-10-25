'use client';
import { useState } from 'react';
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
import { WithId } from '@/firebase/firestore/use-collection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { useGoals } from '@/contexts/goals-provider';
import { AddFundsDialog } from './add-funds-dialog';


interface GoalProgressCardProps {
  goal: WithId<Goal>;
}

export function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const { deleteGoal } = useGoals();

  return (
    <>
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{goal.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsAddFundsOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteGoal(goal.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
    <AddFundsDialog goal={goal} isOpen={isAddFundsOpen} onOpenChange={setIsAddFundsOpen} />
    </>
  );
}
