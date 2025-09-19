import type { Metadata } from "next";
import { Inter as FontSans } from 'next/font/google';
// import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import '@/app/globals.css';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
});

// const fontHeading = localFont({
//   src: '../assets/fonts/CalSans-SemiBold.woff2',
//   variable: '--font-cal-sans',
// });

// const fontMono = localFont({
//   src: '../assets/fonts/Mono.woff2',
//   variable: '--font-mono',
// });

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
        // fontHeading.variable,
        // fontMono.variable,
        'antialiased'
      )}
      >
        {children}
      </body>
    </html>
  );
}
