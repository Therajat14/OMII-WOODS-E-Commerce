import React, { useState } from 'react';
import { Eye, Filter, Download, User, Truck } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import { getAllOrders } from '../../data/orders';

const AdminOrders: React.FC = () => {
  const allOrders = getAllOrders();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
              Order Management
            </h1>
            <p className="text-charcoal-600">
              Track and manage all customer orders
            </p>
          </div>
          <Button icon={Download} variant="outline">
            Export Orders
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-wood-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-charcoal-600" />
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
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-wood-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-wood-50 border-b border-wood-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wood-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-wood-25">
                    <td className="py-4 px-4">
                      <p className="font-medium text-charcoal-900">{order.id}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-charcoal-900">{order.customerName}</p>
                        <p className="text-sm text-charcoal-600">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <img 
                            key={index}
                            src={item.image} 
                            alt={item.productName}
                            className="w-8 h-8 object-cover rounded"
                          />
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-xs text-charcoal-600">+{order.items.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-charcoal-900">₹{order.total.toLocaleString()}</p>
                      <p className="text-sm text-charcoal-600 capitalize">{order.paymentMethod}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-charcoal-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-charcoal-600">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-charcoal-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-charcoal-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <User className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-charcoal-600 hover:text-green-600 hover:bg-green-50 rounded">
                          <Truck className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-charcoal-900">{allOrders.length}</p>
            <p className="text-sm text-charcoal-600">Total Orders</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-green-600">
              {allOrders.filter(o => o.status === 'delivered').length}
            </p>
            <p className="text-sm text-charcoal-600">Delivered</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {allOrders.filter(o => ['shipped', 'out_for_delivery'].includes(o.status)).length}
            </p>
            <p className="text-sm text-charcoal-600">In Transit</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {allOrders.filter(o => ['placed', 'confirmed', 'processing'].includes(o.status)).length}
            </p>
            <p className="text-sm text-charcoal-600">Processing</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;