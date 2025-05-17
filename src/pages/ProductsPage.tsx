import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, X, CheckCircle2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { categories, products, getProductsByCategory, searchProducts } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ProductsPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category') || 'All';
    const queryParam = params.get('q') || '';
    const sortParam = params.get('sort') || 'featured';
    
    setSelectedCategory(categoryParam);
    setSearchQuery(queryParam);
    setSortOption(sortParam);
    
    // Simulate API request delay
    setLoading(true);
    setTimeout(() => {
      let filtered = queryParam
        ? searchProducts(queryParam)
        : getProductsByCategory(categoryParam);
      
      // Apply price filter
      filtered = filtered.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Apply sorting
      switch (sortParam) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default: // 'featured'
          // Maintain original order
          break;
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 600);
  }, [location.search, priceRange]);

  const updateFilters = (filters: { category?: string; sort?: string; query?: string }) => {
    const params = new URLSearchParams(location.search);
    
    if (filters.category) {
      if (filters.category === 'All') {
        params.delete('category');
      } else {
        params.set('category', filters.category);
      }
    }
    
    if (filters.sort) {
      if (filters.sort === 'featured') {
        params.delete('sort');
      } else {
        params.set('sort', filters.sort);
      }
    }
    
    if (filters.query !== undefined) {
      if (filters.query) {
        params.set('q', filters.query);
      } else {
        params.delete('q');
      }
    }
    
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters({ category });
    setMobileFiltersOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    updateFilters({ sort: value });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ query: searchQuery });
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 2000]);
    setSortOption('featured');
    setSearchQuery('');
    navigate('/products');
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={toggleMobileFilters}
              variant="outline"
              className="w-full flex justify-between items-center"
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </span>
              {mobileFiltersOpen ? <X size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>

          {/* Sidebar Filters */}
          <div
            className={`
              lg:w-1/4 bg-white p-6 rounded-lg shadow-sm
              ${mobileFiltersOpen ? 'block' : 'hidden'} lg:block
              transition-all duration-300 ease-in-out
            `}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-medium text-neutral-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex items-center w-full py-1.5 px-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {selectedCategory === category && (
                      <CheckCircle2 size={16} className="mr-2 text-primary-500" />
                    )}
                    <span className={selectedCategory === category ? 'font-medium' : ''}>
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium text-neutral-800 mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full accent-primary-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), priceRange[1])}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    min={priceRange[0]}
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Other filters could go here */}
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search and Sort Controls */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Search</Button>
                </form>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-neutral-600 whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-neutral-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-neutral-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </div>
              
              {/* Applied Filters */}
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== 'All' && (
                  <div className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {selectedCategory}
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className="ml-2 text-primary-500 hover:text-primary-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="inline-flex items-center bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    Search: {searchQuery}
                    <button
                      onClick={() => updateFilters({ query: '' })}
                      className="ml-2 text-primary-500 hover:text-primary-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};