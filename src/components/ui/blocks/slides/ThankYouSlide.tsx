'use client';

import React from 'react';
import { CheckCircle, Package, MapPin, ShoppingBag, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mockProduct } from '@/components/features/demo/instagram-store/lib/constants';
import Image from 'next/image';

const ThankYouSlide: React.FC = () => {
  const t = useTranslations('slides.thankYou');
  const orderTotal = mockProduct.price + 150 + Math.round(mockProduct.price * 0.2);
  const orderId = `IP336089`;

  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 p-5 flex flex-col">
      {/* Success Header */}
      <div className="mb-5 flex w-full items-center justify-center gap-2">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
          <CheckCircle className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{t('orderConfirmed')}</h3>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100 flex-1">
        <div className="space-y-4">
          {/* Order ID */}
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-600">{t('orderId')}</span>
            <div className="text-lg font-bold text-gray-900 font-mono mt-1">{orderId}</div>
          </div>

          {/* Product Summary */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 shadow-md">
              <Image
                width={64}
                height={64}
                src={
                  typeof mockProduct.imageSrc === 'string'
                    ? mockProduct.imageSrc
                    : mockProduct.imageSrc.src
                }
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{mockProduct.name}</h4>
              <p className="text-gray-600 text-sm">Size 42 • Black</p>
              <div className="text-lg font-bold text-purple-600 mt-1">
                ₴{mockProduct.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Shipping Status */}
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-blue-900">{t('shippingTo')}</h4>
              <p className="text-blue-700 text-sm">{t('novaPoshtaBranch')}</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">{t('total')}</span>
              <span className="text-2xl font-bold text-emerald-600">
                ₴{orderTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Shop */}
      {/* <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 text-emerald-600 font-semibold">
          <ShoppingBag size={16} />
          <span>Back to Shop</span>
        </div>
      </div> */}
    </div>
  );
};

export default ThankYouSlide;
