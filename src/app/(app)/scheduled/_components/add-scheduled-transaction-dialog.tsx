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
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScheduledTransactionForm } from '@/components/forms/scheduled-transaction-form';

export function AddScheduledTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          New Scheduled Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Scheduled Transaction</DialogTitle>
          <DialogDescription>
            Set up a recurring income or expense.
          </DialogDescription>
        </DialogHeader>
        <ScheduledTransactionForm onFinished={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
