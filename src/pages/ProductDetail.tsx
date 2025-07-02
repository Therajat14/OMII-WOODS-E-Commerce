import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-charcoal-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            ← Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const displayPrice = user?.isB2B && product.bulkPrice ? product.bulkPrice : product.price;
  const hasDiscount = user?.isB2B && product.bulkPrice && product.bulkPrice < product.price;
  const minQuantity = user?.isB2B && product.minBulkQuantity ? product.minBulkQuantity : 1;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: displayPrice,
      quantity: quantity,
      image: product.images[0],
      category: product.category
    });
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= minQuantity && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/products" 
            className="flex items-center text-charcoal-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-wood-50">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-600' : 'border-wood-200'
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
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="text-sm text-primary-600 font-semibold uppercase tracking-wide">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-display font-bold text-charcoal-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-charcoal-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-charcoal-900">
                  ₹{displayPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-charcoal-500 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {user?.isB2B && product.minBulkQuantity && (
                <p className="text-sm text-primary-600">
                  B2B Price - Minimum order: {product.minBulkQuantity} units
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Description</h3>
              <p className="text-charcoal-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-wood-100 text-wood-700 px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={quantity <= minQuantity}
                  className="p-2 border border-wood-300 rounded-md hover:bg-wood-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="p-2 border border-wood-300 rounded-md hover:bg-wood-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-charcoal-600 mt-1">
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                icon={ShoppingCart}
                fullWidth
                size="lg"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" icon={Heart} fullWidth>
                  Add to Wishlist
                </Button>
                <Button variant="outline" icon={Share2} fullWidth>
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-wood-200 pt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary-600" />
                <span className="text-charcoal-700">Free shipping on orders over ₹2000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="text-charcoal-700">1 year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">Specifications</h2>
          <div className="bg-white rounded-lg border border-wood-200 overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div 
                key={key} 
                className={`px-6 py-4 ${index % 2 === 0 ? 'bg-wood-25' : 'bg-white'}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <dt className="font-semibold text-charcoal-900">{key}</dt>
                  <dd className="md:col-span-2 text-charcoal-600">{value}</dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;