import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { products, categories } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching featured products
    const featured = products.slice(0, 4);
    setFeaturedProducts(featured);

    // Simulate fetching new arrivals
    const arrivals = [...products].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
    setNewArrivals(arrivals);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                Premium Tech for <br />Modern Living
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Discover the perfect blend of innovation, quality, and style with our curated selection of premium electronics and gadgets.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Button
                  onClick={() => navigate('/products')}
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-neutral-100"
                >
                  Shop Now
                </Button>
                <Button
                  onClick={() => navigate('/products')}
                  variant="ghost"
                  size="lg"
                  className="border border-white text-white hover:bg-white/10"
                >
                  Explore Categories
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <img
                src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Premium Headphones"
                className="max-w-full h-auto rounded-lg shadow-2xl transform lg:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-primary-700/30"></div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(cat => cat !== 'All').map((category, index) => (
              <button
                key={category}
                onClick={() => navigate(`/products?category=${category}`)}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col items-center justify-center p-6 text-center animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <span className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition-colors">
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800">Featured Products</h2>
            <button
              onClick={() => navigate('/products')}
              className="text-primary-500 hover:text-primary-600 flex items-center transition-colors"
            >
              <span>View all</span>
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-accent-400 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Summer Sale</h2>
              <p className="text-white text-lg mb-6 max-w-md">
                Get up to 40% off on selected items this summer. Limited time offer.
              </p>
              <Button
                onClick={() => navigate('/products?sale=true')}
                className="bg-white text-accent-500 hover:bg-neutral-100"
              >
                Shop the Sale
              </Button>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white/10 p-6 rounded-lg text-white">
                <h3 className="text-xl font-semibold mb-4">Special Offers Include:</h3>
                <ul className="space-y-3">
                  {['Premium Headphones', 'Smart Home Devices', 'Ultra-Slim Laptops', 'Fitness Trackers'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle size={20} className="mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800">New Arrivals</h2>
            <button
              onClick={() => navigate('/products?sort=newest')}
              className="text-primary-500 hover:text-primary-600 flex items-center transition-colors"
            >
              <span>View all</span>
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The quality of the products exceeded my expectations. Fast shipping and excellent customer service.",
                author: "Sarah J.",
                role: "Verified Buyer",
                rating: 5,
              },
              {
                quote: "I've been shopping here for years. The tech is always cutting edge and the prices are competitive.",
                author: "Michael T.",
                role: "Premium Member",
                rating: 5,
              },
              {
                quote: "Great selection and the website makes it easy to find exactly what I need. Will definitely shop again.",
                author: "Elena R.",
                role: "Verified Buyer",
                rating: 4,
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: `${0.2 * index}s` }}>
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-neutral-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="mr-3 bg-primary-100 text-primary-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{testimonial.author}</p>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};