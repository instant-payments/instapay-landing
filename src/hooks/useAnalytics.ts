'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics/posthog';

/**
 * Hook to track component mount/unmount and time spent
 */
export function useAnalytics(componentName: string, properties?: Record<string, any>) {
  const startTime = useRef<number>(0);

  useEffect(() => {
    startTime.current = Date.now();
    
    analytics.track(`${componentName} Viewed`, properties);

    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      analytics.track(`${componentName} Left`, {
        ...properties,
        time_spent_seconds: timeSpent,
      });
    };
  }, [componentName, properties]);
}

/**
 * Hook to track scroll depth
 */
export function useScrollDepth(threshold: number[] = [25, 50, 75, 90, 100]) {
  useEffect(() => {
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      threshold.forEach((depth) => {
        if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          analytics.track('Scroll Depth Reached', { 
            depth_percentage: depth,
            page: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
}

/**
 * Hook to track button clicks with debouncing
 */
export function useTrackClick(eventName: string, properties?: Record<string, any>) {
  const lastClickTime = useRef<number>(0);
  const DEBOUNCE_MS = 300;

  return () => {
    const now = Date.now();
    if (now - lastClickTime.current > DEBOUNCE_MS) {
      lastClickTime.current = now;
      analytics.track(eventName, properties);
    }
  };
}

/**
 * Hook to track form field interactions
 */
export function useFormTracking(formName: string) {
  const fieldInteractions = useRef<Set<string>>(new Set());

  const trackFieldFocus = (fieldName: string) => {
    if (!fieldInteractions.current.has(fieldName)) {
      fieldInteractions.current.add(fieldName);
      analytics.track('Form Field Focused', {
        form_name: formName,
        field_name: fieldName,
      });
    }
  };

  const trackFormSubmit = (success: boolean, errorMessage?: string) => {
    analytics.track('Form Submitted', {
      form_name: formName,
      success,
      error_message: errorMessage,
      fields_interacted: Array.from(fieldInteractions.current),
    });
  };

  const trackFormAbandoned = () => {
    if (fieldInteractions.current.size > 0) {
      analytics.track('Form Abandoned', {
        form_name: formName,
        fields_interacted: Array.from(fieldInteractions.current),
      });
    }
  };

  return { trackFieldFocus, trackFormSubmit, trackFormAbandoned };
}

export { analytics };

