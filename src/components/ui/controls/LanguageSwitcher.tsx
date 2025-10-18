'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import { analytics } from '@/lib/analytics/posthog';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      analytics.events.languageSwitched(currentLocale, newLocale);
      router.push(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <div className="flex items-center gap-1">
        <button
          onClick={() => changeLanguage('ua')}
          className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === 'ua'
              ? 'bg-purple-100 text-purple-950'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          UA
        </button>
        <div className="h-3 w-[1px] bg-gray-300" />
        <button
          onClick={() => changeLanguage('en')}
          className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === 'en'
              ? 'bg-purple-100 text-purple-950'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
