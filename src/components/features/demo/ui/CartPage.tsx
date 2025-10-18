'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '../../../ui/controls/Button';
import CheckoutHeader from './CheckoutHeader';
import AddItemModal from './AddItemModal';
import InlineRecommendations from './InlineRecommendations';
import CollapsibleCartItem from './CollapsibleCartItem';
import { mockProduct } from '../instagram-store/lib/constants';
import { CartItem } from '../types';

interface CartPageProps {
  onContinue: (items: CartItem[]) => void;
  onBackToShop: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onContinue, onBackToShop }) => {
  const t = useTranslations('demo.cart');
  
  // Initialize with the first product
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      ...mockProduct,
      selectedSize: mockProduct.sizes[0],
      selectedColor: mockProduct.colors[0].name,
      quantity: 1,
    },
  ]);
  
  const [expandedItemId, setExpandedItemId] = useState<string | null>(mockProduct.id);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleContinue = () => {
    onContinue(cartItems);
  };

  const handleAddItem = (product: any) => {
    // Ensure the product has the required structure
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      description: product.description || '',
      sizes: product.sizes || [],
      colors: product.colors || [],
      selectedSize: product.sizes?.[0] || 'One Size',
      selectedColor: product.colors?.[0]?.name || 'Default',
      quantity: 1,
    };
    
    // Add item to cart and expand it
    setCartItems([...cartItems, newItem]);
    setExpandedItemId(newItem.id);
    setIsAddItemModalOpen(false);
  };

  const handleToggleItem = (itemId: string) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  const handleUpdateItem = (index: number, updatedItem: CartItem) => {
    const newItems = [...cartItems];
    newItems[index] = updatedItem;
    setCartItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    
    // If removed item was expanded, collapse all
    if (expandedItemId === cartItems[index].id) {
      setExpandedItemId(null);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <CheckoutHeader currentStep="cart" onBack={onBackToShop} />

      {/* Cart Items List */}
      <div className="space-y-3">
        {cartItems.map((item, index) => (
          <CollapsibleCartItem
            key={`${item.id}-${index}`}
            item={item}
            isExpanded={expandedItemId === item.id}
            onToggle={() => handleToggleItem(item.id)}
            onUpdate={(updatedItem) => handleUpdateItem(index, updatedItem)}
            onRemove={() => handleRemoveItem(index)}
          />
        ))}
      </div>

      {/* Add More Items Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <InlineRecommendations 
          onAddItem={handleAddItem} 
          onSearchClick={() => setIsAddItemModalOpen(true)} 
        />
      </div>

      {/* Cart Summary */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-600">{t('total')}</span>
          <span className="text-xl font-semibold text-gray-900">₴{subtotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button fullWidth onClick={handleContinue} className="rounded-2xl shadow-lg mb-6">
        {t('continueToShipping')}
      </Button>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default CartPage;
