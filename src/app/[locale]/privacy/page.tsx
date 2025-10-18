import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Header from '@/components/ui/blocks/Header';
import Footer from '@/components/ui/blocks/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: `${t('title')} - InstaPay`,
    description: t('intro'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const tDemo = useTranslations('demo.header');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {tDemo('backToLanding')}
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('lastUpdated')}</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">{t('intro')}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('sections.collection.title')}
              </h2>
              <p className="text-gray-600">{t('sections.collection.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('sections.usage.title')}
              </h2>
              <p className="text-gray-600">{t('sections.usage.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('sections.sharing.title')}
              </h2>
              <p className="text-gray-600">{t('sections.sharing.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('sections.security.title')}
              </h2>
              <p className="text-gray-600">{t('sections.security.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('sections.rights.title')}
              </h2>
              <p className="text-gray-600">{t('sections.rights.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('sections.contact.title')}
              </h2>
              <p className="text-gray-600">{t('sections.contact.content')}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

