import type { Metadata } from 'next';
import '../../index.css';
import { ReactNode, Suspense } from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import { PostHogProvider } from '@/components/providers/PostHogProvider';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'InstaPay' }],
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uk: `/ua`,
        en: `/en`,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    redirect(`/${routing.defaultLocale}`);
  }

  const messages = await getMessages();

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return (
    <html lang={locale}>
      <head>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content={t('keywords')} />
        <meta name="author" content="InstaPay" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <PostHogProvider>{children}</PostHogProvider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
