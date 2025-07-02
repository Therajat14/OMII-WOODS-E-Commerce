import React from 'react';
import { Filter, X } from 'lucide-react';
import { categories } from '../../data/products';

interface FilterState {
  category: string;
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = filters.category !== '' || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 10000 || 
    filters.inStock || 
    filters.featured;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-wood-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-charcoal-700" />
          <h3 className="text-lg font-semibold text-charcoal-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full p-2 border border-wood-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full p-2 border border-wood-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Price Range
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0] || ''}
                onChange={(e) => updateFilter('priceRange', [
                  parseInt(e.target.value) || 0, 
                  filters.priceRange[1]
                ])}
                className="w-full p-2 border border-wood-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="text-charcoal-500">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1] === 10000 ? '' : filters.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [
                  filters.priceRange[0], 
                  parseInt(e.target.value) || 10000
                ])}
                className="w-full p-2 border border-wood-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-3">
            Quick Filters
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-wood-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-charcoal-700">In Stock Only</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => updateFilter('featured', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-wood-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-charcoal-700">Featured Products</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;