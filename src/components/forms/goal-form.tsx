'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
import { useGoals } from '@/contexts/goals-provider';

const formSchema = z.object({
  name: z.string().min(2, 'Goal name must be at least 2 characters.'),
  targetAmount: z.coerce.number().positive('Target amount must be positive.'),
  currentAmount: z.coerce.number().min(0, 'Current amount cannot be negative.').optional(),
});

type GoalFormValues = z.infer<typeof formSchema>;

interface GoalFormProps {
  onFinished?: () => void;
}

export function GoalForm({ onFinished }: GoalFormProps) {
  const { toast } = useToast();
  const { addGoal } = useGoals();
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      targetAmount: 0,
      currentAmount: 0,
    },
  });

  function onSubmit(values: GoalFormValues) {
    addGoal({ ...values, currentAmount: values.currentAmount || 0 });
    toast({
      title: 'Goal Created!',
      description: `You've set a new goal: "${values.name}".`,
    });
    form.reset();
    onFinished?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New Laptop" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="currentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Amount (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="secondary">
          Save Goal
        </Button>
      </form>
    </Form>
  );
}
