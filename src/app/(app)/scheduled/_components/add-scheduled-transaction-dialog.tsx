'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScheduledTransactionForm } from '@/components/forms/scheduled-transaction-form';

interface AddScheduledTransactionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AddScheduledTransactionDialog({
  isOpen,
  onOpenChange,
}: AddScheduledTransactionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Scheduled Transaction</DialogTitle>
          <DialogDescription>
            Set up a recurring income or expense.
          </DialogDescription>
        </DialogHeader>
        <ScheduledTransactionForm onFinished={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
