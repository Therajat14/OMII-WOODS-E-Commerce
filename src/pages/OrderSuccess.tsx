import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const { orderId, total, items } = location.state || {};

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-charcoal-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-wood-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-sm font-medium text-charcoal-600 mb-1">Order Number</h3>
              <p className="text-lg font-bold text-charcoal-900">{orderId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-charcoal-600 mb-1">Total Amount</h3>
              <p className="text-lg font-bold text-charcoal-900">₹{total?.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-charcoal-600 mb-1">Items</h3>
              <p className="text-lg font-bold text-charcoal-900">{items} items</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-primary-600">
            <Package className="h-5 w-5" />
            <span className="font-medium">Expected delivery: 5-7 business days</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/orders">
                Track Your Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-wood-50 rounded-lg">
          <h3 className="text-lg font-semibold text-charcoal-900 mb-2">What's Next?</h3>
          <div className="text-left space-y-2 text-charcoal-600">
            <p>• You'll receive an order confirmation email within 5 minutes</p>
            <p>• We'll notify you when your order is shipped with tracking details</p>
            <p>• You can track your order status in your dashboard</p>
            <p>• Our support team is available if you have any questions</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;