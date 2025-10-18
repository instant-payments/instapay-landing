import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

type ProfileHeaderProps = {
  handle: string;
  verified: boolean;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ handle, verified }) => {
  const t = useTranslations('demo.header');

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold">{handle}</h1>
        {verified ? (
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          </div>
        ) : null}
      </div>
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-xs group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        {t('backToLanding')}
      </Link>
    </div>
  );
};

export default ProfileHeader;
