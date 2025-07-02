import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Plus, Eye, Clock, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getTicketsByCustomerId } from '../../data/support';

const Support: React.FC = () => {
  const { user } = useAuth();
  const tickets = user ? getTicketsByCustomerId(user.id) : [];
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    category: 'general' as 'order' | 'product' | 'shipping' | 'payment' | 'general',
    orderId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would create a new ticket
    console.log('Creating ticket:', newTicket);
    setShowNewTicket(false);
    setNewTicket({ subject: '', message: '', category: 'general', orderId: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <MessageCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
                Support Center
              </h1>
              <p className="text-charcoal-600">
                Get help with your orders, products, and account
              </p>
            </div>
            <Button
              onClick={() => setShowNewTicket(true)}
              icon={Plus}
            >
              New Ticket
            </Button>
          </div>
        </div>

        {/* New Ticket Form */}
        {showNewTicket && (
          <div className="bg-white rounded-lg border border-wood-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Create New Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="payment">Payment Issue</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={newTicket.orderId}
                    onChange={(e) => setNewTicket({ ...newTicket, orderId: e.target.value })}
                    placeholder="ORD-2024-001"
                    className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  placeholder="Please provide detailed information about your issue"
                  className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Submit Ticket</Button>
                <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Tickets */}
        <div className="bg-white rounded-lg border border-wood-200">
          <div className="p-6 border-b border-wood-200">
            <h2 className="text-xl font-semibold text-charcoal-900">Your Support Tickets</h2>
          </div>
          
          {tickets.length > 0 ? (
            <div className="divide-y divide-wood-200">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-6 hover:bg-wood-25 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(ticket.status)}
                        <h3 className="font-semibold text-charcoal-900">{ticket.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-charcoal-600 mb-2 line-clamp-2">{ticket.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-charcoal-500">
                        <span>Ticket #{ticket.id}</span>
                        <span>Category: {ticket.category}</span>
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        {ticket.replies.length > 0 && (
                          <span>{ticket.replies.length} replies</span>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      to={`/ticket/${ticket.id}`}
                      className="ml-4 inline-flex items-center px-3 py-2 border border-wood-300 text-charcoal-700 rounded-md hover:bg-wood-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <MessageCircle className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-charcoal-900 mb-2">No support tickets</h3>
              <p className="text-charcoal-600 mb-6">
                You haven't created any support tickets yet. If you need help, feel free to create one.
              </p>
              <Button onClick={() => setShowNewTicket(true)} icon={Plus}>
                Create Your First Ticket
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-wood-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-charcoal-900 mb-2">How do I track my order?</h3>
              <p className="text-sm text-charcoal-600">
                You can track your order from your dashboard or order history page. We'll also send you tracking updates via email.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-charcoal-900 mb-2">What is your return policy?</h3>
              <p className="text-sm text-charcoal-600">
                We offer a 30-day return policy for unused items in original condition. Custom orders may have different terms.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-charcoal-900 mb-2">How do I care for wooden products?</h3>
              <p className="text-sm text-charcoal-600">
                Clean with mild soap and water, dry immediately, and apply food-safe oil monthly to maintain the wood's natural beauty.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-charcoal-900 mb-2">Do you offer bulk discounts?</h3>
              <p className="text-sm text-charcoal-600">
                Yes! B2B customers get special pricing. Contact us for custom quotes on large orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;