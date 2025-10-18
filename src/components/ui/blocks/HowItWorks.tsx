import React from 'react';
import { Link2, MessageCircle, CreditCard, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const steps = [
  {
    id: 'createLink',
    icon: Link2,
  },
  {
    id: 'share',
    icon: MessageCircle,
  },
  {
    id: 'payment',
    icon: CreditCard,
  },
  {
    id: 'confirmation',
    icon: CheckCircle,
  },
];

const HowItWorks: React.FC = () => {
  const t = useTranslations('howItWorks');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  <step.icon className="w-8 h-8" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-purple-600">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(`steps.${step.id}.title`)}
                </h3>

                <p className="text-gray-600 leading-relaxed">{t(`steps.${step.id}.description`)}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent transform -translate-x-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
