import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { getProductById, getProductsByCategory } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      // Simulate API fetch delay
      setLoading(true);
      window.scrollTo(0, 0);
      
      setTimeout(() => {
        const fetchedProduct = getProductById(id);
        setProduct(fetchedProduct || null);
        
        if (fetchedProduct) {
          setSelectedImage(fetchedProduct.images[0]);
          
          // Get related products from the same category
          const related = getProductsByCategory(fetchedProduct.category)
            .filter(p => p.id !== fetchedProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-neutral-200 rounded w-1/3 mb-6"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="aspect-square bg-neutral-200 rounded-lg mb-4"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="w-20 h-20 bg-neutral-200 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/4 mb-6"></div>
                  <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
                  <div className="h-24 bg-neutral-200 rounded mb-6"></div>
                  <div className="h-10 bg-neutral-200 rounded w-full mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Product Not Found</h2>
          <p className="text-neutral-600 mb-6">We couldn't find the product you're looking for.</p>
          <Button as={Link} to="/products">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link to="/products" className="text-primary-500 hover:text-primary-600 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </Link>
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === image 
                        ? 'border-primary-500' 
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:border-l border-neutral-200">
              <div className="mb-2">
                <span className="text-sm text-neutral-500">{product.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16}
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-bold text-primary-500 mb-4">
                {formatPrice(product.price)}
              </div>
              
              {/* Description (short version) */}
              <p className="text-neutral-600 mb-6">{product.description}</p>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="text-neutral-700 mr-4">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-neutral-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span className="ml-4 text-sm text-neutral-500">
                  {product.stock} available
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                >
                  <Heart size={18} className="mr-2" />
                  Add to Wishlist
                </Button>
              </div>
              
              {/* Share */}
              <div className="flex items-center">
                <span className="text-neutral-700 mr-4">Share:</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-neutral-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 text-lg font-medium whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-3 text-lg font-medium whitespace-nowrap ${
                  activeTab === 'specifications'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 text-lg font-medium whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-neutral-700">{product.description}</p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="flex bg-neutral-50 p-3 rounded-md">
                        <span className="text-neutral-700 font-medium w-1/2">{key}:</span>
                        <span className="text-neutral-600 w-1/2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  
                  {product.reviews.length === 0 ? (
                    <p className="text-neutral-600">No reviews yet. Be the first to review this product!</p>
                  ) : (
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-0">
                          <div className="flex items-center mb-2">
                            <span className="font-medium text-neutral-800 mr-3">{review.userName}</span>
                            <div className="flex items-center text-yellow-400">
                              {Array(5).fill(0).map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14}
                                  className={i < review.rating ? 'fill-current' : 'text-neutral-300'}
                                />
                              ))}
                            </div>
                            <span className="ml-auto text-sm text-neutral-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-neutral-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <Button>Write a Review</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
};