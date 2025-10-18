import { theme } from './darkTheme';

export type Colors = typeof theme.colors;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: Join<K, Paths<T[K], Prev[D]>>;
    }[keyof T]
  : '';

export type ThemeColors = Paths<Colors>;
