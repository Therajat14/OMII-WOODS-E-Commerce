import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'delivery' | 'support';
  phone?: string;
  addresses?: Address[];
  createdAt: string;
  isB2B?: boolean;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer',
    phone: '+91 9876543210',
    createdAt: '2024-01-15T00:00:00Z',
    isB2B: false,
    addresses: [
      {
        id: 'addr1',
        type: 'home',
        name: 'John Doe',
        street: '123 Main Street',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        phone: '+91 9876543210',
        isDefault: true
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'b2b@example.com',
    password: 'password123',
    role: 'customer',
    phone: '+91 9876543211',
    createdAt: '2024-01-10T00:00:00Z',
    isB2B: true,
    addresses: [
      {
        id: 'addr2',
        type: 'office',
        name: 'Jane Smith',
        street: '456 Business Park',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91 9876543211',
        isDefault: true
      }
    ]
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@omiiwoods.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 9876543212',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Delivery Partner',
    email: 'delivery@example.com',
    password: 'delivery123',
    role: 'delivery',
    phone: '+91 9876543213',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Support Agent',
    email: 'support@omiiwoods.com',
    password: 'support123',
    role: 'support',
    phone: '+91 9876543214',
    createdAt: '2024-01-05T00:00:00Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('omii_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('omii_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('omii_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return false;
      }

      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'customer',
        phone: userData.phone,
        createdAt: new Date().toISOString(),
        isB2B: userData.isB2B || false,
        addresses: []
      };

      // Add to mock data
      mockUsers.push({ ...newUser, password: userData.password });
      
      setUser(newUser);
      localStorage.setItem('omii_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('omii_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('omii_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};