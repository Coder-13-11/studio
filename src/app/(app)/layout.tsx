'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/sidebar';
import { TransactionsProvider } from '@/contexts/transactions-provider';
import { GoalsProvider } from '@/contexts/goals-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from './_components/app-header';
import { ScheduledTransactionsProvider } from '@/contexts/scheduled-transactions-provider';
import { GlobalAddButton } from './_components/global-add-button';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }

  return (
    <TransactionsProvider>
      <GoalsProvider>
        <ScheduledTransactionsProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
                <GlobalAddButton />
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ScheduledTransactionsProvider>
      </GoalsProvider>
    </TransactionsProvider>
  );
}
