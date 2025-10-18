'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Lock,
  Calendar,
  Shield,
  Zap,
  Package,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '../../../ui/controls/Button';
import Input from './Input';
import CheckoutHeader from './CheckoutHeader';
import { samplePaymentData } from '../instagram-store/lib/constants';
import { CartItem, ShippingInfo, PaymentInfo } from '../types';
import Image from 'next/image';

interface PaymentPageProps {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
  onContinue: (payment: PaymentInfo) => void;
  onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  cartItems,
  shippingInfo,
  onContinue,
  onBack,
}) => {
  const t = useTranslations('demo.payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'google-pay'>('card');
  const [loading, setLoading] = useState(false);
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    nameOnCard: '',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState<Partial<PaymentInfo>>({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfo> = {};

    if (paymentMethod === 'card') {
      if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = t('validation.cardNumberRequired');
      if (!paymentInfo.expirationDate.trim())
        newErrors.expirationDate = t('validation.expiryRequired');
      if (!paymentInfo.cvc.trim()) newErrors.cvc = t('validation.cvcRequired');
      if (!paymentInfo.nameOnCard.trim()) newErrors.nameOnCard = t('validation.nameRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    let formattedValue = value;

    // Format card number
    if (field === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim();
    }

    // Format expiration date
    if (field === 'expirationDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    // Format CVC
    if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePayment = async (method: 'card' | 'apple-pay' | 'google-pay') => {
    setPaymentMethod(method);
    setPaymentInfo(prev => ({ ...prev, paymentMethod: method }));

    if (method !== 'card' || validateForm()) {
      setLoading(true);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      onContinue({
        ...paymentInfo,
        paymentMethod: method,
      });

      setLoading(false);
    }
  };

  const handleAutoFill = () => {
    setPaymentInfo(samplePaymentData);
    setErrors({});
    setPaymentMethod('card');
  };

  return (
    <div className="space-y-4">
      {/* Modern Checkout Header */}
      <CheckoutHeader currentStep="payment" onBack={onBack} />

      {/* Tutorial Mode Hint */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
        <div className="flex items-center space-x-2">
          <Zap size={16} className="text-blue-600" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Tutorial Mode</h3>
            <p className="text-xs text-blue-700">Click on the card form below to auto-fill with sample data</p>
          </div>
        </div>
      </div> */}

      {/* Compact Order Summary */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <button
          onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
          className="w-full flex items-center justify-between mb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">{t('orderSummary')}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold text-gray-900">₴{total.toLocaleString()}</span>
            {orderSummaryExpanded ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
        </button>

        {/* Always show: Compact product info */}
        <div className="space-y-2 mb-3">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-xl"
            >
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
              <div className="text-xs font-semibold text-gray-700">
                ₴{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Summary (Always Visible) */}
        <div className="border-t pt-2 mb-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">{t('total')}</span>
            <span className="text-sm font-semibold text-gray-900">₴{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Expandable Details */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            orderSummaryExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {/* Shipping Contact Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-900">{shippingInfo.fullName}</p>
                <p className="text-xs text-gray-600">{shippingInfo.phoneNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">{shippingInfo.city}</p>
                <p className="text-xs text-gray-500 truncate max-w-32">
                  {shippingInfo.novaPoshtaBranch}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center space-x-2">
          <Lock size={16} className="text-green-600" />
          <span className="text-sm font-semibold text-gray-900">{t('securePayment')}</span>
        </div>

        {/* Quick Pay Options */}
        <div className="space-y-3">
          <button
            onClick={() => handlePayment('apple-pay')}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed border-none rounded-lg py-3 px-4 transition-all duration-200 shadow-sm font-medium"
          >
            <div className="flex items-center justify-center space-x-2">
              {loading && paymentMethod === 'apple-pay' ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              )}
              <span className="text-sm font-medium">
                {loading && paymentMethod === 'apple-pay' ? 'Processing...' : 'Pay'}
              </span>
            </div>
          </button>

          <button
            onClick={() => handlePayment('google-pay')}
            disabled={loading}
            className="w-full bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-lg py-3 px-4 transition-all duration-200 shadow-sm font-medium"
          >
            <div className="flex items-center justify-center space-x-2">
              {loading && paymentMethod === 'google-pay' ? (
                <Loader2 size={18} className="animate-spin text-gray-700" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285f4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34a853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fbbc05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#ea4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span className="text-sm font-medium text-gray-700">
                {loading && paymentMethod === 'google-pay' ? 'Processing...' : 'Pay'}
              </span>
            </div>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">{t('orPayWithCard')}</span>
          </div>
        </div>

        {/* Card Form */}
        <div
          onClick={handleAutoFill}
          className="cursor-pointer transition-all duration-200 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/30 border-2 border-transparent hover:border-blue-200 rounded-2xl p-4 -m-4 relative group"
        >
          {/* Auto-fill overlay hint */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <Zap size={12} />
              <span>{t('clickToAutoFill')}</span>
            </div>
          </div>

          {/* Card Details Group */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">{t('cardDetails')}</h3>
            </div>

            <Input
              label={t('cardNumber')}
              placeholder={t('cardNumberPlaceholder')}
              value={paymentInfo.cardNumber}
              onChange={e => handleInputChange('cardNumber', e.target.value)}
              error={errors.cardNumber}
              maxLength={19}
              icon={<CreditCard size={16} />}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                label={t('expiryDate')}
                placeholder={t('expiryDatePlaceholder')}
                value={paymentInfo.expirationDate}
                onChange={e => handleInputChange('expirationDate', e.target.value)}
                error={errors.expirationDate}
                maxLength={5}
                icon={<Calendar size={16} />}
              />

              <Input
                label={t('cvc')}
                placeholder={t('cvcPlaceholder')}
                value={paymentInfo.cvc}
                onChange={e => handleInputChange('cvc', e.target.value)}
                error={errors.cvc}
                maxLength={3}
                icon={<Shield size={16} />}
              />
            </div>

            <Input
              label={t('nameOnCard')}
              placeholder={t('nameOnCardPlaceholder')}
              value={paymentInfo.nameOnCard}
              onChange={e => handleInputChange('nameOnCard', e.target.value)}
              error={errors.nameOnCard}
            />
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <Button
        fullWidth
        onClick={() => handlePayment('card')}
        loading={loading && paymentMethod === 'card'}
        className="rounded-2xl shadow-lg mb-6"
      >
        {t('payAmount', { amount: total.toLocaleString() })}
      </Button>
    </div>
  );
};

export default PaymentPage;
