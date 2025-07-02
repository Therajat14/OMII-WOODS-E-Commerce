import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, User, MessageCircle, ShoppingBag, Clock } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { getOrdersByCustomerId } from '../../data/orders';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const orders = user ? getOrdersByCustomerId(user.id) : [];
  const recentOrders = orders.slice(0, 3);

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Active Orders',
      value: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      title: 'Wishlist Items',
      value: 5,
      icon: Heart,
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      title: 'Support Tickets',
      value: 2,
      icon: MessageCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  const quickActions = [
    {
      title: 'Browse Products',
      description: 'Explore our handcrafted collection',
      icon: ShoppingBag,
      link: '/products',
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    },
    {
      title: 'Order History',
      description: 'View all your past orders',
      icon: Package,
      link: '/orders',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'My Wishlist',
      description: 'Items you want to buy later',
      icon: Heart,
      link: '/wishlist',
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      title: 'Get Support',
      description: 'Need help? Contact our team',
      icon: MessageCircle,
      link: '/support',
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-charcoal-600">
            Manage your orders, wishlist, and account settings
          </p>
          {user?.isB2B && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-primary-800 font-medium">
                🏢 B2B Account - You have access to special bulk pricing and features
              </p>
            </div>
          )}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal-900">Recent Orders</h2>
                <Link 
                  to="/orders" 
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-wood-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-charcoal-900">{order.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal-600 mb-2">
                        {order.items.length} items • ₹{order.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        Ordered on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
                  <p className="text-charcoal-600">No orders yet</p>
                  <Link 
                    to="/products" 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.title}
                    to={action.link}
                    className="flex items-center p-3 rounded-lg hover:bg-wood-50 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg ${action.bg} group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-charcoal-900">{action.title}</p>
                      <p className="text-xs text-charcoal-600">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-lg border border-wood-200 p-6 mt-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Account Info</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-charcoal-600">Email</p>
                  <p className="font-medium text-charcoal-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Phone</p>
                  <p className="font-medium text-charcoal-900">{user?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-charcoal-600">Member Since</p>
                  <p className="font-medium text-charcoal-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              <Link
                to="/profile"
                className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                <User className="h-4 w-4 mr-1" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;