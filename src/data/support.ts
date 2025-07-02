export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  category: 'order' | 'product' | 'shipping' | 'payment' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  assignedToName?: string;
  replies: SupportReply[];
  orderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportReply {
  id: string;
  message: string;
  isCustomer: boolean;
  authorName: string;
  timestamp: string;
  attachments?: string[];
}

export const supportTickets: SupportTicket[] = [
  {
    id: 'TKT-2024-001',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'customer@example.com',
    subject: 'Issue with my recent order',
    message: 'I received my dinner set but one of the plates has a small crack. Can you help me with a replacement?',
    category: 'order',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: '5',
    assignedToName: 'Support Agent',
    orderId: 'ORD-2024-001',
    replies: [
      {
        id: 'reply-1',
        message: 'Thank you for contacting us. I apologize for the damaged item. We will arrange a replacement for the cracked plate immediately. Can you please share a photo of the damaged item?',
        isCustomer: false,
        authorName: 'Support Agent',
        timestamp: '2024-02-04T10:30:00Z'
      },
      {
        id: 'reply-2',
        message: 'Thank you for the quick response! I have attached the photo of the cracked plate. Please let me know the next steps.',
        isCustomer: true,
        authorName: 'John Doe',
        timestamp: '2024-02-04T14:20:00Z',
        attachments: ['photo-damaged-plate.jpg']
      }
    ],
    createdAt: '2024-02-04T09:15:00Z',
    updatedAt: '2024-02-04T14:20:00Z'
  },
  {
    id: 'TKT-2024-002',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'b2b@example.com',
    subject: 'Bulk order delivery timeline',
    message: 'Can you provide an update on my bulk order ORD-2024-002? I need to confirm the delivery date with my team.',
    category: 'shipping',
    priority: 'high',
    status: 'resolved',
    assignedTo: '5',
    assignedToName: 'Support Agent',
    orderId: 'ORD-2024-002',
    replies: [
      {
        id: 'reply-3',
        message: 'Your bulk order is currently being processed and will be shipped by February 8th. Expected delivery is February 10th as originally communicated. I will send you tracking details once shipped.',
        isCustomer: false,
        authorName: 'Support Agent',
        timestamp: '2024-02-03T11:00:00Z'
      },
      {
        id: 'reply-4',
        message: 'Perfect! Thank you for the confirmation. Looking forward to the tracking details.',
        isCustomer: true,
        authorName: 'Jane Smith',
        timestamp: '2024-02-03T11:15:00Z'
      }
    ],
    createdAt: '2024-02-03T10:45:00Z',
    updatedAt: '2024-02-03T11:15:00Z'
  },
  {
    id: 'TKT-2024-003',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'customer@example.com',
    subject: 'Care instructions for wooden products',
    message: 'What is the best way to maintain and clean my wooden dinner set to ensure it lasts long?',
    category: 'product',
    priority: 'low',
    status: 'open',
    replies: [],
    createdAt: '2024-02-05T16:30:00Z',
    updatedAt: '2024-02-05T16:30:00Z'
  }
];

export const getTicketsByCustomerId = (customerId: string): SupportTicket[] => {
  return supportTickets.filter(ticket => ticket.customerId === customerId);
};

export const getTicketById = (ticketId: string): SupportTicket | undefined => {
  return supportTickets.find(ticket => ticket.id === ticketId);
};

export const getAllTickets = (): SupportTicket[] => {
  return supportTickets;
};

export const getTicketsByAssignee = (assigneeId: string): SupportTicket[] => {
  return supportTickets.filter(ticket => ticket.assignedTo === assigneeId);
};

export const createTicket = (ticketData: Omit<SupportTicket, 'id' | 'replies' | 'createdAt' | 'updatedAt'>): SupportTicket => {
  const newTicket: SupportTicket = {
    ...ticketData,
    id: `TKT-2024-${String(supportTickets.length + 1).padStart(3, '0')}`,
    replies: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  supportTickets.push(newTicket);
  return newTicket;
};

export const addReply = (ticketId: string, reply: Omit<SupportReply, 'id' | 'timestamp'>): boolean => {
  const ticketIndex = supportTickets.findIndex(ticket => ticket.id === ticketId);
  if (ticketIndex === -1) return false;

  const newReply: SupportReply = {
    ...reply,
    id: `reply-${Date.now()}`,
    timestamp: new Date().toISOString()
  };

  supportTickets[ticketIndex].replies.push(newReply);
  supportTickets[ticketIndex].updatedAt = new Date().toISOString();

  return true;
};

export const updateTicketStatus = (ticketId: string, status: SupportTicket['status']): boolean => {
  const ticketIndex = supportTickets.findIndex(ticket => ticket.id === ticketId);
  if (ticketIndex === -1) return false;

  supportTickets[ticketIndex].status = status;
  supportTickets[ticketIndex].updatedAt = new Date().toISOString();

  return true;
};

export const assignTicket = (ticketId: string, assigneeId: string, assigneeName: string): boolean => {
  const ticketIndex = supportTickets.findIndex(ticket => ticket.id === ticketId);
  if (ticketIndex === -1) return false;

  supportTickets[ticketIndex].assignedTo = assigneeId;
  supportTickets[ticketIndex].assignedToName = assigneeName;
  supportTickets[ticketIndex].status = 'in_progress';
  supportTickets[ticketIndex].updatedAt = new Date().toISOString();

  return true;
};