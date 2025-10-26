import { PageHeader } from '@/components/page-header';
import { AnalyticsCharts } from './_components/analytics-charts';
import { AiSuggestions } from './_components/ai-suggestions';

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Dive deeper into your spending and income trends."
      />
      <div className="page-content grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsCharts />
        <AiSuggestions />
      </div>
    </>
  );
}
