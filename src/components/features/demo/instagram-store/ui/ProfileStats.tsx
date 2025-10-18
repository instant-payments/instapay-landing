import { formatNumber } from '@/lib/utils/format-number';
import React from 'react';

type ProfileStatsProps = {
  posts: number;
  followers: number;
  following: number;
};

const ProfileStats: React.FC<ProfileStatsProps> = ({ posts, followers, following }) => {
  return (
    <div className="flex-1">
      <div className="flex justify-around">
        <div className="text-center">
          <div className="text-lg font-semibold">{posts}</div>
          <div className="text-xs text-gray-600">posts</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">{formatNumber(followers)}</div>
          <div className="text-xs text-gray-600">followers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">{following}</div>
          <div className="text-xs text-gray-600">following</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
