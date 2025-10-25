import { PageHeader } from '@/components/page-header';
import { InsightsList } from './_components/insights-list';

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        title="Financial Insights"
        description="Get personalized, AI-powered advice to improve your financial habits."
      />
      <div className="page-content">
        <InsightsList />
      </div>
    </>
  );
}
