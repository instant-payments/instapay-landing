'use client';

import React, { useState, useEffect, useRef } from 'react';
import Layout from './ui/Layout';
import CartPage from './ui/CartPage';
import ShippingPage from './ui/ShippingPage';
import PaymentPage from './ui/PaymentPage';
import ThankYouPage from './ui/ThankYouPage';
import InstagramStoreStep from './instagram-store/InstagramStoreStep';
import ProfileAssistant from './shared/ProfileAssistant';
import { mockProduct } from './instagram-store/lib/constants';
import { CartItem, Order, PaymentInfo, ShippingInfo } from './types';
import { analytics } from '@/lib/analytics/posthog';

type Step = 'instagram' | 'cart' | 'shipping' | 'payment' | 'complete';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('instagram');
  // Initialize cart with the default product
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      ...mockProduct,
      selectedSize: mockProduct.sizes[0],
      selectedColor: mockProduct.colors[0].name,
      quantity: 1,
    },
  ]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [_paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const stepStartTime = useRef<number>(Date.now());
  const demoStartTime = useRef<number>(Date.now());

  const getStepNumber = (step: Step): number => {
    const steps = { instagram: -1, cart: 0, shipping: 1, payment: 2, complete: 3 };
    return steps[step];
  };

  const handleInstagramContinue = () => {
    const duration = Math.round((Date.now() - stepStartTime.current) / 1000);
    analytics.events.demoStepCompleted('instagram', duration);
    analytics.events.demoViewed('cart');
    stepStartTime.current = Date.now();
    setCurrentStep('cart');
  };

  const handleCartContinue = (items: CartItem[]) => {
    const duration = Math.round((Date.now() - stepStartTime.current) / 1000);
    analytics.events.demoStepCompleted('cart', duration);
    analytics.events.demoViewed('shipping');
    stepStartTime.current = Date.now();
    setCartItems(items);
    setCurrentStep('shipping');
  };

  const handleShippingContinue = (shipping: ShippingInfo) => {
    const duration = Math.round((Date.now() - stepStartTime.current) / 1000);
    analytics.events.demoStepCompleted('shipping', duration);
    analytics.events.demoViewed('payment');
    stepStartTime.current = Date.now();
    setShippingInfo(shipping);
    setCurrentStep('payment');
  };

  const handlePaymentComplete = (payment: PaymentInfo) => {
    setPaymentInfo(payment);

    if (cartItems.length > 0 && shippingInfo) {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping_cost = 0;
      const tax = 0;
      const total = subtotal;

      const newOrder: Order = {
        id: `IP${Date.now().toString().slice(-6)}`,
        items: cartItems,
        shipping: shippingInfo,
        payment: payment,
        subtotal,
        shipping_cost,
        tax,
        total,
        status: 'confirmed',
        createdAt: new Date(),
      };

      const stepDuration = Math.round((Date.now() - stepStartTime.current) / 1000);
      const totalDuration = Math.round((Date.now() - demoStartTime.current) / 1000);

      analytics.events.demoStepCompleted('payment', stepDuration);
      analytics.events.demoFlowCompleted(totalDuration);
      analytics.events.demoViewed('complete');

      setOrder(newOrder);
      setCurrentStep('complete');
    }
  };

  const handleBackToShop = () => {
    analytics.events.demoInteracted('back_to_shop', { from_step: currentStep });
    // Reset all state
    setCurrentStep('instagram');
    setCartItems([]);
    setShippingInfo(null);
    setPaymentInfo(null);
    setOrder(null);
    stepStartTime.current = Date.now();
    demoStartTime.current = Date.now();
  };

  const handleBack = () => {
    if (currentStep === 'cart') {
      analytics.events.demoBackClicked('cart', 'instagram');
      setCurrentStep('instagram');
    } else if (currentStep === 'shipping') {
      analytics.events.demoBackClicked('shipping', 'cart');
      setCurrentStep('cart');
    } else if (currentStep === 'payment') {
      analytics.events.demoBackClicked('payment', 'shipping');
      setCurrentStep('shipping');
    }
    stepStartTime.current = Date.now();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'instagram':
        return <InstagramStoreStep onNextStep={handleInstagramContinue} />;

      case 'cart':
        return <CartPage onContinue={handleCartContinue} onBackToShop={handleBackToShop} />;

      case 'shipping':
        return <ShippingPage onContinue={handleShippingContinue} onBack={handleBack} />;

      case 'payment':
        return cartItems.length > 0 && shippingInfo ? (
          <PaymentPage
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            onContinue={handlePaymentComplete}
            onBack={handleBack}
          />
        ) : null;

      case 'complete':
        return order ? <ThankYouPage order={order} onBackToShop={handleBackToShop} /> : null;

      default:
        return <InstagramStoreStep onNextStep={handleInstagramContinue} />;
    }
  };

  // Track demo view on mount
  useEffect(() => {
    analytics.events.demoViewed('instagram');
    stepStartTime.current = Date.now();
    demoStartTime.current = Date.now();
  }, []);

  // Track abandonment on unmount
  useEffect(() => {
    return () => {
      if (currentStep !== 'complete') {
        analytics.events.demoAbandoned(currentStep);
      }
    };
  }, [currentStep]);

  return (
    <>
      <Layout
        step={getStepNumber(currentStep)}
        onBack={currentStep !== 'instagram' && currentStep !== 'complete' ? handleBack : undefined}
        showBackButton={currentStep !== 'complete' && currentStep !== 'instagram'}
      >
        {renderCurrentStep()}
      </Layout>
    </>
  );
};

export default App;
