'use client';
import { PageHeader } from '@/components/page-header';
import { useScheduledTransactions } from '@/contexts/scheduled-transactions-provider';
import { ScheduledTransactionCard } from './_components/scheduled-transaction-card';
import { Skeleton } from '@/components/ui/skeleton';
import { AddScheduledTransactionDialog } from './_components/add-scheduled-transaction-dialog';

export default function ScheduledTransactionsPage() {
  const { scheduledTransactions, isLoading } = useScheduledTransactions();

  return (
    <>
       <PageHeader
          title="Scheduled Transactions"
          description="Manage your recurring income and expenses."
        />

      {isLoading && (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      )}

      {!isLoading && scheduledTransactions && scheduledTransactions.length > 0 && (
        <div className="page-content grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scheduledTransactions.map((transaction) => (
            <ScheduledTransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}

      {!isLoading && scheduledTransactions && scheduledTransactions.length === 0 && (
        <div className="page-content flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/20 py-12 text-center">
            <h3 className="text-lg font-semibold">No Scheduled Transactions Yet</h3>
            <p className="text-sm text-muted-foreground">Get started by creating a new recurring transaction.</p>
             <p className="mt-4 text-sm text-muted-foreground">Click the + button in the bottom right to add a new scheduled transaction.</p>
        </div>
      )}
    </>
  );
}
