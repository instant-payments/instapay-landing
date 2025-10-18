'use client';

import React, { useEffect, useState } from 'react';
import { Package, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '../../../ui/controls/Button';
import CheckoutHeader from './CheckoutHeader';
import { Order } from '../types';
import Image from 'next/image';

interface ThankYouPageProps {
  order: Order;
  onBackToShop: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onBackToShop }) => {
  const t = useTranslations('demo.thankYou');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'apple-pay':
        return t('paymentMethods.applePay');
      case 'google-pay':
        return t('paymentMethods.googlePay');
      case 'card':
        return t('paymentMethods.card', { lastFour: order.payment.cardNumber.slice(-4) });
      default:
        return t('paymentMethods.cardPayment');
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 150;
  const total = subtotal + shipping;

  return (
    <div className="space-y-4">
      {/* Modern Checkout Header */}
      <div
        className={`transition-all duration-1000 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <CheckoutHeader currentStep="completed" />
      </div>

      <div
        className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-1000 delay-300 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">{t('orderSummary')}</h3>
          </div>
        </div>

        {/* Product Info and Cost Breakdown - Merged */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          {/* Product Info */}
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  width={40}
                  height={40}
                  src={item.imageSrc as string}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-xs text-gray-600">
                  {item.selectedColor}, {item.selectedSize} × {item.quantity}
                </p>
              </div>
            </div>
          ))}

          {/* Cost Breakdown */}
          <div className="space-y-1 text-xs border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('subtotal')}</span>
              <span>₴{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('shipping')}</span>
              <span>₴{shipping}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-bold text-sm">
              <span>{t('total')}</span>
              <span>₴{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Always visible: Shipping Address */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin size={16} className="text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">{t('shippingAddress')}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">{order.shipping.fullName}</p>
              <p className="text-xs text-gray-600">{order.shipping.phoneNumber}</p>
              <p className="text-xs text-gray-600">{order.shipping.city}</p>
              <p className="text-xs text-gray-500">{order.shipping.novaPoshtaBranch}</p>
            </div>
          </div>

          {/* Always visible: Payment Method */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard size={16} className="text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">{t('paymentMethod')}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">
                {getPaymentMethodDisplay(order.payment.paymentMethod)}
              </p>
              <p className="text-xs text-green-600 font-medium">{t('paymentCompleted')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      {/* <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-1000 delay-600 ${
        showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="flex items-center space-x-2 mb-3">
          <Package size={16} className="text-green-600" />
          <h3 className="text-sm font-semibold text-gray-900">What's Next?</h3>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-800 leading-relaxed">
            You will receive a confirmation SMS shortly with tracking information. 
            Your order will be delivered to the selected Nova Poshta branch within 1-3 business days.
          </p>
        </div>
      </div> */}

      {/* Action Button */}
      <div
        className={`transition-all duration-1000 delay-400 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <Button fullWidth onClick={onBackToShop} className="rounded-2xl shadow-lg mb-6">
          {t('backToShop')}
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
