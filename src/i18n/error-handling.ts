import { notFound } from 'next/navigation';

export function handleTranslationError(error: unknown, key: string, locale: string) {
  console.error(`Translation error for key "${key}" in locale "${locale}":`, error);

  // In development, you might want to show the key as fallback
  if (process.env.NODE_ENV === 'development') {
    return `[Missing: ${key}]`;
  }

  // In production, you might want to fallback to English or show a generic message
  return 'Translation not available';
}

export function handleMissingLocale(locale: string) {
  console.error(`Missing locale: ${locale}`);
  notFound();
}

export function handleMissingMessages(locale: string) {
  console.error(`Missing messages for locale: ${locale}`);
  notFound();
}
