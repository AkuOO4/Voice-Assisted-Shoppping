import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    reviews: 2547,
    category: 'Electronics',
    description: 'Latest iPhone with advanced camera system and titanium design',
    inStock: true
  },
  {
    id: '2',
    name: 'Samsung 65" 4K Smart TV',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.6,
    reviews: 1834,
    category: 'Electronics',
    description: 'Crystal clear 4K display with smart features',
    inStock: true
  },
  {
    id: '3',
    name: 'Nike Air Max 270',
    price: 129,
    originalPrice: 150,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.7,
    reviews: 892,
    category: 'Shoes',
    description: 'Comfortable running shoes with maximum air cushioning',
    inStock: true
  },
  {
    id: '4',
    name: 'KitchenAid Stand Mixer',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 3421,
    category: 'Kitchen',
    description: 'Professional-grade stand mixer for all your baking needs',
    inStock: true
  },
  {
    id: '5',
    name: 'Dyson V15 Detect Vacuum',
    price: 599,
    originalPrice: 749,
    image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    reviews: 1567,
    category: 'Home',
    description: 'Powerful cordless vacuum with laser dust detection',
    inStock: true
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5 Headphones',
    price: 349,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 4892,
    category: 'Electronics',
    description: 'Industry-leading noise canceling wireless headphones',
    inStock: true
  },
  {
    id: '7',
    name: 'Levi\'s 501 Original Jeans',
    price: 79,
    originalPrice: 98,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.5,
    reviews: 2341,
    category: 'Clothing',
    description: 'Classic straight fit jeans with timeless style',
    inStock: true
  },
  {
    id: '8',
    name: 'Instant Pot Duo 7-in-1',
    price: 89,
    originalPrice: 119,
    image: 'https://images.pexels.com/photos/4226867/pexels-photo-4226867.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    reviews: 8934,
    category: 'Kitchen',
    description: 'Multi-functional pressure cooker for quick meals',
    inStock: true
  }
];

export const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Kitchen',
  'Home',
  'Shoes',
  'Beauty',
  'Sports'
];