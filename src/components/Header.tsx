import React from 'react';
import { Search, ShoppingCart, Menu, MapPin, User } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  onCartClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 md:hidden" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">W</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">WalMart</span>
            </div>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <div>
              <p className="text-xs">Deliver to</p>
              <p className="font-semibold">New York 10001</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search everything at Walmart online and in store"
                className="w-full px-4 py-2 pl-4 pr-12 text-black rounded-full border-2 border-transparent focus:border-yellow-400 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition-colors">
                <Search className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <User className="h-5 w-5" />
              <div>
                <p className="text-xs">Hello</p>
                <p className="font-semibold">Sign In</p>
              </div>
            </div>
            
            <button
              onClick={onCartClick}
              className="relative flex items-center space-x-1 hover:bg-blue-700 p-2 rounded transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="hidden sm:block text-sm font-semibold">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};