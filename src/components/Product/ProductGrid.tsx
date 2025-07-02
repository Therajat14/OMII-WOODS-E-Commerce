import React from 'react';
import { Product } from '../../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false, 
  emptyMessage = 'No products found' 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-wood-100 overflow-hidden animate-pulse">
            <div className="aspect-square bg-wood-100"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-wood-100 rounded w-1/3"></div>
              <div className="h-5 bg-wood-100 rounded w-3/4"></div>
              <div className="h-4 bg-wood-100 rounded w-1/2"></div>
              <div className="h-6 bg-wood-100 rounded w-1/3"></div>
              <div className="h-8 bg-wood-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏺</div>
        <h3 className="text-xl font-semibold text-charcoal-900 mb-2">{emptyMessage}</h3>
        <p className="text-charcoal-600">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;