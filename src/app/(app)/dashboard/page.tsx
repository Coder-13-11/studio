import { PageHeader } from '@/components/page-header';
import { AddTransactionDialog } from './_components/add-transaction-dialog';
import { TotalBalanceCard } from './_components/total-balance-card';
import { GoalsSummaryCard } from './_components/goals-summary-card';
import { SpendingChart } from './_components/spending-chart';
import { RecentTransactionsCard } from './_components/recent-transactions-card';

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Here's a snapshot of your financial health."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TotalBalanceCard />
          <SpendingChart />
        </div>
        <div className="space-y-6">
          <GoalsSummaryCard />
          <RecentTransactionsCard />
        </div>
      </div>
      <AddTransactionDialog />
    </>
  );
}
