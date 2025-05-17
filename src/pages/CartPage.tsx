import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/ui/Button';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleCheckout = () => {
    setShowSuccess(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">Order Placed Successfully!</h1>
            <p className="text-neutral-600 mb-8">
              Thank you for your purchase. We'll send you an email with your order details shortly.
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={64} className="text-neutral-300" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">Your Cart is Empty</h1>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate shipping cost
  const shippingCost = cart.subtotal >= 100 ? 0 : 10;
  // Calculate tax (for example, 8%)
  const taxRate = 0.08;
  const taxAmount = cart.subtotal * taxRate;
  // Calculate total
  const total = cart.subtotal + shippingCost + taxAmount;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items ({cart.totalItems})</h2>
                  <button
                    onClick={clearCart}
                    className="text-neutral-600 hover:text-error-500 transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              <div className="p-4">
                {cart.items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="p-4 border-b border-neutral-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-success-500 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">{formatPrice(shippingCost)}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleCheckout}
                    fullWidth
                    size="lg"
                    className="flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-neutral-500 text-center">
                    By proceeding, you agree to our <Link to="/terms" className="text-primary-500 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary-500 hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};