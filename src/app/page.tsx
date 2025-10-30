'use client';

import { FinwellLogo } from '@/components/finwell-logo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center text-center">
        <FinwellLogo className="h-24 w-24 text-primary" />
        <h1 className="mt-8 font-headline text-6xl font-bold uppercase tracking-tight text-foreground sm:text-7xl">
          FinWell
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          Your modern personal finance app. Understand your money, achieve your goals.
        </p>
        <Button asChild size="lg" className="mt-10">
          <a href="/dashboard">
            Get Started
            <ArrowRight />
          </a>
        </Button>
      </div>
    </main>
  );
}
