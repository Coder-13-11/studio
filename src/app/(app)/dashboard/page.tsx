'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { TotalBalanceCard } from './_components/total-balance-card';
import { GoalsSummaryCard } from './_components/goals-summary-card';
import { SpendingChart } from './_components/spending-chart';
import { RecentTransactionsCard } from './_components/recent-transactions-card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useTransactions } from '@/contexts/transactions-provider';
import { useGoals } from '@/contexts/goals-provider';
import { useScheduledTransactions } from '@/contexts/scheduled-transactions-provider';
import { Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { deleteAllTransactions } = useTransactions();
  const { deleteAllGoals } = useGoals();
  const { deleteAllScheduledTransactions } = useScheduledTransactions();
  const { toast } = useToast();
  const router = useRouter();

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await Promise.all([
        deleteAllTransactions(),
        deleteAllGoals(),
        deleteAllScheduledTransactions(),
      ]);
      toast({
        title: 'Data Reset Successfully',
        description: 'All your personal data has been cleared.',
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Error Resetting Data',
        description: 'There was a problem clearing your data. Please try again.',
        variant: 'destructive',
      });
      console.error(error);
    }
    setIsResetting(false);
    setIsResetDialogOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Here's a snapshot of your financial health."
      >
        <Button variant="destructive" size="sm" onClick={() => setIsResetDialogOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Reset Everything
        </Button>
      </PageHeader>
      <div className="page-content grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-12">
          <TotalBalanceCard />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <SpendingChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <RecentTransactionsCard />
        </div>
        <div className="col-span-12">
          <GoalsSummaryCard />
        </div>
      </div>

      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all of your
              transactions, goals, and scheduled payments from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isResetting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} disabled={isResetting} className="bg-destructive hover:bg-destructive/90">
              {isResetting ? 'Resetting...' : 'Yes, delete everything'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
