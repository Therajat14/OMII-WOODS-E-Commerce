import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import { getTicketById } from '../../data/support';
import { useAuth } from '../../contexts/AuthContext';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const ticket = getTicketById(id || '');
  const [newReply, setNewReply] = useState('');

  if (!ticket) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-charcoal-900 mb-4">Ticket Not Found</h1>
          <Link to="/support" className="text-primary-600 hover:text-primary-700">
            ← Back to Support
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    
    // In real app, this would add a reply to the ticket
    console.log('Adding reply:', newReply);
    setNewReply('');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/support" 
            className="flex items-center text-charcoal-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Support
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-charcoal-900">
                {ticket.subject}
              </h1>
              <p className="text-charcoal-600">
                Ticket #{ticket.id} • Created {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
            </span>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="bg-white rounded-lg border border-wood-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <span className="text-charcoal-600">Category:</span>
              <span className="ml-2 font-medium capitalize">{ticket.category}</span>
            </div>
            <div>
              <span className="text-charcoal-600">Priority:</span>
              <span className={`ml-2 font-medium capitalize ${
                ticket.priority === 'high' ? 'text-red-600' :
                ticket.priority === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {ticket.priority}
              </span>
            </div>
            {ticket.orderId && (
              <div>
                <span className="text-charcoal-600">Order:</span>
                <Link to={`/order/${ticket.orderId}`} className="ml-2 font-medium text-primary-600 hover:text-primary-700">
                  {ticket.orderId}
                </Link>
              </div>
            )}
          </div>
          
          {ticket.assignedToName && (
            <div className="text-sm mb-4">
              <span className="text-charcoal-600">Assigned to:</span>
              <span className="ml-2 font-medium">{ticket.assignedToName}</span>
            </div>
          )}
        </div>

        {/* Conversation */}
        <div className="bg-white rounded-lg border border-wood-200">
          <div className="p-6 border-b border-wood-200">
            <h2 className="text-xl font-semibold text-charcoal-900">Conversation</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Original Message */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">
                  {ticket.customerName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-charcoal-900">{ticket.customerName}</span>
                  <span className="text-xs text-charcoal-500">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="bg-wood-50 rounded-lg p-4">
                  <p className="text-charcoal-700">{ticket.message}</p>
                </div>
              </div>
            </div>

            {/* Replies */}
            {ticket.replies.map((reply) => (
              <div key={reply.id} className={`flex space-x-4 ${reply.isCustomer ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  reply.isCustomer ? 'bg-primary-100' : 'bg-green-100'
                }`}>
                  <span className={`font-semibold text-sm ${
                    reply.isCustomer ? 'text-primary-600' : 'text-green-600'
                  }`}>
                    {reply.authorName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className={`flex items-center space-x-2 mb-1 ${reply.isCustomer ? '' : 'justify-end'}`}>
                    <span className="font-medium text-charcoal-900">{reply.authorName}</span>
                    <span className="text-xs text-charcoal-500">
                      {new Date(reply.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className={`rounded-lg p-4 ${
                    reply.isCustomer ? 'bg-wood-50' : 'bg-green-50'
                  }`}>
                    <p className="text-charcoal-700">{reply.message}</p>
                    {reply.attachments && reply.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {reply.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-charcoal-600">
                            <Paperclip className="h-4 w-4" />
                            <span>{attachment}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          {ticket.status !== 'closed' && (
            <div className="border-t border-wood-200 p-6">
              <form onSubmit={handleSubmitReply}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Add a reply
                  </label>
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={4}
                    placeholder="Type your message here..."
                    className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-wood-300 text-charcoal-700 rounded-md hover:bg-wood-50 transition-colors"
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </button>
                  <Button type="submit" icon={Send} disabled={!newReply.trim()}>
                    Send Reply
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetail;