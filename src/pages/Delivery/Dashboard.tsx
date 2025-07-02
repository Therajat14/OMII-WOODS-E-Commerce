import React from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { getOrdersByDeliveryPartner } from '../../data/orders';

const DeliveryDashboard: React.FC = () => {
  const { user } = useAuth();
  const orders = user ? getOrdersByDeliveryPartner(user.id) : [];
  
  const todayOrders = orders.filter(order => {
    const today = new Date().toDateString();
    return new Date(order.createdAt).toDateString() === today;
  });

  const stats = [
    {
      title: 'Assigned Orders',
      value: orders.length,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: "Today's Deliveries",
      value: todayOrders.length,
      icon: Truck,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Pending Deliveries',
      value: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      title: 'Completed',
      value: orders.filter(o => o.status === 'delivered').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  const activeOrders = orders.filter(order => 
    ['shipped', 'out_for_delivery'].includes(order.status)
  ).slice(0, 5);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Delivery Dashboard
          </h1>
          <p className="text-charcoal-600">
            Welcome back, {user?.name}! Manage your delivery assignments.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg border border-wood-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-charcoal-900">{stat.value}</p>
                  <p className="text-sm text-charcoal-600">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Deliveries */}
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Active Deliveries</h2>
            
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="border border-wood-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-charcoal-900">{order.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-charcoal-500 mt-1 flex-shrink-0" />
                      <div className="text-sm text-charcoal-600">
                        <p className="font-medium">{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        <p className="mt-1 text-charcoal-500">{order.shippingAddress.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-charcoal-600">
                        {order.items.length} items • ₹{order.total.toLocaleString()}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
                <p className="text-charcoal-600">No active deliveries</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/delivery/orders"
                  className="flex items-center p-3 rounded-lg hover:bg-wood-50 transition-colors group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-charcoal-900">View All Orders</p>
                    <p className="text-sm text-charcoal-600">Manage your delivery assignments</p>
                  </div>
                </a>
                
                <a
                  href="/delivery/history"
                  className="flex items-center p-3 rounded-lg hover:bg-wood-50 transition-colors group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-charcoal-900">Delivery History</p>
                    <p className="text-sm text-charcoal-600">View completed deliveries</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">This Month's Performance</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Deliveries Completed</span>
                  <span className="font-semibold text-charcoal-900">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">On-Time Delivery Rate</span>
                  <span className="font-semibold text-green-600">96%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Customer Rating</span>
                  <span className="font-semibold text-charcoal-900">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryDashboard;