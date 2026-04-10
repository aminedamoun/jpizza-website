'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router?.push('/homepage');
  }, [router]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-primary text-xl font-serif animate-pulse">Loading...</div>
    </div>
  );
}