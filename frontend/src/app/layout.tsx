import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'ATLAS CIBER-NEÓN | Geographic Intelligence',
  description:
    'Tactical interface for global demographic intelligence and country comparison',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
