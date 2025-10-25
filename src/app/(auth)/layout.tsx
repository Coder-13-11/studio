'use client'
import { ReactNode, useEffect } from "react";
import { useUser } from "@/firebase";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLayout({ children }: { children: ReactNode}) {
    const { user, isUserLoading } = useUser();

    useEffect(() => {
        if (!isUserLoading && user) {
            redirect('/dashboard');
        }
    }, [user, isUserLoading]);

    if(isUserLoading || user){
        return (
             <div className="flex h-screen w-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
            </div>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            {children}
        </main>
    )
}
