import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut, UserCircle, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileMenu = document.getElementById('profile-menu');
      const profileButton = document.getElementById('profile-button');
      
      if (profileMenu && profileButton) {
        if (!profileMenu.contains(event.target as Node) && 
            !profileButton.contains(event.target as Node)) {
          setIsProfileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen || isSearchOpen ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/home" className="text-primary-500 font-bold text-2xl">EcoShop</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-neutral-700 hover:text-primary-500 transition-colors">Home</Link>
            <Link to="/products" className="text-neutral-700 hover:text-primary-500 transition-colors">Products</Link>
            <Link to="/categories" className="text-neutral-700 hover:text-primary-500 transition-colors">Categories</Link>
            <Link to="/about" className="text-neutral-700 hover:text-primary-500 transition-colors">About</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Icon (Desktop) */}
            <button 
              onClick={toggleSearch}
              className="text-neutral-700 hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Favorites Icon */}
            <Link 
              to="/favorites" 
              className="text-neutral-700 hover:text-primary-500 transition-colors relative"
              aria-label="Favorites"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="text-neutral-700 hover:text-primary-500 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>

            {/* User Icon/Profile */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  id="profile-button"
                  onClick={toggleProfile}
                  className="flex items-center focus:outline-none"
                  aria-label="Open profile menu"
                >
                  <img 
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    id="profile-menu"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 animate-fade-in"
                  >
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-neutral-800">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <UserCircle size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="text-neutral-700 hover:text-primary-500 transition-colors"
                aria-label="Login"
              >
                <User size={20} />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-neutral-700 hover:text-primary-500 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (Expanded) */}
        {isSearchOpen && (
          <div className="py-4 animate-slide-down">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <Link to="/home" className="text-neutral-700 hover:text-primary-500 transition-colors py-2">Home</Link>
              <Link to="/products" className="text-neutral-700 hover:text-primary-500 transition-colors py-2">Products</Link>
              <Link to="/categories" className="text-neutral-700 hover:text-primary-500 transition-colors py-2">Categories</Link>
              <Link to="/about" className="text-neutral-700 hover:text-primary-500 transition-colors py-2">About</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};