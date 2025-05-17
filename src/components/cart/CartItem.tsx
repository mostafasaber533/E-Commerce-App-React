import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-neutral-200 animate-fade-in">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 sm:ml-2">
        <Link to={`/product/${product.id}`} className="font-semibold text-neutral-800 hover:text-primary-500 transition-colors">
          {product.name}
        </Link>
        <p className="text-sm text-neutral-500 mt-1">{product.category}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center mt-4 sm:mt-0 sm:mr-8">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className={`p-1 rounded-md border ${
            quantity <= 1 ? 'border-neutral-300 text-neutral-300 cursor-not-allowed' : 'border-neutral-300 text-neutral-600 hover:bg-neutral-100'
          }`}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="mx-3 w-8 text-center">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="p-1 rounded-md border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Price */}
      <div className="font-semibold text-neutral-800 mt-4 sm:mt-0 sm:mr-8 min-w-[80px] text-center sm:text-right">
        {formatPrice(product.price * quantity)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-neutral-400 hover:text-error-500 transition-colors mt-4 sm:mt-0"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};