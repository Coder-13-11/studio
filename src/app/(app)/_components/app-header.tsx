'use client';

import { FinwellLogo } from '@/components/finwell-logo';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
      <div className="flex items-center gap-2">
        <FinwellLogo className="h-8 w-8 text-primary" />
        <span className="font-headline text-lg font-semibold text-foreground">
          FinWell
        </span>
      </div>
      <SidebarTrigger />
    </header>
  );
}
