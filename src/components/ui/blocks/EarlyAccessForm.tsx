'use client';

import React, { useState } from 'react';
import { Instagram, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { addToWhitelist } from '@/app/actions/whitelist';
import { analytics } from '@/lib/analytics/posthog';
import { useFormTracking } from '@/hooks/useAnalytics';

interface EarlyAccessFormProps {
  className?: string;
}

const EarlyAccessForm: React.FC<EarlyAccessFormProps> = ({ className = '' }) => {
  const t = useTranslations('earlyAccess');
  const params = useParams();
  const locale = params.locale as string;
  const [instagramHandle, setInstagramHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { trackFieldFocus, trackFormSubmit } = useFormTracking('early_access');

  const validateInstagramHandle = (handle: string): boolean => {
    const cleanHandle = handle.replace('@', '').trim();
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    return instagramRegex.test(cleanHandle) && cleanHandle.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInstagramHandle(instagramHandle)) {
      setError(t('validation.invalidHandle'));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await addToWhitelist(instagramHandle);

      if (result.success) {
        setIsSubmitted(true);
        analytics.events.earlyAccessSubmitted(instagramHandle, locale);
        trackFormSubmit(true);
      } else {
        setError(result.error || t('validation.submitError'));
        trackFormSubmit(false, result.error);
        analytics.events.errorOccurred('early_access_form', result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(t('validation.submitError'));
      trackFormSubmit(false, errorMessage);
      analytics.events.errorOccurred('early_access_form', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9._@]/g, '');
    setInstagramHandle(filteredValue);
    if (error) setError('');
    if (isSubmitted) setIsSubmitted(false);
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex rounded-xl overflow-hidden border bg-white shadow-lg transition-all duration-300 ${
            isSubmitted
              ? 'border-green-300 shadow-green-100'
              : 'border-purple-200 hover:shadow-xl focus-within:border-purple-400 focus-within:shadow-xl'
          }`}
        >
          <div className="w-[60%] relative">
            <div
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                isSubmitted ? 'text-green-500' : 'text-purple-400'
              }`}
            >
              {isSubmitted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Instagram className="w-5 h-5" />
              )}
            </div>
            <input
              type="text"
              placeholder={
                isSubmitted ? t('success.message') : t('form.instagramHandle.placeholder')
              }
              value={instagramHandle}
              onChange={handleInputChange}
              onFocus={() => trackFieldFocus('instagram_handle')}
              className={`w-full h-14 pl-12 pr-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-base tracking-wide transition-colors duration-300 ${
                isSubmitted
                  ? 'text-green-700 placeholder-green-600'
                  : 'text-gray-900 placeholder-gray-500'
              }`}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={!instagramHandle.trim() || isSubmitting || isSubmitted}
            className={`w-[40%] px-4 h-14 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center ${
              isSubmitted
                ? 'bg-gradient-to-r from-green-500 to-green-600 focus:ring-green-500'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSubmitted ? (
              <span className="whitespace-nowrap text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t('success.title')}
              </span>
            ) : (
              <span className="whitespace-nowrap text-sm">{t('form.submitButton')}</span>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {isSubmitted && !error && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-green-700 text-sm font-medium">{t('success.followUp')}</p>
          </div>
        )}

        {!isSubmitted && (
          <p className="text-xs text-gray-500 mt-3 ml-1.5">{t('form.instagramHandle.help')}</p>
        )}
      </form>
    </div>
  );
};

export default EarlyAccessForm;
