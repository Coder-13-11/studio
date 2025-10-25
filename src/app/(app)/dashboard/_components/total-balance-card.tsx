'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { transactions } from '@/lib/data';
import { useMemo } from 'react';

export function TotalBalanceCard() {
  const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;
    return { totalBalance, totalIncome, totalExpenses };
  }, []);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardDescription>Total Balance</CardDescription>
        <CardTitle className="font-headline text-4xl">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(totalBalance)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
              <ArrowUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(totalIncome)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/50">
              <ArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expenses</p>
              <p className="font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(totalExpenses)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
