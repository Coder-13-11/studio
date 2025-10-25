'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTransactions } from '@/contexts/transactions-provider';
import { CategoryIcon } from '@/components/category-icon';

export function RecentTransactionsCard() {
  const { transactions } = useTransactions();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest income and expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground">No transactions yet.</p>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-4">
                <CategoryIcon category={transaction.category} />
                <div className="flex-1">
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {isClient ? new Date(transaction.date).toLocaleDateString() : ''}
                  </p>
                </div>
                <div className="flex items-center text-right">
                  <span
                    className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-foreground'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{' '}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(transaction.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
