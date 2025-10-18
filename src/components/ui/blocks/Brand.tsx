import React from 'react';
import { Link } from '@/i18n/navigation';
import LightningIcon from '../icons/LightningIcon';
import IconBackground from './IconBackground';

type BrandProps = {
  withLogo?: boolean;
  clickable?: boolean;
};

const Brand: React.FC<BrandProps> = ({ withLogo = true, clickable = false }) => {
  const content = (
    <div className="flex items-center gap-1.5">
      {withLogo ? (
        <IconBackground size="sm" variant="purple">
          <LightningIcon size={32} />
        </IconBackground>
      ) : null}

      <p className="font-medium text-[18px] tracking-wider">InstaPay</p>
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};

export default Brand;
