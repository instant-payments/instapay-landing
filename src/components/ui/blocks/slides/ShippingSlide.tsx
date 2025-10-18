'use client';

import React from 'react';
import { Truck, MapPin, User, Phone, Package } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ShippingSlide: React.FC = () => {
  const t = useTranslations('slides.shipping');
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Truck size={20} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t('title')}</h3>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Shipping Form Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 flex-1">
        <div className="space-y-5">
          {/* Form Fields Preview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                <div className="h-3 bg-gray-100 rounded w-1/3"></div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Nova Poshta Integration */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">{t('novaPoshtaIntegration')}</h4>
                <p className="text-blue-700 text-sm">{t('automaticBranchSelection')}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 h-3 bg-blue-200 rounded-full"></div>
              <div className="flex-1 h-3 bg-green-200 rounded-full"></div>
              <div className="flex-1 h-3 bg-blue-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Continue Arrow */}
        {/* <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold">
            <span>Continue to Payment</span>
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm">→</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ShippingSlide;
