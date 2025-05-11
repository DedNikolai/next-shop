'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import TopLoader from './shared/TopLoader';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  )

}
