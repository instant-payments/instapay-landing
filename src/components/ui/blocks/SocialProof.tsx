import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

const testimonials = ['sarah', 'maria', 'alex'];

const SocialProof: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('socialProof.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('socialProof.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
              <Quote className="w-8 h-8 text-purple-200 mb-4" />

              <p className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{t(`socialProof.testimonials.${testimonial}.text`)}&rdquo;
              </p>

              <div className="flex items-center">
                <Image
                  src={t(`socialProof.testimonials.${testimonial}.image`)}
                  alt={t(`socialProof.testimonials.${testimonial}.name`)}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {t(`socialProof.testimonials.${testimonial}.name`)}
                  </div>
                  <div className="text-purple-600 text-sm">
                    {t(`socialProof.testimonials.${testimonial}.business`)}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(+t(`socialProof.testimonials.${testimonial}.rating`))].map(
                      (_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-8">{t('socialProof.brands.text')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[...Array(5)].map((_, itemKey) => (
              <div
                key={itemKey}
                className="bg-gray-100 px-6 py-3 rounded-lg text-gray-700 font-medium"
              >
                @{t(`socialProof.brands.list.${itemKey}`).toLowerCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
