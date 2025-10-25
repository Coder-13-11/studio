'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TransactionForm } from '@/components/forms/transaction-form';

interface AddTransactionDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AddTransactionDialog({ isOpen, onOpenChange }: AddTransactionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Log a new income or expense to keep your finances up to date.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm onFinished={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
