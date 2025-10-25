'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import type { ScheduledTransaction } from '@/lib/types';
import { WithId } from '@/firebase';
import { CategoryIcon } from '@/components/category-icon';
import { useScheduledTransactions } from '@/contexts/scheduled-transactions-provider';

interface ScheduledTransactionCardProps {
  transaction: WithId<ScheduledTransaction>;
}

export function ScheduledTransactionCard({ transaction }: ScheduledTransactionCardProps) {
  const { deleteScheduledTransaction } = useScheduledTransactions();

  const getRecurrenceText = () => {
    switch (transaction.recurrenceType) {
        case 'Monthly':
            const suffix = ['th', 'st', 'nd', 'rd'][transaction.recurrenceDay % 100 > 10 && transaction.recurrenceDay % 100 < 14 ? 0 : transaction.recurrenceDay % 10] || 'th';
            return `On the ${transaction.recurrenceDay}${suffix} of each month`;
        case 'Weekly':
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return `Every ${days[transaction.recurrenceDay]}`;
        case 'Bi-weekly':
            const biweeklyDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return `Every other ${biweeklyDays[transaction.recurrenceDay]}`;
        default:
            return '';
    }
  }

  const isIncome = transaction.category === 'Income';

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <CategoryIcon category={transaction.category} />
            <div>
              <CardTitle>{transaction.name}</CardTitle>
              <CardDescription className={`font-semibold ${isIncome ? 'text-green-600' : 'text-foreground'}`}>
                {isIncome ? '+' : '-'}{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(transaction.amount)}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => deleteScheduledTransaction(transaction.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
       <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{getRecurrenceText()}</p>
      </CardContent>
       <CardFooter>
         <p className="text-xs text-muted-foreground">
            Next occurrence will be processed automatically.
          </p>
      </CardFooter>
    </Card>
  );
}
