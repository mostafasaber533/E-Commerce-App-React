import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Product Image */}
        <div className="relative overflow-hidden h-64">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button 
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isFavorite(product.id)
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-white text-neutral-700 hover:bg-primary-50'
              }`}
              aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} className={isFavorite(product.id) ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-neutral-500">{product.category}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1 text-neutral-800 line-clamp-1">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500">({product.reviews.length} reviews)</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-lg text-primary-500">{formatPrice(product.price)}</span>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="flex items-center gap-1"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};