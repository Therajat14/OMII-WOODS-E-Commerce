import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart: React.FC = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotal, 
    applyPromoCode, 
    removePromoCode, 
    appliedPromo, 
    getDiscountAmount, 
    getFinalTotal 
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = React.useState('');
  const [promoError, setPromoError] = React.useState('');

  const handleApplyPromo = () => {
    setPromoError('');
    const success = applyPromoCode(promoCode);
    if (success) {
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code or minimum amount not met');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-charcoal-300 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-charcoal-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button size="lg" asChild>
              <Link to="/products">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-wood-200 p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-charcoal-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-charcoal-600">{item.category}</p>
                    <p className="text-lg font-bold text-charcoal-900 mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border border-wood-300 rounded hover:bg-wood-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border border-wood-300 rounded hover:bg-wood-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-charcoal-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-wood-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Button onClick={handleApplyPromo} size="sm">
                    Apply
                  </Button>
                </div>
                {promoError && (
                  <p className="text-red-600 text-sm mt-1">{promoError}</p>
                )}
                {appliedPromo && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                    <span className="text-green-800 text-sm font-medium">
                      {appliedPromo.code} applied
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-wood-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="font-semibold">₹{getTotal().toLocaleString()}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-₹{getDiscountAmount().toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className="font-semibold">
                    {getFinalTotal() >= 2000 ? 'Free' : '₹150'}
                  </span>
                </div>
                
                <div className="border-t border-wood-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{(getFinalTotal() + (getFinalTotal() >= 2000 ? 0 : 150)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-6 space-y-3">
                {isAuthenticated ? (
                  <Button fullWidth size="lg" asChild>
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button fullWidth size="lg" asChild>
                    <Link to="/login">
                      Login to Checkout
                    </Link>
                  </Button>
                )}
                
                <Button variant="outline" fullWidth asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>

              {/* Available Promo Codes */}
              <div className="mt-6 p-4 bg-wood-50 rounded-lg">
                <h3 className="text-sm font-semibold text-charcoal-900 mb-2">Available Offers</h3>
                <div className="space-y-1 text-xs text-charcoal-600">
                  <p>• WELCOME10 - 10% off on orders above ₹1000</p>
                  <p>• FLAT500 - ₹500 off on orders above ₹2000</p>
                  <p>• B2B15 - 15% off for business customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;