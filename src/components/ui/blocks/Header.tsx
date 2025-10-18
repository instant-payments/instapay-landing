'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '../controls/LanguageSwitcher';
import Brand from './Brand';
import SignUpModal from '../modals/SignUpModal';
import { useSignUpModal } from '@/hooks/useSignUpModal';
import { analytics } from '@/lib/analytics/posthog';

const Header: React.FC = () => {
  const t = useTranslations('navigation');
  const { isOpen, closeModal } = useSignUpModal();

  const handleOpenDemoEvent = () => {
    analytics.events.demoViewed('demo_clicked_header');
  };

  const handleNavClick = (section: string) => {
    analytics.events.navigationClicked(section);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Brand clickable />
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => handleNavClick('features')}
              >
                {t('features')}
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => handleNavClick('pricing')}
              >
                {t('pricing')}
              </a>
              <LanguageSwitcher />
              <Link
                href="/demo"
                onClick={handleOpenDemoEvent}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 min-w-40 text-center"
              >
                {t('demo')}
              </Link>
            </nav>

            <div className="md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Sign Up Modal */}
      <SignUpModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Header;
