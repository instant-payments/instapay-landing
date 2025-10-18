import { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageSrc: string | StaticImageData;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  phoneNumber: string;
  city: string;
  novaPoshtaBranch: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  nameOnCard: string;
  paymentMethod: 'card' | 'apple-pay' | 'google-pay';
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: string;
  createdAt: Date;
}
