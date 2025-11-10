import type { Metadata } from 'next';
import { Kaisei_Tokumin, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const kaisei = Kaisei_Tokumin({
  variable: '--font-kaisei',
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Cool Session Booking',
  description:
    'Responsive booking flow for scheduling a styling session within the next six weeks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${kaisei.variable} font-medium antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
