
import { PageHeader } from '@/components/page-header';
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
    </>
  );
}
