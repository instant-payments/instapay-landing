import { Inter } from 'next/font/google';
import '../../index.css';
import { cn } from '@/lib/utils/tailwindcss';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'InstaPay Demo - Interactive Checkout Flow',
  description: 'Experience the complete Instagram checkout flow from story to payment confirmation',
};

export default async function DemoLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gradient-to-br from-gray-50 to-gray-100')}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}