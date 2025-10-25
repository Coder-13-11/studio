'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { categories } from '@/lib/data';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useScheduledTransactions } from '@/contexts/scheduled-transactions-provider';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
  category: z.string({ required_error: 'Please select a category.' }),
  recurrenceType: z.enum(['Weekly', 'Bi-weekly', 'Monthly'], { required_error: 'Please select a recurrence type.' }),
  recurrenceDay: z.coerce.number().int().min(0),
});

type ScheduledTransactionFormValues = z.infer<typeof formSchema>;

interface ScheduledTransactionFormProps {
  onFinished?: () => void;
}

export function ScheduledTransactionForm({ onFinished }: ScheduledTransactionFormProps) {
  const { toast } = useToast();
  const { addScheduledTransaction } = useScheduledTransactions();
  const form = useForm<ScheduledTransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: undefined,
      category: '',
      recurrenceDay: undefined,
    },
  });

  const recurrenceType = form.watch('recurrenceType');
  const category = form.watch('category');

  function onSubmit(values: ScheduledTransactionFormValues) {
    addScheduledTransaction({
      ...values,
      startDate: new Date(), // Set start date to now
    });
    toast({
      title: 'Scheduled Transaction Created!',
      description: `Your recurring transaction "${values.name}" has been set up.`,
    });
    form.reset();
    onFinished?.();
  }
  
  const isIncome = category === 'Income';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Salary, Rent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="1000.00" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                        {category.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="recurrenceType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How often does this repeat?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl><RadioGroupItem value="Weekly" /></FormControl>
                    <FormLabel className="font-normal">Weekly</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl><RadioGroupItem value="Bi-weekly" /></FormControl>
                    <FormLabel className="font-normal">Bi-weekly</FormLabel>
                  </FormItem>
                   <FormItem className="flex items-center space-x-2">
                    <FormControl><RadioGroupItem value="Monthly" /></FormControl>
                    <FormLabel className="font-normal">Monthly</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {recurrenceType === 'Weekly' && (
            <FormField
                control={form.control}
                name="recurrenceDay"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Day of the week</FormLabel>
                    <Select onValueChange={(val) => field.onChange(Number(val))} value={String(field.value)}>
                        <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a day" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => (
                                <SelectItem key={day} value={String(i)}>{day}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
        )}
        {recurrenceType === 'Bi-weekly' && (
             <FormField
                control={form.control}
                name="recurrenceDay"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Day of the week</FormLabel>
                    <Select onValueChange={(val) => field.onChange(Number(val))} value={String(field.value)}>
                        <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a day" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => (
                                <SelectItem key={day} value={String(i)}>{day}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
        )}
        {recurrenceType === 'Monthly' && (
            <FormField
                control={form.control}
                name="recurrenceDay"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Day of the month</FormLabel>
                    <FormControl>
                        <Input type="number" min="1" max="31" placeholder="e.g., 15" {...field} value={field.value ?? ''}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        )}


        <Button type="submit" className="w-full" variant="secondary" disabled={!recurrenceType || form.getValues('recurrenceDay') === undefined}>
          Save Scheduled Transaction
        </Button>
      </form>
    </Form>
  );
}
