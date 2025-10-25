'use client'
import { redirect } from 'next/navigation';
import { useUser } from '@/firebase/provider';
import { useEffect } from 'react';


export default function RootPage() {
    const { user, isUserLoading } = useUser();
    
    useEffect(() => {
        if (!isUserLoading) {
            if (user) {
                redirect('/dashboard');
            } else {
                redirect('/login');
            }
        }
    }, [user, isUserLoading])

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}
