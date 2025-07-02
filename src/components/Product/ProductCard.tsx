import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../UI/Button';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      category: product.category
    });
  };

  const displayPrice = user?.isB2B && product.bulkPrice ? product.bulkPrice : product.price;
  const hasDiscount = user?.isB2B && product.bulkPrice && product.bulkPrice < product.price;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-wood-100">
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-wood-50">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
            <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
              <Eye className="h-4 w-4 text-charcoal-700" />
            </button>
            <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-charcoal-700" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.featured && (
              <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                B2B Price
              </span>
            )}
            {product.stock < 10 && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Low Stock
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-wood-600 uppercase tracking-wide font-semibold mb-1">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="text-lg font-semibold text-charcoal-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-charcoal-600">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-charcoal-900">
                ₹{displayPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-charcoal-500 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
            {user?.isB2B && product.minBulkQuantity && (
              <span className="text-xs text-wood-600 bg-wood-100 px-2 py-1 rounded">
                Min: {product.minBulkQuantity}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-wood-100 text-wood-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : 'text-yellow-600'}`}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      {showAddToCart && (
        <div className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            icon={ShoppingCart}
            fullWidth
            variant="primary"
            size="sm"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;