import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard, Truck, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-neutral-700 pb-8">
          <div className="flex items-center space-x-4">
            <CreditCard className="text-accent-400" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Secure Payments</h3>
              <p className="text-neutral-400">All transactions are encrypted</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Truck className="text-accent-400" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Fast Shipping</h3>
              <p className="text-neutral-400">Delivered within 2-5 business days</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="text-accent-400" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Satisfaction Guarantee</h3>
              <p className="text-neutral-400">30-day hassle-free returns</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">EcoShop</h2>
            <p className="text-neutral-400 mb-4">
              We offer high-quality products at competitive prices, making technology accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-neutral-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/categories" className="text-neutral-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-neutral-400 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-neutral-400 hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-accent-400" />
                <span className="text-neutral-400">123 Tech Lane, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-accent-400" />
                <span className="text-neutral-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-accent-400" />
                <a href="mailto:info@ecoshop.com" className="text-neutral-400 hover:text-white transition-colors">
                  info@ecoshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter (simplified) - in a real app, this would connect to a backend */}
        <div className="border-t border-neutral-700 pt-8 mt-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent-400 flex-grow"
              />
              <button className="bg-accent-400 hover:bg-accent-500 text-white px-6 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-neutral-400 text-sm pt-4 border-t border-neutral-700">
          <p>© {currentYear} EcoShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};