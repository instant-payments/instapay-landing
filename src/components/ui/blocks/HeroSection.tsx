import React from 'react';
import { Play, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import EarlyAccessForm from './EarlyAccessForm';
import Image from 'next/image';
import demoMockupImage from '/public/assets/demo-mockup.png';

const HeroSection: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-50 pt-16 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Instagram className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight px-10 lg:p-0">
              {t.rich('hero.title', {
                highlight: chunks => (
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent border-b-2 border-black">
                    {chunks}
                  </span>
                ),
              })}
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t.rich('hero.subtitle', {
                strong: chunks => <strong className="font-semibold text-gray-900">{chunks}</strong>,
                em: chunks => <em className="italic text-purple-600 font-medium">{chunks}</em>,
              })}
            </p>

            <div className="flex justify-center lg:justify-start">
              <EarlyAccessForm className="mx-auto lg:mx-0" />
            </div>
          </div>

          <div className="absolute transform -right-[7%] hover:rotate-0 transition-transform duration-300">
            {/* <ProductDemo /> */}
            <Image
              width={1400}
              height={200}
              src={demoMockupImage.src}
              alt="Story"
              className="lg:w-[800px] xl:w-[850px] w-0 h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
