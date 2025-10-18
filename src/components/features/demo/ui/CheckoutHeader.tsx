import React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft } from 'lucide-react';
import { storeProfileMock } from '../instagram-store/lib/constants';
import { analytics } from '@/lib/analytics/posthog';
import Image from 'next/image';

interface CheckoutHeaderProps {
  currentStep: 'cart' | 'shipping' | 'payment' | 'completed';
  onBack?: () => void;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ currentStep, onBack }) => {
  const t = useTranslations('demo.checkout.steps');

  // Determine if back button should be shown
  const showBackButton = currentStep !== 'completed' && onBack;

  // Special handling for complete step - show only single complete indicator
  if (currentStep === 'completed') {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              width={40}
              height={40}
              src={storeProfileMock.imageSrc}
              alt={storeProfileMock.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{storeProfileMock.name}</h1>
            <p className="text-xs text-gray-500">{storeProfileMock.handle}</p>
          </div>
        </div>

        {/* Single Complete Indicator */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="w-80 h-1 rounded-full bg-green-500"></div>
          </div>
          <div className="flex justify-center">
            <span className="text-xs font-medium text-green-600">{t('completed')}</span>
          </div>
        </div>
      </div>
    );
  }

  // Regular 3-step flow for checkout pages
  const steps = [
    { id: 'cart', label: t('cart'), completed: false },
    { id: 'shipping', label: t('shipping'), completed: false },
    { id: 'payment', label: t('payment'), completed: false },
  ];

  // Update step completion status
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  steps.forEach((step, index) => {
    if (index < currentStepIndex) {
      step.completed = true;
    }
  });

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Store Profile */}
      <div className="flex items-center space-x-3 mb-4">
        {showBackButton && (
          <button
            onClick={() => {
              analytics.events.demoInteracted('back_button_clicked', {
                current_step: currentStep,
              });
              onBack?.();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors -ml-1"
            aria-label="Go back"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <Image
            width={40}
            height={40}
            src={storeProfileMock.imageSrc}
            alt={storeProfileMock.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{storeProfileMock.name}</h1>
          <p className="text-xs text-gray-500">{storeProfileMock.handle}</p>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="space-y-2">
        {/* Progress Lines */}
        <div className="flex space-x-1">
          {steps.map(step => {
            const isActive = step.id === currentStep;
            const isCompleted = step.completed;

            return (
              <div
                key={step.id}
                className={`
                  flex-1 h-1 rounded-full transition-all duration-300
                  ${isCompleted ? 'bg-purple-400' : isActive ? 'bg-purple-600' : 'bg-gray-200'}
                `}
              />
            );
          })}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between">
          {steps.map(step => {
            const isActive = step.id === currentStep;
            const isCompleted = step.completed;

            return (
              <span
                key={step.id}
                className={`
                  text-xs font-medium transition-colors duration-300
                  ${isActive || isCompleted ? 'text-purple-600' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
