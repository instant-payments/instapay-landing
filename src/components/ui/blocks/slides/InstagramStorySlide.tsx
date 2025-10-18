'use client';

import React from 'react';
import { Instagram, Heart, Send, X, MoreVertical, Pause } from 'lucide-react';
import Image from 'next/image';
import {
  storeProfileMock,
  storiesMock,
} from '@/components/features/demo/instagram-store/lib/constants';
import BuyNowButton from '@/components/features/demo/instagram-store/ui/BuyNowButton';
import Input from '@/components/features/demo/ui/Input';
import { Profile } from '@/components/features/demo/instagram-store/ui/StoryPopup';
import { InteractiveStory } from '@/components/features/demo/instagram-store/lib/types';

const InstagramStorySlide: React.FC = () => {
  const story = storiesMock[0];

  return (
    <div className="relative w-full h-full bg-black z-10 flex">
      <div className="flex flex-col gap-1.5 absolute top-3 w-[95%] justify-between left-1/2 -translate-x-1/2 z-10">
        <div className="w-full h-0.5 bg-white/30" />
        <div className="flex items-center w-full">
          <Profile story={story as InteractiveStory} />
          <div className="flex items-center gap-2 pr-1">
            <button>
              <Pause size={14} className="fill-white text-white" />
            </button>
            <button>
              <MoreVertical className="text-white rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute z-5 bg-black/20 w-full h-full" />

      <Image
        width={200}
        height={30}
        src={story.image}
        alt="Story"
        className="w-full object-cover h-full"
      />

      <div className="flex gap-2 absolute bottom-3 w-[95%] justify-between left-1/2 -translate-x-1/2 z-10">
        <Input
          className="ring-0 focus:ring-0 backdrop-blur-sm outline-0 text-white placeholder:text-white/40 placeholder:text-[11px] bg-transparent border border-white/40 focus:border-white/60 rounded-3xl text-[11px]"
          placeholder={`Reply to ${storeProfileMock.handle}...`}
        />
        <button>
          <Heart size={22} className="text-white/80" />
        </button>
        <button>
          <Send size={22} className="text-white/80" />
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
        <BuyNowButton />
      </div>
    </div>
  );
};

export default InstagramStorySlide;
