'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TransactionForm } from '@/components/forms/transaction-form';

export function AddTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-8 w-8" />
        <span className="sr-only">Add Transaction</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Log a new income or expense to keep your finances up to date.
            </DialogDescription>
          </DialogHeader>
          <TransactionForm onFinished={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
