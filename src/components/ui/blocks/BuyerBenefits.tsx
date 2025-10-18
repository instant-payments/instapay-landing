'use client';

import React, { useMemo } from 'react';
import { Clock, UserCheck, RefreshCw, Package } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSignUpModal } from '@/hooks/useSignUpModal';
import SignUpModal from '../modals/SignUpModal';

const benefitIconsMap = {
  checkout: Clock,
  guestFlow: UserCheck,
  repeatOrders: RefreshCw,
  multiItem: Package,
};

const BuyerBenefits: React.FC = () => {
  const t = useTranslations();
  const { isOpen, openModal, closeModal } = useSignUpModal();

  const benefits = useMemo(() => {
    return Object.entries(t.raw('buyerBenefits.list')) as Array<[string, any]>;
  }, [t]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('buyerBenefits.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('buyerBenefits.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(([benefit, details], index) => {
            const Icon = benefitIconsMap[benefit as keyof typeof benefitIconsMap];

            return (
              <div key={benefit} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:from-purple-600 group-hover:to-purple-700 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">{details.title}</h3>

                <p className="text-gray-600 leading-relaxed">{details.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('buyerBenefits.cta.title')}</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('buyerBenefits.cta.description')}
          </p>
          <button 
            onClick={openModal}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {t('buyerBenefits.cta.button')}
          </button>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default BuyerBenefits;
