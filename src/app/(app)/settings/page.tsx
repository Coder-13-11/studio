
'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/contexts/transactions-provider';
import { useGoals } from '@/contexts/goals-provider';
import { useScheduledTransactions } from '@/contexts/scheduled-transactions-provider';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


export default function SettingsPage() {
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const { deleteAllTransactions } = useTransactions();
    const { deleteAllGoals } = useGoals();
    const { deleteAllScheduledTransactions } = useScheduledTransactions();
    const { toast } = useToast();


    const handleReset = async () => {
        setIsResetting(true);
        try {
            await Promise.all([
                deleteAllTransactions(),
                deleteAllGoals(),
                deleteAllScheduledTransactions(),
            ]);
            toast({
                title: 'Data Reset Successfully',
                description: 'All your personal data has been cleared.',
            });
        } catch (error) {
             toast({
                title: 'Error Resetting Data',
                description: 'There was a problem clearing your data. Please try again.',
                variant: 'destructive',
            });
            console.error(error);
        }
        setIsResetting(false);
        setIsResetDialogOpen(false);
    }


  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your application settings and data."
      />
      <div className="page-content">
        <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-destructive p-4">
                    <div>
                        <h4 className="font-semibold">Reset All Data</h4>
                        <p className="text-sm text-muted-foreground">Erase all transactions, goals, and scheduled payments.</p>
                    </div>
                    <Button variant="destructive" onClick={() => setIsResetDialogOpen(true)}>Reset Everything</Button>
                </div>
            </CardContent>
        </Card>
      </div>

       <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all of your
              transactions, goals, and scheduled payments from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isResetting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} disabled={isResetting} className="bg-destructive hover:bg-destructive/90">
              {isResetting ? 'Resetting...' : 'Yes, delete everything'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

