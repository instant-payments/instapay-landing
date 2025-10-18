'use client';

import React from 'react';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PaymentSlide: React.FC = () => {
  const t = useTranslations('slides.payment');
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <CreditCard size={20} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t('title')}</h3>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Payment Form Preview */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-green-100 flex-1">
        <div className="space-y-5">
          {/* Card Preview */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-4">
              <CreditCard size={24} />
              <div className="flex space-x-1">
                <div className="w-6 h-4 bg-white/20 rounded"></div>
                <div className="w-6 h-4 bg-white/20 rounded"></div>
                <div className="w-6 h-4 bg-white/20 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-white/20 rounded w-1/4"></div>
                <div className="h-3 bg-white/20 rounded w-1/6"></div>
              </div>
            </div>
          </div>

          {/* Form Fields Preview */}
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-900">{t('securePayment')}</h4>
                <p className="text-green-700 text-sm">{t('sslEncryptedPciCompliant')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Lock size={16} className="text-green-600" />
                <span className="text-green-800 text-sm font-medium">{t('ssl')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-green-600" />
                <span className="text-green-800 text-sm font-medium">{t('pci')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-green-800 text-sm font-medium">{t('verified')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Arrow */}
        {/* <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-green-600 font-semibold">
            <span>Complete Order</span>
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentSlide;
