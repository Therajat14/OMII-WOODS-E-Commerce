import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  discount: number;
  minAmount?: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  appliedPromo: PromoCode | null;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock promo codes
const mockPromoCodes: PromoCode[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    discount: 10,
    minAmount: 1000,
    validUntil: '2025-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'FLAT500',
    type: 'fixed',
    discount: 500,
    minAmount: 2000,
    validUntil: '2025-12-31T23:59:59Z',
    isActive: true
  },
  {
    code: 'B2B15',
    type: 'percentage',
    discount: 15,
    minAmount: 5000,
    maxDiscount: 2000,
    validUntil: '2025-12-31T23:59:59Z',
    isActive: true
  }
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('omii_cart');
    const savedPromo = localStorage.getItem('omii_promo');
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        localStorage.removeItem('omii_cart');
      }
    }

    if (savedPromo) {
      try {
        setAppliedPromo(JSON.parse(savedPromo));
      } catch (error) {
        localStorage.removeItem('omii_promo');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('omii_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('omii_promo', JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem('omii_promo');
    }
  }, [appliedPromo]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === newItem.productId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, id: Date.now().toString() }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const applyPromoCode = (code: string): boolean => {
    const promo = mockPromoCodes.find(p => 
      p.code.toLowerCase() === code.toLowerCase() && 
      p.isActive && 
      new Date(p.validUntil) > new Date()
    );

    if (!promo) {
      return false;
    }

    const total = getTotal();
    if (promo.minAmount && total < promo.minAmount) {
      return false;
    }

    setAppliedPromo(promo);
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const getDiscountAmount = (): number => {
    if (!appliedPromo) return 0;
    
    const total = getTotal();
    let discount = 0;

    if (appliedPromo.type === 'percentage') {
      discount = (total * appliedPromo.discount) / 100;
      if (appliedPromo.maxDiscount) {
        discount = Math.min(discount, appliedPromo.maxDiscount);
      }
    } else {
      discount = appliedPromo.discount;
    }

    return Math.min(discount, total);
  };

  const getFinalTotal = (): number => {
    return Math.max(0, getTotal() - getDiscountAmount());
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    applyPromoCode,
    removePromoCode,
    appliedPromo,
    getDiscountAmount,
    getFinalTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};