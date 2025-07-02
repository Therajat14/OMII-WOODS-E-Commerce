import React, { useState } from 'react';
import { MapPin, Phone, Package, Clock, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getOrdersByDeliveryPartner } from '../../data/orders';

const DeliveryOrders: React.FC = () => {
  const { user } = useAuth();
  const orders = user ? getOrdersByDeliveryPartner(user.id) : [];
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In real app, this would update the order status via API
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'shipped':
        return 'out_for_delivery';
      case 'out_for_delivery':
        return 'delivered';
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'out_for_delivery':
        return 'Mark as Delivered';
      case 'shipped':
        return 'Mark Out for Delivery';
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            My Delivery Orders
          </h1>
          <p className="text-charcoal-600">
            Manage your assigned delivery orders
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-wood-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-charcoal-700">Filter by status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-wood-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
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
                      Customer: {order.customerName}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Delivery Address */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-5 w-5 text-primary-600" />
                      <h4 className="font-medium text-charcoal-900">Delivery Address</h4>
                    </div>
                    <div className="bg-wood-50 rounded-lg p-4">
                      <p className="font-medium text-charcoal-900">{order.shippingAddress.name}</p>
                      <p className="text-charcoal-700">{order.shippingAddress.street}</p>
                      <p className="text-charcoal-700">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                      <p className="text-charcoal-700">{order.shippingAddress.pincode}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Phone className="h-4 w-4 text-charcoal-500" />
                        <span className="text-charcoal-700">{order.shippingAddress.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Package className="h-5 w-5 text-primary-600" />
                      <h4 className="font-medium text-charcoal-900">Order Details</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-charcoal-600">Items</span>
                        <span className="font-medium">{order.items.length} items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal-600">Total Value</span>
                        <span className="font-medium">₹{order.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal-600">Payment Method</span>
                        <span className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</span>
                      </div>
                      {order.expectedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-charcoal-600">Expected Delivery</span>
                          <span className="font-medium">
                            {new Date(order.expectedDelivery).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mt-6 border-t border-wood-200 pt-4">
                  <h4 className="font-medium text-charcoal-900 mb-3">Items to Deliver</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex items-center space-x-3 p-3 bg-wood-50 rounded-lg">
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
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-charcoal-600">
                    {order.notes && (
                      <p><strong>Special Instructions:</strong> {order.notes}</p>
                    )}
                  </div>
                  
                  {getNextStatus(order.status) && (
                    <Button
                      onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                      icon={order.status === 'out_for_delivery' ? CheckCircle : Clock}
                    >
                      {getStatusLabel(order.status)}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-charcoal-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">
              {statusFilter === 'all' ? 'No orders assigned' : `No ${statusFilter.replace('_', ' ')} orders`}
            </h2>
            <p className="text-charcoal-600">
              {statusFilter === 'all' 
                ? "You don't have any delivery assignments yet."
                : `You don't have any ${statusFilter.replace('_', ' ')} orders.`
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeliveryOrders;