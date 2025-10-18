'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import EarlyAccessForm from '../blocks/EarlyAccessForm';
import { analytics } from '@/lib/analytics/posthog';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, source = 'unknown' }) => {
  const t = useTranslations('earlyAccess');

  // Close modal on ESC key press and track opening
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      analytics.events.signUpModalOpened(source);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, source]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-12 pb-6 px-6">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Modal Body */}
        <div className="px-6 pb-12">
          <EarlyAccessForm />
        </div>

        {/* Optional: Additional Info */}
        <div className="border-t border-gray-100 px-6 py-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('benefits.freeProPlan')}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('benefits.noCreditCard')}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('benefits.quickSetup')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;

