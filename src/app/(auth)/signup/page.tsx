'use client'

import AuthForm from '../_components/auth-form';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
