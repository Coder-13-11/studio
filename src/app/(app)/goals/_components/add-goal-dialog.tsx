'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GoalForm } from '@/components/forms/goal-form';

interface AddGoalDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AddGoalDialog({ isOpen, onOpenChange }: AddGoalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Goal</DialogTitle>
          <DialogDescription>
            Set a target and start saving for something important.
          </DialogDescription>
        </DialogHeader>
        <GoalForm onFinished={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
