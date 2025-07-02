import React from 'react';
import { MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { getTicketsByAssignee, getAllTickets } from '../../data/support';

const SupportDashboard: React.FC = () => {
  const { user } = useAuth();
  const myTickets = user ? getTicketsByAssignee(user.id) : [];
  const allTickets = getAllTickets();

  const stats = [
    {
      title: 'My Assigned Tickets',
      value: myTickets.length,
      icon: MessageCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Open Tickets',
      value: allTickets.filter(t => t.status === 'open').length,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      title: 'In Progress',
      value: myTickets.filter(t => t.status === 'in_progress').length,
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Resolved Today',
      value: myTickets.filter(t => t.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  const recentTickets = myTickets.slice(0, 5);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Support Dashboard
          </h1>
          <p className="text-charcoal-600">
            Welcome back, {user?.name}! Manage customer support tickets.
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
          {/* My Recent Tickets */}
          <div className="bg-white rounded-lg border border-wood-200 p-6">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-6">My Recent Tickets</h2>
            
            {recentTickets.length > 0 ? (
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-wood-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-charcoal-900">{ticket.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-charcoal-600 mb-2">{ticket.customerName}</p>
                    <p className="text-xs text-charcoal-500">
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority} priority
                      </span>
                      <a
                        href={`/support-ticket/${ticket.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
                <p className="text-charcoal-600">No tickets assigned to you</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/support-tickets"
                  className="flex items-center p-3 rounded-lg hover:bg-wood-50 transition-colors group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-charcoal-900">View All Tickets</p>
                    <p className="text-sm text-charcoal-600">Manage customer support requests</p>
                  </div>
                </a>
                
                <div className="flex items-center p-3 rounded-lg hover:bg-wood-50 transition-colors group">
                  <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-charcoal-900">Unassigned Tickets</p>
                    <p className="text-sm text-charcoal-600">Pick up new support requests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
              <h2 className="text-xl font-semibold text-charcoal-900 mb-4">This Month's Performance</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Tickets Resolved</span>
                  <span className="font-semibold text-charcoal-900">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Avg. Response Time</span>
                  <span className="font-semibold text-green-600">2.3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-700">Customer Satisfaction</span>
                  <span className="font-semibold text-charcoal-900">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportDashboard;