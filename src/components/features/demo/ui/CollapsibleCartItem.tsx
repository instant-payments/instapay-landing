'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CartItem } from '../types';

interface CollapsibleCartItemProps {
  item: CartItem;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (updatedItem: CartItem) => void;
  onRemove: () => void;
}

const CollapsibleCartItem: React.FC<CollapsibleCartItemProps> = ({
  item,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
}) => {
  const t = useTranslations('demo.cart');
  const [selectedSize, setSelectedSize] = useState(item.selectedSize);
  const [selectedColor, setSelectedColor] = useState(item.selectedColor);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onUpdate({
      ...item,
      selectedSize,
      selectedColor,
      quantity: newQuantity,
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onUpdate({
      ...item,
      selectedSize: size,
      selectedColor,
      quantity,
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onUpdate({
      ...item,
      selectedSize,
      selectedColor: color,
      quantity,
    });
  };

  const itemTotal = item.price * quantity;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Collapsed View */}
      <div
        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
          isExpanded ? 'bg-gray-50' : ''
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              width={64}
              height={64}
              src={item.imageSrc as string}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              {selectedColor} • {selectedSize} • Qty: {quantity}
            </p>
            <p className="text-sm font-bold text-purple-600 mt-1">
              ₴{itemTotal.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
            <div className="text-gray-400">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded View */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'max-h-[1000px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
          {/* Product Image */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-50">
            <Image
              width={400}
              height={400}
              src={item.imageSrc as string}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Description */}
          <div>
            <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
            <p className="text-gray-600 text-xs mt-1">{item.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-purple-600">
              ₴{item.price.toLocaleString()}
            </span>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="text-sm font-semibold px-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Size Selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">{t('size')}</label>
              <div className="grid grid-cols-4 gap-1">
                {item.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {item.colors && item.colors.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">{t('color')}</label>
              <div className="grid grid-cols-2 gap-1">
                {item.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.name)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium transition-all flex items-center space-x-1 ${
                      selectedColor === color.name
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Item Total */}
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('itemTotal')}</span>
            <span className="text-lg font-bold text-gray-900">₴{itemTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCartItem;

