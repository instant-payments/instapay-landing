// PostHog client-side initialization
// This file runs once when the app loads in the browser
export async function register() {
  if (typeof window !== 'undefined') {
    const posthog = (await import('posthog-js')).default;
    
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        person_profiles: 'identified_only', // Only create profiles for identified users
        capture_pageview: false, // We'll handle pageviews manually with Next.js routing
        capture_pageleave: true, // Track when users leave pages
        autocapture: true, // Automatically capture clicks, inputs, etc.
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            posthog.debug(); // Enable debug mode in development
          }
        },
      });
    }
  }
}
