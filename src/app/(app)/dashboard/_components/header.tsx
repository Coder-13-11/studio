'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { FinwellLogo } from '@/components/finwell-logo';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2 md:hidden">
        <FinwellLogo className="h-8 w-8" />
        <span className="font-headline text-2xl font-bold uppercase">
          FinWell
        </span>
      </div>
    </header>
  );
}
