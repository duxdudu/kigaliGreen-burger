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
  country: string;
  badge?: string;
  ingredients?: string[];
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
    name: 'Rwanda Volcano',
    category: 'Burgers',
    price: 8500,
    rating: 4.9,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    description: 'Double flame-grilled beef, bird\'s eye chili, and organic local cheddar.',
    country: 'Rwanda',
    badge: 'Signature',
    ingredients: ['Akagera Beef', 'Bird\'s Eye Chili', 'Local Cheddar', 'Organic Lettuce', 'Vine Tomatoes']
  },
  {
    id: 'b2',
    name: 'Texas Titan',
    category: 'Burgers',
    price: 9500,
    rating: 4.8,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800',
    description: 'Smoky BBQ glaze, crispy bacon, and oversized onion rings.',
    country: 'USA',
    badge: 'Heavyweight',
    ingredients: ['Grain-fed Beef', 'Double Bacon', 'Crispy Onion Rings', 'Smoky BBQ Sauce', 'Colby Jack']
  },
  {
    id: 'b3',
    name: 'Tokyo Umami',
    category: 'Burgers',
    price: 11000,
    rating: 4.9,
    reviews: 850,
    image: 'https://images.unsplash.com/photo-1550317144-b38c270323ee?q=80&w=800',
    description: 'Wagyu beef, shiitake mushrooms, and wasabi-infused mayo.',
    country: 'Japan',
    badge: 'Premium',
    ingredients: ['Wagyu Beef', 'Shiitake Mushrooms', 'Wasabi Mayo', 'Nori Flakes', 'Pickled Ginger']
  },
  {
    id: 'b4',
    name: 'The Parisienne',
    category: 'Burgers',
    price: 10500,
    rating: 4.7,
    reviews: 620,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800',
    description: 'Brie cheese, caramelized onions, and a touch of truffle oil.',
    country: 'France',
    ingredients: ['Prime Beef', 'Brie de Meaux', 'Caramelized Onions', 'Black Truffle Oil', 'Wild Arugula']
  },
  {
    id: 'b5',
    name: 'Rio Zest',
    category: 'Burgers',
    price: 8200,
    rating: 4.6,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800',
    description: 'Chimichurri salsa, avocado, and grilled pineapple.',
    country: 'Brazil',
    ingredients: ['Grass-fed Beef', 'Chimichurri Salsa', 'Hass Avocado', 'Grilled Pineapple', 'Red Onions']
  },
  {
    id: 'b6',
    name: 'London Fog',
    category: 'Burgers',
    price: 8800,
    rating: 4.5,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=800',
    description: 'Classic British beef, gorgonzola, and pear chutney.',
    country: 'UK',
    ingredients: ['Angus Beef', 'Gorgonzola Dolce', 'Pear Chutney', 'Baby Spinach', 'English Mustard']
  },
  {
    id: 'b7',
    name: 'Swiss Alpine',
    category: 'Burgers',
    price: 9800,
    rating: 4.8,
    reviews: 560,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=800',
    description: 'Emmental cheese, forest mushrooms, and creamy garlic sauce.',
    country: 'Switzerland'
  },
  {
    id: 'b8',
    name: 'Cairo King',
    category: 'Burgers',
    price: 7900,
    rating: 4.6,
    reviews: 290,
    image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=800',
    description: 'Lamb patty, tzatziki, and fresh cucumber ribbons.',
    country: 'Egypt'
  },
  {
    id: 'b9',
    name: 'Outback Aussie',
    category: 'Burgers',
    price: 9200,
    rating: 4.7,
    reviews: 740,
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800',
    description: 'Beetroot, fried egg, and grilled pineapple slice.',
    country: 'Australia'
  },
  {
    id: 'b10',
    name: 'Nairobi Nitro',
    category: 'Burgers',
    price: 8400,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=800',
    description: 'Spicy sukuma wiki slaw and Kenyan pepper beef.',
    country: 'Kenya'
  },
  {
    id: 'b11',
    name: 'Mexican Fire',
    category: 'Burgers',
    price: 8600,
    rating: 4.7,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=800',
    description: 'Jalapeños, pepper jack, and spicy guacamole.',
    country: 'Mexico'
  },
  {
    id: 'b12',
    name: 'German Goliath',
    category: 'Burgers',
    price: 9900,
    rating: 4.6,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=800',
    description: 'Sauerkraut, bratwurst slices, and honey mustard.',
    country: 'Germany'
  },
  {
    id: 'b13',
    name: 'Italian Stallion',
    category: 'Burgers',
    price: 10200,
    rating: 4.9,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1571091723267-3dfd52147b6c?q=80&w=800',
    description: 'Fresh mozzarella, pesto, and sun-dried tomatoes.',
    country: 'Italy'
  },
  {
    id: 'b14',
    name: 'Greek God',
    category: 'Burgers',
    price: 8100,
    rating: 4.5,
    reviews: 450,
    image: 'https://images.unsplash.com/photo-1496116216417-669c6ba97b3d?q=80&w=800',
    description: 'Feta cheese, kalamata olives, and red onion.',
    country: 'Greece'
  },
  {
    id: 'b15',
    name: 'Spanish Matador',
    category: 'Burgers',
    price: 9400,
    rating: 4.7,
    reviews: 510,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=800',
    description: 'Chorizo, manchego cheese, and smoked paprika aioli.',
    country: 'Spain'
  },
  {
    id: 'b16',
    name: 'Dubai Gold',
    category: 'Burgers',
    price: 15000,
    rating: 5.0,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800',
    description: 'Wagyu, edible gold leaf, and saffron mayo.',
    country: 'UAE',
    badge: 'Luxury'
  },
  {
    id: 'b17',
    name: 'Canadian Maple',
    category: 'Burgers',
    price: 8900,
    rating: 4.7,
    reviews: 380,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800',
    description: 'Maple-glazed bacon and sharp white cheddar.',
    country: 'Canada'
  },
  {
    id: 'b18',
    name: 'South African Braai',
    category: 'Burgers',
    price: 8700,
    rating: 4.8,
    reviews: 920,
    image: 'https://images.unsplash.com/photo-1525203135222-7948f65074e5?q=80&w=800',
    description: 'Biltong seasonings and sweet fruity chutney.',
    country: 'South Africa'
  },
  {
    id: 'b19',
    name: 'Argentine Asado',
    category: 'Burgers',
    price: 10800,
    rating: 4.9,
    reviews: 580,
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7fe3?q=80&w=800',
    description: 'Grilled flank steak strips and chimichurri.',
    country: 'Argentina'
  },
  {
    id: 'b20',
    name: 'Belgian Bliss',
    category: 'Burgers',
    price: 8300,
    rating: 4.6,
    reviews: 270,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800',
    description: 'Double-fried frites inside the bun and mayo.',
    country: 'Belgium'
  },
  {
    id: 'c1',
    name: 'Nashville Hot',
    category: 'Chicken',
    price: 7500,
    rating: 4.8,
    reviews: 1800,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800',
    description: 'Spicy southern-fried chicken with pickles.',
    country: 'USA'
  },
  {
    id: 'f1',
    name: 'Truffle Fries',
    category: 'Fries',
    price: 4500,
    rating: 4.9,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1573016608244-7d5ef1976091?q=80&w=800',
    description: 'Parmesan, truffle oil, and sea salt.',
    country: 'France'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Jean-Luc Habimana',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    rating: 5,
    comment: 'The freshest ingredients I have tasted in Kigali. That Kigali Hill Beast is absolute fire!',
    date: '2 days ago'
  },
  {
    id: 'r2',
    name: 'Diane Umutoni',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    rating: 5,
    comment: 'Finally, a gourmet burger spot in Nyarutarama that gets delivery right. Green and clean!',
    date: '1 week ago'
  }
];

export const CATEGORIES = ['Burgers', 'Chicken', 'Fries', 'Drinks', 'Desserts'] as const;
