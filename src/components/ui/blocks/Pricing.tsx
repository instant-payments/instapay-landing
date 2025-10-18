'use client';

import React, { useMemo } from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSignUpModal } from '@/hooks/useSignUpModal';
import SignUpModal from '../modals/SignUpModal';

const Pricing: React.FC = () => {
  const t = useTranslations();
  const { isOpen, openModal, closeModal } = useSignUpModal();

  const plans = useMemo(() => {
    return Object.entries(t.raw('pricing.list')) as Array<[string, any]>;
  }, [t]);

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(([plan, details], index) => {
            const isPopular = plan === 'basic';
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                  isPopular
                    ? 'border-purple-200 ring-4 ring-purple-100 transform scale-105'
                    : 'border-gray-100 hover:border-purple-100'
                }`}
              >
                {details.badge && (
                  <div className="bg-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full inline-block mb-4">
                    {details.badge}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{details.name}</h3>
                <p className="text-gray-600 mb-6">{details.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{details.price}</span>
                  {details.price !== 'Custom' && (
                    <span className="text-gray-600">{details.period}</span>
                  )}
                </div>

                <ul className="space-y-3">
                  {details.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">{t('pricing.trialNote')}</p>
          <button 
            onClick={openModal}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 mx-auto"
          >
            {t('pricing.cta')}
          </button>
        </div>
      </div>

      <SignUpModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default Pricing;
