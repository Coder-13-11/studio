'use client';
import { useState } from 'react';
import { Plus, Landmark, Trophy, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddTransactionDialog } from '@/app/(app)/dashboard/_components/add-transaction-dialog';
import { AddGoalDialog } from '@/app/(app)/goals/_components/add-goal-dialog';
import { AddScheduledTransactionDialog } from '@/app/(app)/scheduled/_components/add-scheduled-transaction-dialog';

export function GlobalAddButton() {
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [scheduledOpen, setScheduledOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
            size="icon"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="end" className="w-56">
          <DropdownMenuItem onSelect={() => setTransactionOpen(true)}>
            <Landmark className="mr-2 h-4 w-4" />
            <span>New Transaction</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setGoalOpen(true)}>
            <Trophy className="mr-2 h-4 w-4" />
            <span>New Goal</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setScheduledOpen(true)}>
            <CalendarClock className="mr-2 h-4 w-4" />
            <span>New Scheduled</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddTransactionDialog isOpen={transactionOpen} onOpenChange={setTransactionOpen} />
      <AddGoalDialog isOpen={goalOpen} onOpenChange={setGoalOpen} />
      <AddScheduledTransactionDialog isOpen={scheduledOpen} onOpenChange={setScheduledOpen} />
    </>
  );
}
