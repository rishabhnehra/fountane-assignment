import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

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
        <div className="flex items-center justify-between gap-4 border-b p-4">
          <Link className="text-xl font-bold" href="/">
            Fountane
          </Link>
          <Input className="w-[400px]" type="text" placeholder="Search . . ." />
          <div></div>
        </div>
        {children}
      </body>
    </html>
  );
}
