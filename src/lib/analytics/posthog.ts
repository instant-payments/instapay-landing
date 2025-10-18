import posthog from 'posthog-js';

// Type-safe event tracking
export const analytics = {
  // User identification
  identify: (userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog) {
      posthog.identify(userId, properties);
    }
  },

  // Reset user (on logout)
  reset: () => {
    if (typeof window !== 'undefined' && posthog) {
      posthog.reset();
    }
  },

  // Track custom events
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog) {
      posthog.capture(eventName, properties);
    }
  },

  // Common events for the landing page
  events: {
    // Hero section
    heroCtaClicked: (ctaType: 'get-started' | 'learn-more') => {
      analytics.track('Hero CTA Clicked', { cta_type: ctaType });
    },

    // Early access form
    earlyAccessSubmitted: (email: string, locale: string) => {
      analytics.track('Early Access Submitted', {
        email_domain: email.split('@')[1],
        locale,
      });
    },

    // Demo interactions
    demoViewed: (step: string) => {
      analytics.track('Demo Step Viewed', { step });
    },

    demoInteracted: (action: string, details?: Record<string, any>) => {
      analytics.track('Demo Interacted', { action, ...details });
    },

    demoBackClicked: (fromStep: string, toStep: string) => {
      analytics.track('Demo Back Clicked', {
        from_step: fromStep,
        to_step: toStep,
      });
    },

    demoStepCompleted: (step: string, duration?: number) => {
      analytics.track('Demo Step Completed', {
        step,
        duration_seconds: duration,
      });
    },

    demoFlowCompleted: (totalDuration?: number) => {
      analytics.track('Demo Flow Completed', {
        total_duration_seconds: totalDuration,
      });
    },

    demoAbandoned: (atStep: string) => {
      analytics.track('Demo Abandoned', {
        abandoned_at_step: atStep,
      });
    },

    // Contact
    contactModalOpened: (source: string) => {
      analytics.track('Contact Modal Opened', { source });
    },

    contactFormSubmitted: (data: { name: string; email: string; company?: string }) => {
      analytics.track('Contact Form Submitted', {
        email_domain: data.email.split('@')[1],
        has_company: !!data.company,
      });
    },

    // Sign up
    signUpModalOpened: (source: string) => {
      analytics.track('Sign Up Modal Opened', { source });
    },

    signUpFormSubmitted: (data: { email: string }) => {
      analytics.track('Sign Up Form Submitted', {
        email_domain: data.email.split('@')[1],
      });
    },

    // Navigation
    navigationClicked: (destination: string) => {
      analytics.track('Navigation Clicked', { destination });
    },

    languageSwitched: (from: string, to: string) => {
      analytics.track('Language Switched', { from, to });
    },

    // Pricing
    pricingPlanViewed: (planName: string) => {
      analytics.track('Pricing Plan Viewed', { plan_name: planName });
    },

    pricingCtaClicked: (planName: string) => {
      analytics.track('Pricing CTA Clicked', { plan_name: planName });
    },

    // Social proof
    socialProofClicked: (type: string) => {
      analytics.track('Social Proof Clicked', { type });
    },

    // Footer
    footerLinkClicked: (link: string) => {
      analytics.track('Footer Link Clicked', { link });
    },

    // Features
    featureExpanded: (featureName: string) => {
      analytics.track('Feature Expanded', { feature_name: featureName });
    },

    // Engagement metrics
    videoPlayed: (videoId: string) => {
      analytics.track('Video Played', { video_id: videoId });
    },

    videoCompleted: (videoId: string) => {
      analytics.track('Video Completed', { video_id: videoId });
    },

    // Error tracking
    errorOccurred: (errorType: string, errorMessage: string) => {
      analytics.track('Error Occurred', {
        error_type: errorType,
        error_message: errorMessage,
      });
    },
  },

  // Feature flags
  isFeatureEnabled: (featureKey: string): boolean => {
    if (typeof window !== 'undefined' && posthog) {
      return posthog.isFeatureEnabled(featureKey) || false;
    }
    return false;
  },

  // A/B testing variant
  getFeatureFlag: (featureKey: string): string | boolean | undefined => {
    if (typeof window !== 'undefined' && posthog) {
      return posthog.getFeatureFlag(featureKey);
    }
    return undefined;
  },
};

// Export posthog instance for advanced usage
export { posthog };
