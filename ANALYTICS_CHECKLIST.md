# ✅ PostHog Analytics Setup Checklist

Use this checklist to ensure PostHog is configured correctly.

## 🔧 Initial Setup

- [ ] **Get PostHog API Key**
  - Sign up at https://app.posthog.com
  - Create a project
  - Copy API key from Project Settings

- [ ] **Configure Environment Variables**
  - Create `.env.local` file in project root
  - Add `NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here`
  - Add `NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com` (or EU/self-hosted URL)
  - Verify `.env.local` is in `.gitignore`

- [ ] **Install Dependencies** (Already done ✓)
  - `posthog-js` installed
  - `posthog-node` installed
  - Next.js instrumentation enabled

## 🧪 Testing

- [ ] **Development Testing**
  ```bash
  npm run dev
  ```
  - Open browser console (F12)
  - Run: `window.posthog.debug()`
  - Navigate the site and watch events in console
  - Check PostHog dashboard "Live Events" tab

- [ ] **Verify Key Events**
  - [ ] Page view on landing page
  - [ ] Scroll depth tracking (scroll down the page)
  - [ ] Navigation clicks (Features, Pricing links)
  - [ ] Early access form submission
  - [ ] Language switcher (UA ↔ EN)
  - [ ] Demo button click
  - [ ] Form field focus events

- [ ] **Check PostHog Dashboard**
  - Log in to https://app.posthog.com
  - Go to "Live Events" 
  - See your events appearing in real-time
  - Verify event properties are correct

## 🚀 Production Deployment

- [ ] **Environment Variables**
  - Add `NEXT_PUBLIC_POSTHOG_KEY` to your hosting platform
    - Vercel: Project Settings → Environment Variables
    - Netlify: Site Settings → Build & Deploy → Environment
  - Add `NEXT_PUBLIC_POSTHOG_HOST` (if different from default)
  - Set `NODE_ENV=production`

- [ ] **Build & Deploy**
  ```bash
  npm run build
  npm start
  ```
  - Test in production mode locally
  - Deploy to your platform
  - Test live site

- [ ] **Production Verification**
  - Visit your live site
  - Check PostHog Live Events
  - Verify all tracking works
  - Test from different devices/browsers

## 🔒 Privacy & Compliance

- [ ] **GDPR Compliance** (if applicable)
  - [ ] Add cookie consent banner (optional)
  - [ ] Update privacy policy to mention PostHog
  - [ ] Configure data retention in PostHog settings
  - [ ] Review what data is being collected

- [ ] **Data Safety**
  - [ ] Verify no PII (passwords, credit cards) is tracked
  - [ ] Email domains tracked (not full emails) ✓
  - [ ] Sensitive form data excluded ✓
  - [ ] Error messages sanitized ✓

- [ ] **PostHog Settings**
  - [ ] Configure allowed domains in PostHog
  - [ ] Set up IP blocking (if needed)
  - [ ] Configure session recording settings
  - [ ] Set data retention policy

## 📊 Analytics Setup

- [ ] **Create Dashboards**
  - [ ] Landing page performance dashboard
  - [ ] Conversion funnel (Hero → Early Access → Submit)
  - [ ] User engagement metrics
  - [ ] Form abandonment tracking

- [ ] **Set Up Insights**
  - [ ] Daily active users
  - [ ] Early access conversions
  - [ ] Most viewed sections
  - [ ] Average scroll depth
  - [ ] Popular CTAs

- [ ] **Configure Alerts** (optional)
  - [ ] Error rate threshold
  - [ ] Conversion drop alerts
  - [ ] Unusual traffic patterns

## 🎯 Advanced Features (Optional)

- [ ] **Feature Flags**
  - Create your first feature flag in PostHog
  - Test with `analytics.isFeatureEnabled('flag_name')`
  
- [ ] **A/B Testing**
  - Set up experiment in PostHog
  - Use `analytics.getFeatureFlag()` for variants
  
- [ ] **Session Recordings**
  - Enable in PostHog project settings
  - Watch actual user sessions
  - Set privacy controls

- [ ] **Cohorts**
  - Create user segments
  - Track specific user groups
  - Export for marketing

## 📈 Monitoring & Maintenance

- [ ] **Weekly Tasks**
  - [ ] Review top events
  - [ ] Check error logs
  - [ ] Monitor conversion rates
  - [ ] Review session recordings

- [ ] **Monthly Tasks**
  - [ ] Analyze trends
  - [ ] Update dashboards
  - [ ] Review and add new events
  - [ ] Clean up unused events

- [ ] **As Needed**
  - [ ] Add tracking for new features
  - [ ] Update event properties
  - [ ] Refine conversion funnels

## 🆘 Troubleshooting

**Events not appearing?**
1. ✅ Check API key in `.env.local`
2. ✅ Verify `NEXT_PUBLIC_` prefix
3. ✅ Restart dev server after adding env vars
4. ✅ Check browser console for errors
5. ✅ Disable ad blockers
6. ✅ Try incognito/private mode

**Need help?**
- 📖 [Full Setup Guide](./POSTHOG_SETUP.md)
- 🚀 [Quick Start Guide](./ANALYTICS_QUICKSTART.md)
- 💬 [PostHog Community](https://posthog.com/slack)
- 📚 [PostHog Docs](https://posthog.com/docs)

---

## ✨ You're All Set!

Once all boxes are checked, you have a production-ready analytics system tracking user behavior across your entire landing page. 

**Next Steps:**
1. Monitor your dashboard daily
2. Iterate based on user behavior
3. Test new features with feature flags
4. Optimize conversion funnels

Happy tracking! 📊

