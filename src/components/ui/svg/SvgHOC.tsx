import React, { ComponentType, SVGProps } from 'react';

import { ThemeColors } from '@/lib/themes';
import { getThemeColor } from '@/lib/utils/tailwindcss';

export type TSvgHOCProps = {
  size?: number;
  fill?: ThemeColors;
};

export const SvgHOC = <P extends SVGProps<SVGSVGElement>>(Component: ComponentType<P>) => {
  const SvgComponent: React.FC<TSvgHOCProps & P> = ({ fill, size = 16, ...props }) => (
    <Component
      fill={fill ? getThemeColor(fill) : undefined}
      width={size}
      height={size}
      style={{ minWidth: size, minHeight: size, display: 'inline' }}
      {...(props as unknown as P)}
    />
  );

  return SvgComponent;
};
