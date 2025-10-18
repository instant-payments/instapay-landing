'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { instagramStoreDataMock } from './lib/constants';
import { InteractiveStory, Story } from './lib/types';
import { Bookmark, Grid3X3, Play, UserSquare2 } from 'lucide-react';

import ProfileHeader from './ui/ProfileHeader';
import ProfilePicture from './ui/ProfilePicture';
import ProfileStats from './ui/ProfileStats';
import Button from '@/components/ui/controls/Button';
import StoryList from './ui/StoryList';
import StoryPopup from './ui/StoryPopup';

type Props = {
  onNextStep: () => void;
};

const InstagramStoreStep: React.FC<Props> = ({ onNextStep }) => {
  const t = useTranslations('demo.instagram');
  const { profile, posts } = instagramStoreDataMock;
  const [selectedStory, setSelectedStory] = useState<InteractiveStory | null>(null);

  const openStory = (story: Story) => {
    if (story.highlighted) {
      setSelectedStory(story);
    }
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white h-[calc(100vh-90px)] overflow-hidden">
      <ProfileHeader handle={profile.handle} verified={profile.verified} />
      <div className="p-4">
        <div className="flex items-center">
          <ProfilePicture name={profile.name} imageSrc={profile.imageSrc} />
          <ProfileStats
            posts={profile.posts}
            followers={profile.followers}
            following={profile.following}
          />
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-sm mb-1">{profile.name}</h2>
          <div className="text-sm text-gray-700 whitespace-pre-line mb-2">{profile.bio}</div>
          <a href="#" className="text-sm text-blue-900 font-medium">
            {profile.website}
          </a>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-300 text-black font-semibold"
          >
            {t('following')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-300 text-black font-semibold"
          >
            {t('message')}
          </Button>
          <Button variant="outline" size="sm" className="px-3 border-gray-300">
            <UserSquare2 size={16} className="text-black" />
          </Button>
        </div>

        <StoryList onOpen={openStory} />

        <div className="border-t border-gray-200">
          <div className="flex">
            <div className="flex-1 py-3 flex justify-center border-b border-black">
              <Grid3X3 size={24} className="text-black" />
            </div>
            <div className="flex-1 py-3 flex justify-center">
              <Bookmark size={24} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 p-0.5">
          {posts.map(post => (
            <div
              key={post.id}
              className="relative w-full aspect-square cursor-pointer h-[200px] border border-white"
            >
              <div className="absolute inset-0 bg-black/20" />
              <Image
                width={100}
                height={30}
                src={post.image}
                alt="Story"
                className="w-full object-cover h-full"
              />
              {post.isVideo && (
                <div className="absolute top-2 right-2">
                  <Play size={16} className="text-white fill-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedStory ? (
          <StoryPopup story={selectedStory} onNext={onNextStep} onClose={closeStory} />
        ) : null}
      </div>
    </div>
  );
};

export default InstagramStoreStep;
