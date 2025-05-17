import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <Heart size={64} className="text-neutral-300" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">Your Favorites List is Empty</h1>
            <p className="text-neutral-600 mb-8">
              Start adding products to your favorites by clicking the heart icon on any product.
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">My Favorites</h1>
        <ProductGrid products={favorites} />
      </div>
    </div>
  );
};