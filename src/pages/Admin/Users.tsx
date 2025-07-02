import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, UserPlus } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Mock users data (in real app, this would come from API)
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'customer@example.com',
      role: 'customer',
      isB2B: false,
      phone: '+91 9876543210',
      createdAt: '2024-01-15T00:00:00Z',
      lastLogin: '2024-02-01T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'b2b@example.com',
      role: 'customer',
      isB2B: true,
      phone: '+91 9876543211',
      createdAt: '2024-01-10T00:00:00Z',
      lastLogin: '2024-02-02T14:20:00Z',
      status: 'active'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@omiiwoods.com',
      role: 'admin',
      isB2B: false,
      phone: '+91 9876543212',
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: '2024-02-03T09:15:00Z',
      status: 'active'
    },
    {
      id: '4',
      name: 'Delivery Partner',
      email: 'delivery@example.com',
      role: 'delivery',
      isB2B: false,
      phone: '+91 9876543213',
      createdAt: '2024-01-05T00:00:00Z',
      lastLogin: '2024-02-02T16:45:00Z',
      status: 'active'
    },
    {
      id: '5',
      name: 'Support Agent',
      email: 'support@omiiwoods.com',
      role: 'support',
      isB2B: false,
      phone: '+91 9876543214',
      createdAt: '2024-01-05T00:00:00Z',
      lastLogin: '2024-02-03T11:30:00Z',
      status: 'active'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      case 'delivery':
        return 'bg-green-100 text-green-800';
      case 'support':
        return 'bg-purple-100 text-purple-800';
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
              User Management
            </h1>
            <p className="text-charcoal-600">
              Manage customer accounts and staff members
            </p>
          </div>
          <Button icon={UserPlus}>
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-wood-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-charcoal-600" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-wood-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customers</option>
                <option value="admin">Admins</option>
                <option value="delivery">Delivery Partners</option>
                <option value="support">Support Agents</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-wood-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-wood-50 border-b border-wood-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Account Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Last Login</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wood-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-wood-25">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-charcoal-900">{user.name}</p>
                        <p className="text-sm text-charcoal-600">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {user.role === 'customer' ? (
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          user.isB2B ? 'bg-gold-100 text-gold-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isB2B ? 'B2B' : 'B2C'}
                        </span>
                      ) : (
                        <span className="text-sm text-charcoal-600">Staff</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-charcoal-900">{user.phone}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-charcoal-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-charcoal-900">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-charcoal-600">
                        {new Date(user.lastLogin).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-charcoal-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-charcoal-600 hover:text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="h-4 w-4" />
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
            <p className="text-2xl font-bold text-charcoal-900">{users.length}</p>
            <p className="text-sm text-charcoal-600">Total Users</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'customer').length}
            </p>
            <p className="text-sm text-charcoal-600">Customers</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-gold-600">
              {users.filter(u => u.isB2B).length}
            </p>
            <p className="text-sm text-charcoal-600">B2B Accounts</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => ['admin', 'delivery', 'support'].includes(u.role)).length}
            </p>
            <p className="text-sm text-charcoal-600">Staff Members</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;