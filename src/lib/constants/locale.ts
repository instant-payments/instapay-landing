export const LOCALES = ['ua', 'en'] as const;
export const DEFAULT_LOCALE = 'ua' as const;
export type Locale = (typeof LOCALES)[number];
