'use client'
import { ReactNode, useEffect } from "react";
import { useUser } from "@/firebase";
import { redirect } from "next/navigation";

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
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            {children}
        </main>
    )
}
