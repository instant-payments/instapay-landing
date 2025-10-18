# 🚀 PostHog Analytics - Quick Start

Your InstaPay landing page is now configured with production-ready PostHog analytics!

## ⚡ Get Started in 3 Steps

### Step 1: Get Your PostHog API Key

1. Go to [PostHog](https://app.posthog.com)
2. Sign up or log in
3. Create a project
4. Copy your API key from **Project Settings**

### Step 2: Set Environment Variables

Create `.env.local` file in your project root:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

> **Note:** For EU users, use `https://eu.posthog.com`

### Step 3: Start Tracking!

```bash
npm run dev
```

That's it! Analytics are now live. 🎉

## 📊 What's Already Being Tracked

### ✅ Automatic Tracking

- Page views & navigation
- Scroll depth (25%, 50%, 75%, 90%, 100%)
- Form interactions & submissions
- Button clicks & CTA engagement
- Language switching
- **Demo interactions (NEW!)**
  - Back button clicks
  - Step navigation
  - Time spent per step
  - Demo completion tracking
  - Demo abandonment detection
- Error tracking

### 📈 Pre-configured Events

All major user actions are tracked:

- Early access form submissions
- Contact form submissions
- Navigation clicks
- Pricing plan views
- Language changes
- Modal interactions
- Form field focus/abandonment

## 🎯 View Your Data

Visit your [PostHog Dashboard](https://app.posthog.com):

- **Live Events** - See real-time activity
- **Insights** - Create custom charts
- **Session Recordings** - Watch user sessions
- **Funnels** - Track conversion flows

## 🔧 Custom Tracking (Optional)

Add custom events anywhere in your code:

```typescript
import { analytics } from '@/lib/analytics/posthog';

// Simple event
analytics.track('Custom Event', { key: 'value' });

// Pre-defined events
analytics.events.heroCtaClicked('get-started');
analytics.events.pricingPlanViewed('pro');

// Identify users (after login)
analytics.identify('user_123', {
  email: 'user@example.com',
  plan: 'pro',
});
```

## 🛠️ Available Hooks

```typescript
import {
  useAnalytics, // Track component views
  useScrollDepth, // Track scroll behavior
  useFormTracking, // Track form interactions
} from '@/hooks/useAnalytics';

function MyComponent() {
  useAnalytics('ComponentName');
  useScrollDepth([25, 50, 75, 100]);

  const { trackFieldFocus, trackFormSubmit } = useFormTracking('form_name');

  // Use in your component...
}
```

## 📁 Key Files

```
├── instrumentation.ts              # Server initialization
├── instrumentation-client.js       # Client initialization
├── src/lib/analytics/posthog.ts   # All events & methods
├── src/hooks/useAnalytics.ts      # React hooks
├── src/components/providers/
│   ├── PostHogProvider.tsx        # Page tracking
│   └── PageAnalytics.tsx          # Scroll tracking
```

## 🐛 Troubleshooting

**Events not showing?**

1. Check `.env.local` has correct API key
2. Verify API key starts with `phc_`
3. Check browser console for errors
4. Disable ad blockers

**Debug Mode:**

```javascript
// In browser console
window.posthog.debug();
window.posthog.capture('test', { test: true });
```

## 📚 Full Documentation

See [POSTHOG_SETUP.md](./POSTHOG_SETUP.md) for:

- Complete feature list
- Privacy & GDPR compliance
- Advanced configuration
- A/B testing & feature flags
- Best practices

---

**Need Help?**

- [PostHog Docs](https://posthog.com/docs)
- [PostHog Community](https://posthog.com/slack)

**Happy Tracking! 📈**
