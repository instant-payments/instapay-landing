import Image from 'next/image';
import React from 'react';

type ProfilePictureProps = {
  name: string;
  imageSrc: string;
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({ name, imageSrc }) => {
  return (
    <div className="flex items-start space-x-4 mb-4">
      <div className="relative">
        <Image
          width={80}
          height={80}
          src={imageSrc}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
