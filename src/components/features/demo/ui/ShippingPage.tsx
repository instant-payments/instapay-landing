'use client';

import React, { useState } from 'react';
import { Phone, User, MapPin, Package, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '../../../ui/controls/Button';
import Input from './Input';
import Select from './Select';
import CheckoutHeader from './CheckoutHeader';
import {
  novaPostBranches,
  sampleShippingData,
  ukrainianCities,
} from '../instagram-store/lib/constants';
import { ShippingInfo } from '../types';

interface ShippingPageProps {
  onContinue: (shipping: ShippingInfo) => void;
  onBack: () => void;
}

const ShippingPage: React.FC<ShippingPageProps> = ({ onContinue, onBack }) => {
  const t = useTranslations('demo.shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phoneNumber: '',
    city: '',
    novaPoshtaBranch: '',
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    if (!shippingInfo.fullName.trim()) newErrors.fullName = t('validation.fullNameRequired');
    if (!shippingInfo.phoneNumber.trim()) newErrors.phoneNumber = t('validation.phoneRequired');
    if (!shippingInfo.city.trim()) newErrors.city = t('validation.cityRequired');
    if (!shippingInfo.novaPoshtaBranch.trim()) newErrors.novaPoshtaBranch = t('validation.branchRequired');

    // Phone validation
    const phoneRegex = /^(\+380|0)[0-9]{9}$/;
    if (shippingInfo.phoneNumber && !phoneRegex.test(shippingInfo.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = t('validation.invalidPhone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onContinue(shippingInfo);
    }
  };

  const handleAutoFill = () => {
    setShippingInfo(sampleShippingData);
    setErrors({});
  };

  const cityOptions = ukrainianCities.map(city => ({ value: city, label: city }));
  const branchOptions = novaPostBranches.map(branch => ({ value: branch, label: branch }));

  return (
    <div className="space-y-4">
      {/* Modern Checkout Header */}
      <CheckoutHeader currentStep="shipping" onBack={onBack} />

      {/* Tutorial Mode Hint
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
        <div className="flex items-center space-x-2">
          <Zap size={16} className="text-blue-600" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Tutorial Mode</h3>
            <p className="text-xs text-blue-700">Click on the form below to auto-fill with sample data</p>
          </div>
        </div>
      </div> */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          onClick={handleAutoFill}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/30 hover:border-blue-200 relative group"
        >
          {/* Auto-fill overlay hint */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <Zap size={12} />
              <span>{t('clickToAutoFill')}</span>
            </div>
          </div>

          {/* Contact Information Group */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <User size={16} className="text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">{t('contactInformation')}</h3>
            </div>
            <Input
              label={t('fullName')}
              placeholder={t('fullNamePlaceholder')}
              value={shippingInfo.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              icon={<User size={16} />}
            />

            <Input
              label={t('phoneNumber')}
              placeholder={t('phoneNumberPlaceholder')}
              value={shippingInfo.phoneNumber}
              onChange={e => handleInputChange('phoneNumber', e.target.value)}
              error={errors.phoneNumber}
              icon={<Phone size={16} />}
            />
          </div>

          {/* Delivery Address Group */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin size={16} className="text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">{t('deliveryAddress')}</h3>
            </div>

            <Select
              label={t('city')}
              value={shippingInfo.city}
              onChange={e => handleInputChange('city', e.target.value)}
              options={[{ value: '', label: t('selectCity') }, ...cityOptions]}
              error={errors.city}
            />

            <Select
              label={t('novaPoshtaBranch')}
              value={shippingInfo.novaPoshtaBranch}
              onChange={e => handleInputChange('novaPoshtaBranch', e.target.value)}
              options={[{ value: '', label: t('selectBranch') }, ...branchOptions]}
              error={errors.novaPoshtaBranch}
              disabled={!shippingInfo.city}
            />

            {/* Delivery time estimate */}
            {shippingInfo.city && shippingInfo.novaPoshtaBranch && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                <div className="flex items-center space-x-2">
                  <Package size={14} className="text-green-600" />
                  <span className="text-xs font-medium text-green-800">
                    {t('deliveryTime')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button type="submit" fullWidth className="rounded-2xl shadow-lg mb-6">
          {t('continueToPayment')}
        </Button>
      </form>
    </div>
  );
};

export default ShippingPage;
