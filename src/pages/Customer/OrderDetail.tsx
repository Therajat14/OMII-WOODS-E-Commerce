import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { getOrderById } from '../../data/orders';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = getOrderById(id || '');

  if (!order) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-charcoal-900 mb-4">Order Not Found</h1>
          <Link to="/orders" className="text-primary-600 hover:text-primary-700">
            ← Back to Orders
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600';
      case 'shipped':
      case 'out_for_delivery':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/orders" 
            className="flex items-center text-charcoal-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-charcoal-900">
                Order {order.id}
              </h1>
              <p className="text-charcoal-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Order Timeline</h2>
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${getStatusColor(event.status)} bg-current bg-opacity-10`}>
                      <CheckCircle className={`h-4 w-4 ${getStatusColor(event.status)}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-charcoal-900">{event.message}</p>
                      {event.location && (
                        <p className="text-sm text-charcoal-600">{event.location}</p>
                      )}
                      <p className="text-xs text-charcoal-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 p-4 border border-wood-200 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal-900">{item.productName}</h3>
                      <p className="text-sm text-charcoal-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-charcoal-600">Price: ₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-charcoal-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="font-semibold">₹{order.subtotal.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className="font-semibold">
                    {order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost}`}
                  </span>
                </div>
                <div className="border-t border-wood-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-charcoal-900">Shipping Address</h2>
              </div>
              <div className="text-charcoal-700">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.pincode}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Phone className="h-4 w-4 text-charcoal-500" />
                  <span className="text-sm">{order.shippingAddress.phone}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Payment Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Payment Method</span>
                  <span className="font-medium capitalize">
                    {order.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Payment Status</span>
                  <span className={`font-medium ${
                    order.paymentStatus === 'paid' ? 'text-green-600' :
                    order.paymentStatus === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            {order.deliveryPartnerName && (
              <div className="bg-white rounded-lg border border-wood-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Truck className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-charcoal-900">Delivery Partner</h2>
                </div>
                <p className="font-medium text-charcoal-900">{order.deliveryPartnerName}</p>
                {order.expectedDelivery && (
                  <p className="text-sm text-charcoal-600 mt-2">
                    Expected delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-wood-50 rounded-lg p-6">
              <h3 className="font-semibold text-charcoal-900 mb-2">Need Help?</h3>
              <p className="text-sm text-charcoal-600 mb-4">
                Have questions about your order? Our support team is here to help.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;