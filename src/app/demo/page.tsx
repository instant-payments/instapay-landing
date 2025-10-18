import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DemoApp from '@/components/features/demo/App';
import Brand from '@/components/ui/blocks/Brand';

export const metadata: Metadata = {
  title: 'Interactive Demo - InstaPay',
  description:
    'Experience the complete Instagram checkout flow - from story to payment confirmation',
  robots: 'noindex, nofollow', // Demo pages typically shouldn't be indexed
};

function DemoHeader() {
  const t = useTranslations('demo.header');

  return (
    <div className="bg-white border-b border-gray-200 relative top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('backToLanding')}
          </Link>
          <div className="flex items-center space-x-3">
            <Brand />
          </div>
          <div className="w-24" />
        </div>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <div className="flex flex-col h-screen">
      <DemoApp />
    </div>
  );
}
