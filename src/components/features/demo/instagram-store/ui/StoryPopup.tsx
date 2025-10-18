import { Heart, MoreVertical, Pause, Send, X } from 'lucide-react';
import React from 'react';
import { InteractiveStory, Story } from '../lib/types';
import BuyNowButton from './BuyNowButton';
import Image from 'next/image';
import { storeProfileMock } from '../lib/constants';
import Input from '../../ui/Input';

type StoryPopupProps = {
  story: InteractiveStory;

  onNext: () => void;
  onClose: () => void;
};

export const Profile: React.FC<Pick<StoryPopupProps, 'story'>> = ({ story }) => {
  return (
    <div className="flex w-full gap-1">
      <div className="flex items-center gap-1">
        <Image width={30} height={30} src={story.image} alt="" className="rounded-full w-8 h-8" />
      </div>
      <div className="pt-1 flex items-center gap-1">
        <p className="text-xs text-white/90 ">{storeProfileMock.handle}</p>
        <time className="text-xs text-white/60">3d</time>
      </div>
    </div>
  );
};

const StoryPopup: React.FC<StoryPopupProps> = ({ story, onClose, onNext }) => {
  return (
    <div
      className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <div className="relative w-full h-[90%] rounded-t-xl overflow-hidden max-w-md mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg z-10">
          <div className="h-0.5 bg-white bg-opacity-30 rounded">
            <div className="h-full bg-white rounded w-full transition-all duration-300" />
          </div>
        </div>

        <div className="relative w-full h-full bg-black z-10 flex">
          {/* story header */}
          <div className="flex flex-col gap-1.5 absolute top-3 w-[95%] justify-between left-1/2 -translate-x-1/2 z-10">
            <div className="w-full h-0.5 bg-white/30" />
            <div className="flex items-center w-full">
              <Profile story={story} />
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

          {/* story main */}
          <Image
            width={200}
            height={30}
            src={story.image}
            alt="Story"
            className="w-full object-cover h-full"
          />

          {/* story footer */}
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

          {/* CTA */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
            <BuyNowButton onClick={onNext} />
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-10 w-8 h-8 bg-opacity-50 rounded-full flex items-center justify-center"
      >
        <X size={30} className="text-white cursor-pointer" />
      </button>
    </div>
  );
};

export default StoryPopup;
