import { Product } from './products';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface DeliveryTimeline {
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timestamp: string;
  message: string;
  location?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  expectedDelivery: string;
  timeline: DeliveryTimeline[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'customer@example.com',
    items: [
      {
        productId: '1',
        productName: 'Premium Shisham Dinner Set',
        price: 3500,
        quantity: 1,
        image: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        productId: '2',
        productName: 'Round Serving Tray - Neem Wood',
        price: 1200,
        quantity: 2,
        image: 'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    subtotal: 5900,
    discount: 590,
    shippingCost: 150,
    total: 5460,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    status: 'shipped',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 9876543210'
    },
    deliveryPartnerId: '4',
    deliveryPartnerName: 'Delivery Partner',
    expectedDelivery: '2024-02-05T18:00:00Z',
    timeline: [
      {
        status: 'placed',
        timestamp: '2024-02-01T10:00:00Z',
        message: 'Order placed successfully'
      },
      {
        status: 'confirmed',
        timestamp: '2024-02-01T11:30:00Z',
        message: 'Order confirmed and being prepared'
      },
      {
        status: 'processing',
        timestamp: '2024-02-02T09:00:00Z',
        message: 'Order is being processed'
      },
      {
        status: 'shipped',
        timestamp: '2024-02-03T14:00:00Z',
        message: 'Order shipped from Haridwar facility',
        location: 'Haridwar, Uttarakhand'
      }
    ],
    notes: 'Please handle with care - fragile items',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-03T14:00:00Z'
  },
  {
    id: 'ORD-2024-002',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'b2b@example.com',
    items: [
      {
        productId: '5',
        productName: 'Wooden Educational Toy Set',
        price: 1200,
        quantity: 30,
        image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    subtotal: 36000,
    discount: 5400,
    shippingCost: 0,
    total: 30600,
    paymentMethod: 'netbanking',
    paymentStatus: 'paid',
    status: 'processing',
    shippingAddress: {
      name: 'Jane Smith',
      street: '456 Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543211'
    },
    expectedDelivery: '2024-02-10T18:00:00Z',
    timeline: [
      {
        status: 'placed',
        timestamp: '2024-02-02T15:00:00Z',
        message: 'Bulk order placed successfully'
      },
      {
        status: 'confirmed',
        timestamp: '2024-02-02T16:00:00Z',
        message: 'B2B order confirmed - special pricing applied'
      },
      {
        status: 'processing',
        timestamp: '2024-02-03T10:00:00Z',
        message: 'Bulk order being prepared'
      }
    ],
    notes: 'B2B bulk order - educational toys for school',
    createdAt: '2024-02-02T15:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z'
  }
];

export const getOrdersByCustomerId = (customerId: string): Order[] => {
  return orders.filter(order => order.customerId === customerId);
};

export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

export const getOrdersByDeliveryPartner = (deliveryPartnerId: string): Order[] => {
  return orders.filter(order => order.deliveryPartnerId === deliveryPartnerId);
};

export const getAllOrders = (): Order[] => {
  return orders;
};

export const updateOrderStatus = (orderId: string, status: Order['status'], message: string, location?: string): boolean => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return false;

  const order = orders[orderIndex];
  order.status = status;
  order.updatedAt = new Date().toISOString();
  
  order.timeline.push({
    status,
    timestamp: new Date().toISOString(),
    message,
    location
  });

  return true;
};

export const assignDeliveryPartner = (orderId: string, deliveryPartnerId: string, deliveryPartnerName: string): boolean => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return false;

  const order = orders[orderIndex];
  order.deliveryPartnerId = deliveryPartnerId;
  order.deliveryPartnerName = deliveryPartnerName;
  order.updatedAt = new Date().toISOString();

  return true;
};