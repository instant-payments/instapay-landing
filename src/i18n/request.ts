import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { handleMissingMessages } from './error-handling';
import './types';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  try {
    const messages = (await import(`./messages/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    handleMissingMessages(locale);
    // This will never be reached due to notFound() call, but satisfies TypeScript
    return {
      locale: routing.defaultLocale,
      messages: {},
    };
  }
});
