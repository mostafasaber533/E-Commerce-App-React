import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-neutral-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-neutral-200 rounded animate-pulse mb-2 w-1/3"></div>
              <div className="h-6 bg-neutral-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded animate-pulse mb-4 w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-neutral-200 rounded animate-pulse w-1/4"></div>
                <div className="h-8 bg-neutral-200 rounded animate-pulse w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-neutral-700 mb-2">No products found</h3>
        <p className="text-neutral-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};