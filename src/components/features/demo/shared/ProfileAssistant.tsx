'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, X, ArrowRight, MousePointer, Hand } from 'lucide-react';

type Step = 'instagram' | 'cart' | 'shipping' | 'payment' | 'complete';

interface ProfileAssistantProps {
  currentStep: Step;
  onDismiss?: () => void;
}

interface Hint {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  position: 'top' | 'bottom' | 'center';
}

const ProfileAssistant: React.FC<ProfileAssistantProps> = ({ currentStep, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint after a short delay to let user explore first
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const getHintForStep = (step: Step): Hint => {
    switch (step) {
      case 'instagram':
        return {
          title: 'Start Shopping!',
          description: 'Click on the highlighted "NEW" story to see the product',
          action: 'Look for the story with the shoes image and "NEW" label',
          icon: <MousePointer size={16} className="text-blue-500" />,
          position: 'bottom',
        };
      case 'cart':
        return {
          title: 'Customize Your Order',
          description: 'Select your size and color, then continue to shipping',
          action: 'Choose your preferences and click "Continue to Shipping"',
          icon: <Hand size={16} className="text-green-500" />,
          position: 'center',
        };
      case 'shipping':
        return {
          title: 'Add Shipping Info',
          description: 'Fill in your delivery details to proceed',
          action: 'Complete the form and click continue',
          icon: <ArrowRight size={16} className="text-purple-500" />,
          position: 'center',
        };
      case 'payment':
        return {
          title: 'Complete Payment',
          description: 'Enter your payment information to finish the order',
          action: 'Fill in card details and click "Complete Order"',
          icon: <ArrowRight size={16} className="text-orange-500" />,
          position: 'center',
        };
      case 'complete':
        return {
          title: 'Order Complete!',
          description: 'Your demo order has been successfully placed',
          action: 'You can start over by clicking "Back to Shop"',
          icon: <ArrowRight size={16} className="text-green-500" />,
          position: 'center',
        };
      default:
        return {
          title: 'Welcome!',
          description: 'Follow the hints to complete the demo flow',
          action: 'Look for highlighted elements to click',
          icon: <HelpCircle size={16} className="text-blue-500" />,
          position: 'center',
        };
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const hint = getHintForStep(currentStep);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Overlay for highlighting interactive elements */}
      {showHint && currentStep === 'instagram' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            {/* Pulse animation around the story area */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-pulse" />
            <div className="w-16 h-16 bg-blue-500/40 rounded-full flex items-center justify-center">
              <MousePointer size={24} className="text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Hint Card */}
      {showHint && (
        <div
          className={`absolute pointer-events-auto ${
            hint.position === 'top'
              ? 'top-4'
              : hint.position === 'bottom'
              ? 'bottom-4'
              : 'top-1/2 transform -translate-y-1/2'
          } left-1/2 transform -translate-x-1/2 max-w-sm mx-4`}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 relative">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={12} className="text-gray-600" />
            </button>

            {/* Hint content */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center">
                {hint.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{hint.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{hint.description}</p>
                <div className="text-xs text-blue-600 font-medium">💡 {hint.action}</div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Step {getStepNumber(currentStep) + 1} of 5</span>
                <div className="flex space-x-1">
                  {['instagram', 'cart', 'shipping', 'payment', 'complete'].map((step, index) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        getStepNumber(currentStep) >= index ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating help button */}
      {!showHint && (
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <button
            onClick={() => setShowHint(true)}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

const getStepNumber = (step: Step): number => {
  const steps = { instagram: 0, cart: 1, shipping: 2, payment: 3, complete: 4 };
  return steps[step];
};

export default ProfileAssistant;
