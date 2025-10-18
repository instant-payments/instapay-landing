import React, { useMemo } from 'react';
import { Shield, Smartphone, ShoppingCart, Palette, BarChart3, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

const featureIconsMap = {
  paymentProcessors: Shield,
  mobilePayments: Smartphone,
  cartSearch: ShoppingCart,
  whiteLabel: Palette,
  analytics: BarChart3,
  noReceipt: Zap,
};

const KeyFeatures: React.FC = () => {
  const t = useTranslations();

  const features = useMemo(() => {
    return Object.entries(t.raw('features.list')) as Array<[string, any]>;
  }, [t]);

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('features.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(([featureName, details]) => {
            const Icon = featureIconsMap[featureName as keyof typeof featureIconsMap];

            return (
              <div
                key={featureName}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">{details.title}</h3>

                <p className="text-gray-600 leading-relaxed">{details.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
