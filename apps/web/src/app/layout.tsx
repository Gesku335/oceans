import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@ocean/ui/tokens.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'OCEAN — от фермы до гостя без лишних волн',
  description: 'B2B фермерская биржа с цифровым меню и паспортом происхождения.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
