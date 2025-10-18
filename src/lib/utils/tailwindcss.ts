import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { theme, ThemeColors } from '../themes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getThemeColor = (keys: ThemeColors): string | undefined => {
  const pathArray = keys.split('.');
  let value: any = theme.colors;
  for (const key of pathArray) {
    value = value[key];
    if (value === undefined) {
      return undefined;
    }
  }
  return value;
};
