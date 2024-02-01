import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { NavBar } from '@/components/ui/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fountane assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
