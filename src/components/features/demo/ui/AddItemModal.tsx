'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Search, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (product: Product) => void;
}

// Mock recommended products
const recommendedProducts: Product[] = [
  {
    id: '2',
    name: 'Nike Air Max 270',
    price: 3200,
    imageSrc: '/assets/demo_shoes.jpg',
    category: 'Sneakers',
    description: 'Comfortable running shoes',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Black', hex: '#1F2937' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Red', hex: '#DC2626' },
    ],
  },
  {
    id: '3',
    name: 'Adidas Ultraboost 22',
    price: 2800,
    imageSrc: '/assets/demo_polo-red.jpg',
    category: 'Sneakers',
    description: 'High-performance running shoes',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Blue', hex: '#2563EB' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Green', hex: '#059669' },
    ],
  },
  {
    id: '4',
    name: 'Nike Socks Pack',
    price: 450,
    imageSrc: '/assets/demo_post-1.jpg',
    category: 'Accessories',
    description: 'Comfortable athletic socks',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#1F2937' },
      { name: 'White', hex: '#F9FAFB' },
    ],
  },
  {
    id: '5',
    name: 'Shoe Laces Set',
    price: 200,
    imageSrc: '/assets/demo_post-2.jpg',
    category: 'Accessories',
    description: 'Durable shoelaces in various colors',
    sizes: ['120cm', '140cm', '160cm'],
    colors: [
      { name: 'Black', hex: '#1F2937' },
      { name: 'White', hex: '#F9FAFB' },
      { name: 'Red', hex: '#DC2626' },
    ],
  },
  {
    id: '6',
    name: 'Jordan 1 Retro',
    price: 4500,
    imageSrc: '/assets/demo_post-3.jpg',
    category: 'Sneakers',
    description: 'Classic basketball shoes',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Red', hex: '#DC2626' },
      { name: 'Black', hex: '#1F2937' },
      { name: 'White', hex: '#F9FAFB' },
    ],
  },
  {
    id: '7',
    name: 'Shoe Care Kit',
    price: 350,
    imageSrc: '/assets/demo_post-4.jpg',
    category: 'Accessories',
    description: 'Complete shoe maintenance kit',
    sizes: ['One Size'],
    colors: [{ name: 'Universal', hex: '#6B7280' }],
  },
];

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(recommendedProducts);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(recommendedProducts);
    } else {
      const filtered = recommendedProducts.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddItem = (product: Product) => {
    onAddItem(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Search Items</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Large Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                {searchQuery ? `Results (${filteredProducts.length})` : 'Recommended Items'}
              </h3>
              <div className="space-y-3">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-purple-200"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        width={64}
                        height={64}
                        src={product.imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-purple-600">
                          ₴{product.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleAddItem(product)}
                          className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProducts.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No items found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
