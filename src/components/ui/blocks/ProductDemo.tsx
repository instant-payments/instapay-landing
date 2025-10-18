'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Instagram,
  ShoppingBag,
  Truck,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import InstagramStorySlide from './slides/InstagramStorySlide';
import CartSlide from './slides/CartSlide';
import ShippingSlide from './slides/ShippingSlide';
import PaymentSlide from './slides/PaymentSlide';
import ThankYouSlide from './slides/ThankYouSlide';
import {
  mockProduct,
  sampleShippingData,
  samplePaymentData,
} from '@/components/features/demo/instagram-store/lib/constants';
import { CartItem, ShippingInfo, PaymentInfo, Order } from '@/components/features/demo/types';

type TabType = 'slideshow' | 'video';

const ProductDemo: React.FC = () => {
  const t = useTranslations();
  const tStats = useTranslations('demoStats');
  const tSlides = useTranslations('slides');
  const [activeTab, setActiveTab] = useState<TabType>('slideshow');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-filled demo data
  const [cartItem] = useState<CartItem>({
    ...mockProduct,
    selectedSize: '42',
    selectedColor: 'Black',
    quantity: 1,
  });

  const [shippingInfo] = useState<ShippingInfo>(sampleShippingData);
  const [paymentInfo] = useState<PaymentInfo>(samplePaymentData);

  const [order] = useState<Order>({
    id: `IP${Date.now().toString().slice(-6)}`,
    items: [cartItem],
    shipping: shippingInfo,
    payment: paymentInfo,
    subtotal: cartItem.price * cartItem.quantity,
    shipping_cost: 150,
    tax: Math.round(cartItem.price * cartItem.quantity * 0.2),
    total:
      cartItem.price * cartItem.quantity +
      150 +
      Math.round(cartItem.price * cartItem.quantity * 0.2),
    status: 'confirmed',
    createdAt: new Date(),
  });

  const slides = [
    {
      id: 'instagram',
      title: tSlides('instagram.title'),
      icon: Instagram,
      description: 'Customer sees product in Instagram story',
      color: 'from-pink-500 to-purple-600 bg-pink-500',
      component: <InstagramStorySlide />,
    },
    {
      id: 'checkout',
      title: tSlides('cart.title'),
      icon: ShoppingBag,
      description: '2-3 step checkout process',
      color: 'from-purple-500 to-blue-600 bg-purple-500 bg-opacity-35',
      component: <CartSlide />,
    },
    {
      id: 'shipping',
      title: tSlides('shipping.title'),
      icon: Truck,
      description: 'Easy shipping form with Nova Post',
      color: 'from-blue-500 to-green-600 bg-green-600 bg-opacity-35',
      component: <ShippingSlide />,
    },
    {
      id: 'payment',
      title: tSlides('payment.title'),
      icon: CheckCircle,
      description: 'Secure payment processing',
      color: 'from-green-500 to-emerald-600 bg-emerald-600 bg-opacity-35',
      component: <PaymentSlide />,
    },
    {
      id: 'thankyou',
      title: tSlides('thankYou.orderConfirmed'),
      icon: CheckCircle,
      description: 'Instant order confirmation',
      color: 'from-emerald-500 to-teal-600 bg-teal-600 bg-opacity-35',
      component: <ThankYouSlide />,
    },
  ];

  // Auto-advance slideshow (paused on hover)
  useEffect(() => {
    if (activeTab === 'slideshow' && !isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [activeTab, slides.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[900px]">
        {activeTab === 'slideshow' ? (
          <>
            {/* Slideshow Container */}
            <div
              className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slide Content */}
              <div className="relative w-full h-full min-h-[650px] overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-x-0 scale-100'
                        : index < currentSlide
                        ? 'opacity-0 -translate-x-full scale-95'
                        : 'opacity-0 translate-x-full scale-95'
                    }`}
                  >
                    {slide.component}
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Stats */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5 min</div>
                  <div className="text-xs text-gray-600">{tStats('setupTime')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1.5x</div>
                  <div className="text-xs text-gray-600">{tStats('moreSales')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-xs text-gray-600">{tStats('autoCheckout')}</div>
                </div>
              </div>

              {/* Current Step Indicator */}
              <div className="mb-4 text-center">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${slides[currentSlide].color} text-white`}
                >
                  {React.createElement(slides[currentSlide].icon, { className: 'w-3 h-3 mr-1' })}
                  {slides[currentSlide].title}
                </div>
              </div>

              {/* Live Demo Button */}
              <Link
                href="/demo"
                className={`w-full bg-gradient-to-r ${slides[currentSlide].color} hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-all duration-500 transform hover:scale-105 shadow-lg`}
              >
                {t('demo.tryLiveDemo')} →
              </Link>
            </div>
          </>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-200">
                <Play className="w-8 h-8 text-purple-600 ml-1" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">See It In Action</h3>
              <p className="text-white text-sm opacity-90">
                Watch how easy it is to create checkout links
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDemo;
