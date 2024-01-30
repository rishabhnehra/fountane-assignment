import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Input } from "@/components/ui/input";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fountane assignment",
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
          <p className="text-xl font-bold">Fountane</p>
          <Input className="w-[400px]" type="text" placeholder="Search . . ." />
          <div></div>
        </div>
        {children}
      </body>
    </html>
  );
}
