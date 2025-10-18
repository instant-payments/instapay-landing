import React from 'react';
import { cn } from '@/lib/utils/tailwindcss';
import { Story } from '../lib/types';
import { instagramStoreDataMock } from '../lib/constants';
import Image from 'next/image';

type StoryListProps = {
  onOpen: (story: Story) => void;
};

const StoryList: React.FC<StoryListProps> = ({ onOpen }) => {
  const { stories } = instagramStoreDataMock;

  return (
    <div className="px-4 mb-4">
      <div className="flex space-x-4 pb-2">
        {stories.map(story => {
          const isClickable = story.highlighted;

          return (
            <div key={story.id} className="flex flex-col gap-1 items-center justify-center">
              <div className="relative">
                <div
                  className={cn(
                    'w-16 h-16 rounded-full transition-all duration-300 relative',
                    isClickable ? 'cursor-pointer p-0.5' : 'cursor-default'
                  )}
                  aria-disabled={!isClickable}
                  onClick={() => onOpen(story)}
                >
                  {story.highlighted ? (
                    <>
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, #E1306C, #FD1D1D, #F77737, #FCAF45, #FFDC80, #8A3AB9, #E1306C)`,
                          animation: 'spin 8s linear infinite',
                          filter: 'blur(0.5px)',
                        }}
                      />
                      <div className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping" />
                      <div className="absolute -inset-1 rounded-full bg-blue-500/20 animate-pulse" />
                    </>
                  ) : null}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      width={30}
                      height={30}
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />

                    {story.highlighted && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full" />
                    )}

                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-30 border-2 border-white"></div>
                  </div>
                </div>
              </div>
              <span className={cn('text-xs text-center truncate w-16', 'text-gray-700')}>
                {story.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryList;
