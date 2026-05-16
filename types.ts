import { ReactNode } from 'react';

export enum ViewMode {
  HOME = 'HOME',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN',
  PRICING = 'PRICING',
  ABOUT = 'ABOUT',
  CAREERS = 'CAREERS',
  CONTACT = 'CONTACT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}

export interface NavItem {
  label: string;
  href: string; // Used for hash scrolling or external links
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface PricingTierProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}