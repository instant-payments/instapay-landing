'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
}

interface InlineRecommendationsProps {
  onAddItem: (product: RecommendedProduct) => void;
  onSearchClick: () => void;
}

// Small recommended items (socks, laces, etc.)
const recommendedItems: RecommendedProduct[] = [
  {
    id: 'socks-1',
    name: 'Nike Socks Pack',
    price: 450,
    imageSrc: '/assets/demo_post-1.jpg'
  },
  {
    id: 'laces-1',
    name: 'Shoe Laces Set',
    price: 200,
    imageSrc: '/assets/demo_post-2.jpg'
  },
  {
    id: 'care-1',
    name: 'Shoe Care Kit',
    price: 350,
    imageSrc: '/assets/demo_post-4.jpg'
  },
  {
    id: 'jordan-1',
    name: 'Jordan 1 Retro',
    price: 4500,
    imageSrc: '/assets/demo_post-3.jpg'
  },
  {
    id: 'ultraboost-1',
    name: 'Adidas Ultraboost',
    price: 2800,
    imageSrc: '/assets/demo_polo-red.jpg'
  }
];

const InlineRecommendations: React.FC<InlineRecommendationsProps> = ({ onAddItem, onSearchClick }) => {
  const t = useTranslations('demo.cart');
  
  return (
    <div>
      {/* Search Button */}
      <div className="mb-4">
        <button
          onClick={onSearchClick}
          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors"
        >
          <Search size={16} className="text-gray-400" />
          <span>{t('searchForMoreItems')}</span>
        </button>
      </div>

      {/* Section Title */}
      <h3 className="text-sm font-medium text-gray-700 mb-3">{t('youMayAlsoLike')}</h3>
      
      {/* Product Carousel */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {recommendedItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-24 bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition-all duration-200 hover:border-purple-200"
          >
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-50 mb-2">
              <Image
                width={80}
                height={80}
                src={item.imageSrc}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
              {item.name}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600">
                ₴{item.price.toLocaleString()}
              </span>
              <button
                onClick={() => onAddItem(item)}
                className="p-1.5 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InlineRecommendations;

