import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ProductGrid from '../components/Product/ProductGrid';
import ProductFilters from '../components/Product/ProductFilters';
import { products, categories } from '../data/products';
import { useAuth } from '../contexts/AuthContext';

interface FilterState {
  category: string;
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const categoryParam = searchParams.get('category') || '';

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    priceRange: [0, 10000],
    inStock: false,
    featured: false,
    sortBy: 'name'
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    if (filters.featured) {
      filtered = filtered.filter(product => product.featured);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = user?.isB2B && product.bulkPrice ? product.bulkPrice : product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Sort products
    filtered.sort((a, b) => {
      const priceA = user?.isB2B && a.bulkPrice ? a.bulkPrice : a.price;
      const priceB = user?.isB2B && b.bulkPrice ? b.bulkPrice : b.price;

      switch (filters.sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, filters, user]);

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 10000],
      inStock: false,
      featured: false,
      sortBy: 'name'
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Our Products
          </h1>
          <p className="text-charcoal-600">
            Discover our handcrafted wooden kitchenware and home décor collection
          </p>
          {user?.isB2B && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-primary-800 font-medium">
                🏢 B2B Pricing Active - Special bulk rates and minimum quantities apply
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-charcoal-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;