import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, Filter } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { getOrdersByCustomerId } from '../../data/orders';

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const allOrders = user ? getOrdersByCustomerId(user.id) : [];
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = statusFilter === 'all' 
    ? allOrders 
    : allOrders.filter(order => order.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Order History
          </h1>
          <p className="text-charcoal-600">
            Track and manage all your orders
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-wood-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-charcoal-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-wood-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="placed">Placed</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border border-wood-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900">{order.id}</h3>
                    <p className="text-sm text-charcoal-600">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-charcoal-600">Items</p>
                    <p className="font-semibold text-charcoal-900">{order.items.length} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">Total Amount</p>
                    <p className="font-semibold text-charcoal-900">₹{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-600">Payment Method</p>
                    <p className="font-semibold text-charcoal-900 capitalize">
                      {order.paymentMethod.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t border-wood-200 pt-4 mb-4">
                  <div className="flex items-center space-x-4 overflow-x-auto">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.productId} className="flex items-center space-x-2 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-charcoal-900">{item.productName}</p>
                          <p className="text-xs text-charcoal-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-charcoal-600">
                        +{order.items.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    {order.expectedDelivery && (
                      <p className="text-sm text-charcoal-600">
                        Expected delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/order/${order.id}`}
                    className="inline-flex items-center px-4 py-2 border border-primary-300 text-primary-700 rounded-md hover:bg-primary-50 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-charcoal-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">
              {statusFilter === 'all' ? 'No orders yet' : `No ${statusFilter} orders`}
            </h2>
            <p className="text-charcoal-600 mb-6">
              {statusFilter === 'all' 
                ? "You haven't placed any orders yet. Start shopping to see your orders here."
                : `You don't have any ${statusFilter} orders.`
              }
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;