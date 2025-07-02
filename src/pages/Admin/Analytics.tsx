import React from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Star } from 'lucide-react';
import Layout from '../../components/Layout/Layout';

const AdminAnalytics: React.FC = () => {
  // Mock analytics data
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 23 },
    { month: 'Feb', revenue: 52000, orders: 28 },
    { month: 'Mar', revenue: 48000, orders: 25 },
    { month: 'Apr', revenue: 61000, orders: 32 },
    { month: 'May', revenue: 55000, orders: 29 },
    { month: 'Jun', revenue: 67000, orders: 35 }
  ];

  const topProducts = [
    { name: 'Premium Shisham Dinner Set', sales: 45, revenue: 157500 },
    { name: 'Round Serving Tray - Neem Wood', sales: 38, revenue: 45600 },
    { name: 'Wooden Educational Toy Set', sales: 32, revenue: 48000 },
    { name: 'Dry Fruit Gift Box Set', sales: 28, revenue: 61600 },
    { name: 'Glass-Wood Water Jug', sales: 25, revenue: 24500 }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-charcoal-600">
            Business insights and performance metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-charcoal-900">₹3,28,000</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-charcoal-900">172</p>
                <p className="text-sm text-blue-600 mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600 mb-1">New Customers</p>
                <p className="text-2xl font-bold text-charcoal-900">34</p>
                <p className="text-sm text-purple-600 mt-1">+15% from last month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600 mb-1">Avg. Order Value</p>
                <p className="text-2xl font-bold text-charcoal-900">₹1,907</p>
                <p className="text-sm text-yellow-600 mt-1">+3% from last month</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Monthly Sales</h2>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-charcoal-900 w-8">{data.month}</span>
                    <div className="flex-1 bg-wood-100 rounded-full h-2 w-32">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 70000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-charcoal-900">₹{data.revenue.toLocaleString()}</p>
                    <p className="text-xs text-charcoal-600">{data.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-charcoal-900 w-6">#{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-charcoal-900">{product.name}</p>
                      <p className="text-xs text-charcoal-600">{product.sales} units sold</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-charcoal-900">
                    ₹{product.revenue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="h-6 w-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-charcoal-900">Inventory Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">In Stock</span>
                <span className="text-sm font-semibold text-green-600">245 items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">Low Stock</span>
                <span className="text-sm font-semibold text-yellow-600">12 items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">Out of Stock</span>
                <span className="text-sm font-semibold text-red-600">3 items</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-charcoal-900">Customer Satisfaction</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">Average Rating</span>
                <span className="text-sm font-semibold text-charcoal-900">4.7/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">Total Reviews</span>
                <span className="text-sm font-semibold text-charcoal-900">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">5-Star Reviews</span>
                <span className="text-sm font-semibold text-green-600">78%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-charcoal-900">Customer Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">Returning Customers</span>
                <span className="text-sm font-semibold text-charcoal-900">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">B2B Customers</span>
                <span className="text-sm font-semibold text-gold-600">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-charcoal-600">Avg. Lifetime Value</span>
                <span className="text-sm font-semibold text-charcoal-900">₹8,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAnalytics;