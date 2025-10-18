# PostHog Analytics Setup Guide

This document explains how to configure and use PostHog analytics for production-ready web and product analytics.

## 🚀 Quick Start

### 1. Get Your PostHog API Key

1. Sign up at [PostHog](https://posthog.com) (or log in if you already have an account)
2. Create a new project or select an existing one
3. Navigate to **Project Settings** → **Project API Key**
4. Copy your API key (it starts with `phc_`)

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Important Notes:**
- For **EU Cloud**, use: `https://eu.posthog.com`
- For **Self-hosted**, use your custom URL
- Never commit `.env.local` to version control (it's in `.gitignore`)

### 3. Verify Installation

The following packages are already installed:
- `posthog-js` - Client-side tracking
- `posthog-node` - Server-side tracking

## 📊 What's Being Tracked

### Automatic Tracking

PostHog automatically captures:
- **Page views** - Every page navigation
- **Page leaves** - When users exit pages
- **Autocapture** - Clicks, form submissions, and other interactions
- **Session recordings** (if enabled in PostHog dashboard)
- **Console logs** (in development mode only)

### Custom Events

The following custom events are tracked:

#### Navigation & UI
- `Navigation Clicked` - When users click on nav links
- `Language Switched` - When users change language (tracks from/to)
- `Demo Step Viewed` - When users view demo sections
- `Demo Interacted` - User interactions within the demo

#### Forms & Conversions
- `Early Access Submitted` - When users submit Instagram handle
- `Contact Form Submitted` - Contact form submissions
- `Sign Up Modal Opened` - When sign-up modal is opened
- `Form Field Focused` - When users interact with form fields
- `Form Submitted` - Form submission attempts (success/failure)
- `Form Abandoned` - When users leave forms without submitting

#### Engagement
- `Scroll Depth Reached` - Tracks scroll depth at 25%, 50%, 75%, 90%, 100%
- `Video Played` - Video engagement
- `Video Completed` - Video completion
- `Feature Expanded` - When features are expanded/viewed

#### Commerce
- `Pricing Plan Viewed` - Pricing table interactions
- `Pricing CTA Clicked` - When users click pricing CTAs
- `Hero CTA Clicked` - Hero section CTA clicks

#### Errors
- `Error Occurred` - Application errors with type and message

## 🛠️ Usage in Your Code

### Basic Event Tracking

```typescript
import { analytics } from '@/lib/analytics/posthog';

// Track a custom event
analytics.track('Button Clicked', { 
  button_name: 'subscribe',
  location: 'header'
});

// Use pre-defined events
analytics.events.heroCtaClicked('get-started');
analytics.events.pricingPlanViewed('pro');
```

### User Identification

```typescript
import { analytics } from '@/lib/analytics/posthog';

// Identify a user (call this after login/signup)
analytics.identify('user_123', {
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'pro'
});

// Reset on logout
analytics.reset();
```

### Using Hooks

```typescript
import { useAnalytics, useScrollDepth, useFormTracking } from '@/hooks/useAnalytics';

function MyComponent() {
  // Track component view time
  useAnalytics('MyComponent', { section: 'pricing' });
  
  // Track scroll depth
  useScrollDepth([25, 50, 75, 100]);
  
  // Track form interactions
  const { trackFieldFocus, trackFormSubmit } = useFormTracking('newsletter');
  
  return (
    <input 
      onFocus={() => trackFieldFocus('email')}
      type="email"
    />
  );
}
```

### Feature Flags & A/B Testing

```typescript
import { analytics } from '@/lib/analytics/posthog';

// Check if a feature is enabled
const showNewFeature = analytics.isFeatureEnabled('new_checkout_flow');

// Get feature flag variant
const variant = analytics.getFeatureFlag('pricing_test');
if (variant === 'variant_a') {
  // Show variant A
} else {
  // Show control
}
```

## 📁 File Structure

```
src/
├── lib/analytics/
│   └── posthog.ts              # Main analytics module with all events
├── hooks/
│   └── useAnalytics.ts         # React hooks for analytics
├── components/providers/
│   └── PostHogProvider.tsx     # PostHog React provider
├── app/[locale]/
│   └── layout.tsx              # PostHog integrated here
instrumentation.ts              # Server-side initialization
instrumentation-client.js       # Client-side initialization
```

## 🔧 Configuration Options

### Client-Side (instrumentation-client.js)

```javascript
posthog.init(POSTHOG_KEY, {
  api_host: 'https://app.posthog.com',
  person_profiles: 'identified_only',  // Only track identified users
  capture_pageview: false,              // Manual pageview tracking
  capture_pageleave: true,              // Track page exits
  autocapture: true,                    // Automatic click tracking
  loaded: (posthog) => {
    if (process.env.NODE_ENV === 'development') {
      posthog.debug();                  // Debug mode in development
    }
  }
});
```

### Privacy & GDPR Compliance

To make your analytics GDPR compliant:

1. **Add Cookie Consent**
   ```typescript
   // Only initialize PostHog after user consent
   if (userHasConsented) {
     analytics.track('page_view');
   }
   ```

2. **Disable Autocapture** (optional)
   - Edit `instrumentation-client.js`
   - Set `autocapture: false`

3. **Mask Sensitive Data**
   ```typescript
   analytics.track('Form Submitted', {
     email_domain: email.split('@')[1], // Only track domain
     // Don't send full email
   });
   ```

## 📈 Viewing Your Data

1. Go to [PostHog Dashboard](https://app.posthog.com)
2. Navigate to **Insights** to create custom dashboards
3. Check **Live Events** to see real-time tracking
4. Use **Session Recordings** to watch user sessions
5. Create **Funnels** to track conversion flows
6. Set up **Cohorts** to segment users

## 🎯 Best Practices

1. **Event Naming**: Use consistent, descriptive names (e.g., "Button Clicked" not "click")
2. **Properties**: Include relevant context (location, variant, etc.)
3. **Don't Track PII**: Never track passwords, credit cards, or sensitive personal data
4. **Use Type-Safe Events**: Prefer `analytics.events.*` over raw `analytics.track()`
5. **Test in Development**: PostHog debug mode shows all events in console

## 🐛 Debugging

### Check if PostHog is Working

```typescript
// In browser console
window.posthog.debug()
window.posthog.capture('test_event', { test: true })
```

### Common Issues

1. **Events not showing up**
   - Check API key is set correctly
   - Verify environment variables (must start with `NEXT_PUBLIC_`)
   - Check browser console for errors
   - Ensure ad blockers aren't blocking PostHog

2. **Duplicate events**
   - Check for duplicate PostHog providers
   - Verify component isn't re-mounting unnecessarily

3. **Development vs Production**
   - PostHog events work in both environments
   - Use debug mode in development: `posthog.debug()`

## 🔐 Security

- API keys starting with `NEXT_PUBLIC_` are safe to expose in client-side code
- They only allow sending events, not reading data
- Configure allowed domains in PostHog dashboard
- Use environment variables for all configuration

## 📚 Additional Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Next.js Guide](https://posthog.com/docs/libraries/next-js)
- [Feature Flags Guide](https://posthog.com/docs/feature-flags)
- [Session Recording](https://posthog.com/docs/session-replay)

## 🆘 Support

- PostHog Docs: https://posthog.com/docs
- PostHog Community: https://posthog.com/slack
- GitHub Issues: https://github.com/PostHog/posthog

---

**Ready to track!** 🎉 All events are automatically being tracked. View them in your PostHog dashboard.

