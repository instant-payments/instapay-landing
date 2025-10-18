import type { Product } from '../../types';
import { Story } from './types';

import profileLogoImage from '/public/assets/demo_profile-logo.jpg';
import shoesImage from '/public/assets/demo_shoes.jpg';
import poloRedImage from '/public/assets/demo_polo-red.jpg';
import reviewImage from '/public/assets/demo_review.jpg';

import demoPostImage1 from '/public/assets/demo_post-1.jpg';
import demoPostImage2 from '/public/assets/demo_post-2.jpg';
import demoPostImage3 from '/public/assets/demo_post-3.jpg';
import demoPostImage4 from '/public/assets/demo_post-4.jpg';
import demoPostImage5 from '/public/assets/demo_post-5.jpg';
import demoPostImage6 from '/public/assets/demo_post-6.jpg';
import demoPostImage7 from '/public/assets/demo_post-7.jpg';

export const mockProduct: Product = {
  id: 'product-1',
  name: 'Premium Shoes',
  price: 7300,
  imageSrc: shoesImage.src,
  description: 'High-quality shoes',
  sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  colors: [
    { name: 'Black', hex: '#1F2937' },
    { name: 'White', hex: '#F9FAFB' },
    { name: 'Purple', hex: '#8B5CF6' },
  ],
};

export const novaPostBranches = [
  'Відділення №1 (вул. Хрещатик, 1)',
  'Відділення №5 (вул. Велика Васильківська, 15)',
  'Відділення №12 (просп. Перемоги, 45)',
  'Відділення №23 (вул. Саксаганського, 78)',
  'Відділення №34 (бул. Лесі Українки, 24)',
  'Відділення №67 (вул. Антоновича, 120)',
  'Відділення №89 (просп. Героїв Сталінграду, 2А)',
  'Відділення №102 (вул. Борщагівська, 145)',
];

export const ukrainianCities = [
  'Київ',
  'Харків',
  'Одеса',
  'Дніпро',
  'Львів',
  'Запоріжжя',
  'Кривий Ріг',
  'Миколаїв',
  'Маріуполь',
  'Вінниця',
  'Херсон',
  'Полтава',
  'Чернігів',
  'Черкаси',
  'Суми',
  'Житомир',
];

export const sampleShippingData = {
  fullName: 'Олександр Петренко',
  phoneNumber: '+380 97 123 45 67',
  city: 'Київ',
  novaPoshtaBranch: 'Відділення №1 (вул. Хрещатик, 1)',
};

export const samplePaymentData = {
  cardNumber: '4242 4242 4242 4242',
  expirationDate: '12/26',
  cvc: '123',
  nameOnCard: 'Oleksandr Petrenko',
  paymentMethod: 'card' as const,
};

export const storeProfileMock = {
  name: 'Shoesify',
  imageSrc: profileLogoImage.src,
  handle: 'shoesify',
  bio: 'Premium shoes all over the globe',
  website: 'shoesify.store',
  posts: 69,
  followers: 8542,
  following: 7,
  verified: true,
};

export const storiesMock: Story[] = [
  {
    id: 'story-1',
    title: 'NEW',
    image: shoesImage.src,
    highlighted: true,
    slide: {
      image: shoesImage.src,
      text: 'Premium basketball shoes',
      subtext: 'Latest drop',
      cta: 'Buy now',
      website: storeProfileMock.website,
    },
  },
  {
    id: 'story-2',
    title: 'Sale 50%',
    image: poloRedImage.src,
    highlighted: false,
  },
  {
    id: 'story-3',
    title: 'Reviews',
    image: reviewImage.src,
    highlighted: false,
  },
];

export const instagramStoreDataMock = {
  profile: storeProfileMock,
  stories: storiesMock,
  posts: [
    {
      id: '1',
      image: demoPostImage1.src,
      likes: 324,
      isVideo: false,
    },
    {
      id: '2',
      image: demoPostImage2.src,
      likes: 189,
      isVideo: true,
    },
    {
      id: '3',
      image: demoPostImage3.src,
      likes: 456,
      isVideo: false,
    },
    {
      id: '4',
      image: demoPostImage4.src,
      likes: 456,
      isVideo: false,
    },
    {
      id: '5',
      image: demoPostImage5.src,
      likes: 456,
      isVideo: false,
    },
    {
      id: '6',
      image: demoPostImage6.src,
      likes: 456,
      isVideo: false,
    },
    {
      id: '7',
      image: demoPostImage7.src,
      likes: 456,
      isVideo: false,
    },
  ],
};
