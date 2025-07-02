import React from 'react';
import { Package, Users, ShoppingCart, MessageCircle, TrendingUp, DollarSign } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { getAllOrders } from '../../data/orders';
import { products } from '../../data/products';
import { getAllTickets } from '../../data/support';

const AdminDashboard: React.FC = () => {
  const orders = getAllOrders();
  const tickets = getAllTickets();

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+2 this week'
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+5 this week'
    },
    {
      title: 'Active Customers',
      value: 156,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+12 this month'
    },
    {
      title: 'Support Tickets',
      value: tickets.length,
      icon: MessageCircle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      change: '2 pending'
    },
    {
      title: 'Revenue',
      value: '₹2,45,000',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+15% this month'
    },
    {
      title: 'Growth Rate',
      value: '23%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+3% from last month'
    }
  ];

  const recentOrders = orders.slice(0, 5);
  const recentTickets = tickets.slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-charcoal-600">
            Overview of your business performance and key metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg border border-wood-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-charcoal-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-charcoal-900">{stat.value}</p>
                  <p className="text-xs text-charcoal-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-wood-200 rounded-lg">
                  <div>
                    <p className="font-medium text-charcoal-900">{order.id}</p>
                    <p className="text-sm text-charcoal-600">{order.customerName}</p>
                    <p className="text-xs text-charcoal-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-charcoal-900">₹{order.total.toLocaleString()}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Support Tickets */}
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Recent Support Tickets</h2>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 border border-wood-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-charcoal-900">{ticket.subject}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal-600">{ticket.customerName}</p>
                  <p className="text-xs text-charcoal-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/admin/products"
            className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-center hover:bg-primary-100 transition-colors"
          >
            <Package className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="font-medium text-primary-800">Manage Products</p>
          </a>
          
          <a
            href="/admin/orders"
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
          >
            <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-green-800">Manage Orders</p>
          </a>
          
          <a
            href="/admin/users"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
          >
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-blue-800">Manage Users</p>
          </a>
          
          <a
            href="/admin/support"
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center hover:bg-yellow-100 transition-colors"
          >
            <MessageCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="font-medium text-yellow-800">Support Center</p>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;