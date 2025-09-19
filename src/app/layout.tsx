import type { Metadata } from "next";
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal-sans',
});

const fontMono = localFont({
  src: '../assets/fonts/Mono.woff2',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "Store Management",
  description: "Store Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
        fontSans.variable,
        fontHeading.variable,
        fontMono.variable,
        'antialiased'
      )}
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4">{children}</main>
            {/* <Footer /> */}
          </div>
        </div>
      </body>
    </html>
  );
}
