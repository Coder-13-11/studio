import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/sidebar';
import { TransactionsProvider } from '@/contexts/transactions-provider';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TransactionsProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TransactionsProvider>
  );
}
