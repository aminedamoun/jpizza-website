import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'J Pizza Bar - Authentic Italian Pizza in Downtown Dubai',
  description: 'Experience authentic Naples-style pizza in Downtown Dubai. Traditional oven perfection with imported Italian ingredients, 24-hour fermented dough.',
  icons: {
    icon: [
      { url: '/assets/images/jpizz-logo-1770822937653.webp', type: 'image/webp' }
    ],
    shortcut: '/assets/images/jpizz-logo-1770822937653.webp',
    apple: '/assets/images/jpizz-logo-1770822937653.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
</body>
    </html>
  );
}
