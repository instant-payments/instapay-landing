// PostHog server-side initialization
// This file runs once when the server starts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { PostHog } = await import('posthog-node');

    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      });

      // Gracefully shutdown PostHog on process exit
      process.on('SIGINT', async () => {
        await posthog.shutdown();
      });

      process.on('SIGTERM', async () => {
        await posthog.shutdown();
      });
    }
  }
}
