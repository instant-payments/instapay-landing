'use client';

import React from 'react';
import { ShoppingBag, Package, Palette, Hash } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { mockProduct } from '@/components/features/demo/instagram-store/lib/constants';

const CartSlide: React.FC = () => {
  const t = useTranslations('slides.cart');
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <ShoppingBag size={20} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t('title')}</h3>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Product Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 flex-1">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 mx-auto mb-4 shadow-md">
            <Image
              width={96}
              height={96}
              src={
                typeof mockProduct.imageSrc === 'string'
                  ? mockProduct.imageSrc
                  : mockProduct.imageSrc.src
              }
              alt={mockProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">{mockProduct.name}</h4>
          <div className="text-2xl font-bold text-purple-600 mb-4">
            ₴{mockProduct.price.toLocaleString()}
          </div>
        </div>

        {/* Selection Options */}
        <div className="space-y-4">
          {/* Size Selection */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Hash size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{t('size')}</span>
            </div>
            <div className="flex justify-center space-x-2">
              {['40', '41', '42', '43'].map(size => (
                <div
                  key={size}
                  className={`w-10 h-10 rounded-xl border-2 text-sm font-bold flex items-center justify-center transition-all ${
                    size === '42'
                      ? 'border-purple-500 bg-purple-500 text-white shadow-lg scale-110'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-purple-300'
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Palette size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{t('color')}</span>
            </div>
            <div className="flex justify-center space-x-3">
              {mockProduct.colors.map(color => (
                <div
                  key={color.name}
                  className={`w-8 h-8 rounded-full border-3 transition-all ${
                    color.name === 'Black'
                      ? 'border-purple-500 shadow-lg scale-110'
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Continue Arrow */}
        {/* <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-purple-600 font-semibold">
            <span>Continue to Shipping</span>
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm">→</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CartSlide;
