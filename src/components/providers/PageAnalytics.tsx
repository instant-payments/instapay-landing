'use client';

import { useEffect } from 'react';
import { useScrollDepth } from '@/hooks/useAnalytics';

/**
 * Client component to add page-level analytics
 * Use this on pages where you want to track scroll depth
 */
export function PageAnalytics() {
  // Track scroll depth at 25%, 50%, 75%, 90%, and 100%
  useScrollDepth([25, 50, 75, 90, 100]);

  return null;
}

