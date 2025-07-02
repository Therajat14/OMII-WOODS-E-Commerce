import React, { useState } from 'react';
import { Eye, Filter, User, Clock } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import { getAllTickets } from '../../data/support';

const SupportTickets: React.FC = () => {
  const allTickets = getAllTickets();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTickets = allTickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            Support Tickets
          </h1>
          <p className="text-charcoal-600">
            Manage all customer support tickets
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-wood-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-charcoal-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-wood-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-wood-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg border border-wood-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-wood-50 border-b border-wood-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Ticket</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Priority</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Assigned</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wood-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-wood-25">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-charcoal-900">{ticket.subject}</p>
                        <p className="text-sm text-charcoal-600">#{ticket.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-charcoal-900">{ticket.customerName}</p>
                        <p className="text-sm text-charcoal-600">{ticket.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-wood-100 text-wood-700 px-2 py-1 rounded-full text-sm capitalize">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {ticket.assignedToName ? (
                        <p className="text-sm text-charcoal-900">{ticket.assignedToName}</p>
                      ) : (
                        <span className="text-sm text-charcoal-500">Unassigned</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-charcoal-900">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-charcoal-600">
                        {new Date(ticket.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <a
                          href={`/support-ticket/${ticket.id}`}
                          className="p-2 text-charcoal-600 hover:text-primary-600 hover:bg-primary-50 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <button className="p-2 text-charcoal-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <User className="h-4 w-4" />
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
            <p className="text-2xl font-bold text-charcoal-900">{allTickets.length}</p>
            <p className="text-sm text-charcoal-600">Total Tickets</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {allTickets.filter(t => t.status === 'open').length}
            </p>
            <p className="text-sm text-charcoal-600">Open</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {allTickets.filter(t => t.status === 'in_progress').length}
            </p>
            <p className="text-sm text-charcoal-600">In Progress</p>
          </div>
          <div className="bg-white rounded-lg border border-wood-200 p-6 text-center">
            <p className="text-2xl font-bold text-green-600">
              {allTickets.filter(t => t.status === 'resolved').length}
            </p>
            <p className="text-sm text-charcoal-600">Resolved</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportTickets;