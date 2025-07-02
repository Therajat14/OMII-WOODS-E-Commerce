import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal-900">Personal Information</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  icon={Edit}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-charcoal-500" />
                    <div>
                      <p className="text-sm text-charcoal-600">Full Name</p>
                      <p className="font-medium text-charcoal-900">{user?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-charcoal-500" />
                    <div>
                      <p className="text-sm text-charcoal-600">Email</p>
                      <p className="font-medium text-charcoal-900">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-charcoal-500" />
                    <div>
                      <p className="text-sm text-charcoal-600">Phone</p>
                      <p className="font-medium text-charcoal-900">{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-lg border border-wood-200 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal-900">Saved Addresses</h2>
                <Button variant="outline" size="sm" icon={Plus}>
                  Add Address
                </Button>
              </div>

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border border-wood-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-charcoal-500 mt-0.5" />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="font-medium text-charcoal-900">{address.name}</p>
                              <span className="text-xs bg-wood-100 text-wood-700 px-2 py-1 rounded-full capitalize">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-charcoal-600">
                              {address.street}, {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-charcoal-600">{address.phone}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-charcoal-500 hover:text-primary-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-charcoal-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
                  <p className="text-charcoal-600 mb-4">No saved addresses</p>
                  <Button variant="outline" icon={Plus}>
                    Add Your First Address
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-6">Account Overview</h2>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">5</p>
                  <p className="text-sm text-charcoal-600">Total Orders</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">₹12,500</p>
                  <p className="text-sm text-charcoal-600">Total Spent</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-charcoal-600">Wishlist Items</p>
                </div>
              </div>

              {user?.isB2B && (
                <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-lg">
                  <h3 className="font-semibold text-gold-800 mb-2">B2B Account</h3>
                  <p className="text-sm text-gold-700">
                    You have access to special bulk pricing and business features.
                  </p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-charcoal-600">Member since</p>
                <p className="font-medium text-charcoal-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;