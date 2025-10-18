'use client';

import React, { useMemo } from 'react';
import { Database, FileSpreadsheet, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useContactModal } from '@/hooks/useContactModal';
import ContactModal from '../modals/ContactModal';

const iconsMap = {
  keycrm: Database,
  excel: FileSpreadsheet,
  novaPost: Plus,
};

const Integrations: React.FC = () => {
  const t = useTranslations();
  const { isOpen, openModal, closeModal } = useContactModal();

  const integrations = useMemo(() => {
    return Object.entries(t.raw('integrations.list')) as Array<[string, any]>;
  }, [t]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('integrations.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('integrations.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map(([serviceName, details]) => {
            const Icon = iconsMap[serviceName as keyof typeof iconsMap];

            return (
              <div
                key={serviceName}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:border-purple-200"
              >
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">{details.name}</h3>

                <p className="text-gray-600">{details.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">{t('integrations.cta.text')}</p>
          <button 
            onClick={openModal}
            className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            {t('integrations.cta.button')}
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default Integrations;
