
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTransactions } from '@/contexts/transactions-provider';
import { CategoryIcon } from '@/components/category-icon';
import { Skeleton } from '@/components/ui/skeleton';
import { Timestamp } from 'firebase/firestore';

export function RecentTransactionsCard() {
  const { transactions, isLoading } = useTransactions();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (date: string | Date | Timestamp) => {
    if (!isClient) {
      return '';
    }
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };
  
  const recentTransactions = useMemo(() => {
    return (transactions ?? [])
      .sort((a, b) => {
        const dateA = a.date instanceof Timestamp ? a.date.toMillis() : new Date(a.date).getTime();
        const dateB = b.date instanceof Timestamp ? b.date.toMillis() : new Date(b.date).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [transactions]);


  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest income and expenses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-5 w-1/4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-5 w-1/4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-5 w-1/4" />
          </div>
        </CardContent>
      </Card>
    )
  }

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
                  <p className="font-medium">{transaction.note || transaction.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
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
