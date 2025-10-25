import { PageHeader } from '@/components/page-header';
import { AnalyticsCharts } from './_components/analytics-charts';

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Dive deeper into your spending and income trends."
      />
      <AnalyticsCharts />
    </>
  );
}
