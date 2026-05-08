/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Chicken' | 'Fries' | 'Drinks' | 'Desserts';
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'Kigali Hill Beast',
    category: 'Burgers',
    price: 8500,
    rating: 4.9,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    description: 'Double flame-grilled Akagera beef, secret Hill sauce, organic provolone, and caramelized onions from the valleys.',
    badge: 'Kigali Favorite'
  },
  {
    id: 'b2',
    name: 'Volcano Spice',
    category: 'Burgers',
    price: 7500,
    rating: 4.7,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800',
    description: 'Rwandan bird\'s eye chili beef patty, zesty spicy mango slaw, and creamy local goat cheese for the heat.',
    badge: 'Extra Hot'
  },
  {
    id: 'b3',
    name: 'Nyarutarama Truffle',
    category: 'Burgers',
    price: 12000,
    rating: 5.0,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1550317144-b38c270323ee?q=80&w=800',
    description: 'Ultra-premium wagyu beef, wild mountain truffles, aged Rwandan cheddar, and a drizzle of organic honey.',
    badge: 'Chef\'s Special'
  },
  {
    id: 'c1',
    name: 'Gisenyi Chicken',
    category: 'Chicken',
    price: 6500,
    rating: 4.8,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800',
    description: 'Marinated in Gisenyi mountain herbs, hand-breaded crispy chicken breast glazed with aged piri-piri.',
  },
  {
    id: 'c2',
    name: 'Rebero Roast',
    category: 'Chicken',
    price: 9500,
    rating: 4.6,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800',
    description: 'Slow-roasted chicken thighs, basted in lemon-thyme butter and served with a side of hill-country gravy.',
  },
  {
    id: 'f1',
    name: 'Garden Fresh Fries',
    category: 'Fries',
    price: 3500,
    rating: 4.9,
    reviews: 3400,
    image: 'https://images.unsplash.com/photo-1573016608244-7d5ef1976091?q=80&w=800',
    description: 'Triple-cooked local Musanze potatoes tossed in wild rainforest herbs and Rwandan pink sea salt.',
    badge: 'Organic'
  },
  {
    id: 'd1',
    name: 'Virunga Choco Dream',
    category: 'Desserts',
    price: 5500,
    rating: 4.9,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
    description: 'Handcrafted Rwandan dark chocolate, organic vanilla milk, and cocoa nibs from local growers.',
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Jean-Luc Habimana',
    avatar: 'https://i.pravatar.cc/150?u=jean',
    rating: 5,
    comment: 'The freshest ingredients I have tasted in Kigali. That Kigali Hill Beast is absolute fire!',
    date: '2 days ago'
  },
  {
    id: 'r2',
    name: 'Diane Umutoni',
    avatar: 'https://i.pravatar.cc/150?u=diane',
    rating: 5,
    comment: 'Finally, a gourmet burger spot in Nyarutarama that gets delivery right. Green and clean!',
    date: '1 week ago'
  }
];

export const CATEGORIES = ['Burgers', 'Chicken', 'Fries', 'Drinks', 'Desserts'] as const;
