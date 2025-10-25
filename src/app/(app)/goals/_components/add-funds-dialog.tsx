'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoals } from '@/contexts/goals-provider';
import type { Goal } from '@/lib/types';
import { WithId } from '@/firebase/firestore/use-collection';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  amount: z.coerce.number().positive('Amount must be a positive number.'),
});

type AddFundsFormValues = z.infer<typeof formSchema>;

interface AddFundsDialogProps {
  goal: WithId<Goal>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFundsDialog({ goal, isOpen, onOpenChange }: AddFundsDialogProps) {
  const { updateGoal } = useGoals();
  const { toast } = useToast();

  const form = useForm<AddFundsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  function onSubmit(values: AddFundsFormValues) {
    const newCurrentAmount = goal.currentAmount + values.amount;
    const updatedGoal = {
      ...goal,
      currentAmount: Math.min(newCurrentAmount, goal.targetAmount),
    };
    updateGoal(updatedGoal);
    toast({
      title: 'Funds Added!',
      description: `${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(values.amount)} added to your "${goal.name}" goal.`,
    });
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds to "{goal.name}"</DialogTitle>
          <DialogDescription>
            How much would you like to add to this goal?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
