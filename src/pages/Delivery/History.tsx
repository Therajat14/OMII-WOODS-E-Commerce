import React from 'react';
import { CheckCircle, Package, Calendar, Star } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { getOrdersByDeliveryPartner } from '../../data/orders';

const DeliveryHistory: React.FC = () => {
  const { user } = useAuth();
  const allOrders = user ? getOrdersByDeliveryPartner(user.id) : [];
  const completedOrders = allOrders.filter(
    (order) => order.status === 'delivered'
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Delivery History
          </h1>
          <p className="text-charcoal-600">
            View your completed deliveries and performance
          </p>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-charcoal-900">
              {completedOrders.length}
            </p>
            <p className="text-sm text-charcoal-600">Completed Deliveries</p>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-charcoal-900">4.8</p>
            <p className="text-sm text-charcoal-600">Average Rating</p>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-charcoal-900">96%</p>
            <p className="text-sm text-charcoal-600">On-Time Rate</p>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <Package className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-charcoal-900">
              ₹
              {completedOrders
                .reduce((sum, order) => sum + order.total, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-charcoal-600">Total Value Delivered</p>
          </div>
        </div>

        {/* Completed Orders */}
        {completedOrders.length > 0 ? (
          <div className="bg-white rounded-lg border border-wood-200">
            <div className="p-6 border-b border-wood-200">
              <h2 className="text-xl font-semibold text-charcoal-900">
                Completed Deliveries
              </h2>
            </div>

            <div className="divide-y divide-wood-200">
              {completedOrders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-charcoal-900">
                        {order.id}
                      </h3>
                      <p className="text-sm text-charcoal-600">
                        Customer: {order.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        Delivered
                      </span>
                      <p className="text-sm text-charcoal-600 mt-1">
                        {order.timeline.find((t) => t.status === 'delivered')
                          ?.timestamp &&
                          new Date(
                            order.timeline.find(
                              (t) => t.status === 'delivered'
                            )!.timestamp
                          ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-charcoal-600">
                        Delivery Address
                      </p>
                      <p className="font-medium text-charcoal-900">
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-sm text-charcoal-700">
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-charcoal-600">Order Details</p>
                      <p className="font-medium text-charcoal-900">
                        {order.items.length} items
                      </p>
                      <p className="text-sm text-charcoal-700">
                        ₹{order.total.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-charcoal-600">
                        Payment Method
                      </p>
                      <p className="font-medium text-charcoal-900 capitalize">
                        {order.paymentMethod.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-charcoal-700">
                        Status:{' '}
                        {order.paymentStatus.charAt(0).toUpperCase() +
                          order.paymentStatus.slice(1)}
                      </p>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 overflow-x-auto">
                      {order.items.slice(0, 4).map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-center space-x-2 bg-wood-50 rounded-lg p-2 flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span className="text-xs text-charcoal-700">
                            {item.productName}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <span className="text-sm text-charcoal-600 flex-shrink-0">
                          +{order.items.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="h-24 w-24 text-charcoal-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">
              No completed deliveries yet
            </h2>
            <p className="text-charcoal-600">
              Your completed deliveries will appear here once you start making
              deliveries.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeliveryHistory;
