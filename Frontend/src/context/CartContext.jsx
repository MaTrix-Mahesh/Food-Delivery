import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const COUPONS = {
  FEAST40: { type: 'percent', value: 40, maxDiscount: 150, minSpend: 399, name: '40% Off Weekend Feast (Up to ₹150)' },
  BOGO2026: { type: 'flat', value: 100, minSpend: 499, name: '₹100 Flat Gourmet Discount' },
  FREESHIP: { type: 'delivery', value: 49, name: 'Free Express Delivery (Save ₹49)' },
  FAST20: { type: 'percent', value: 20, maxDiscount: 100, minSpend: 299, name: '20% Welcome Voucher' },
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fastbite_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If old cart has dollar-like fractional prices, clear it to prevent bad state
        if (parsed.length > 0 && parsed[0].price < 30) {
          localStorage.removeItem('fastbite_cart');
          return [];
        }
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFoodForDetail, setSelectedFoodForDetail] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('fastbite_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fastbite_user');
      return saved ? JSON.parse(saved) : { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', isLoggedIn: false };
    } catch {
      return { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', isLoggedIn: false };
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fastbite_cart', JSON.stringify(cart));
    } catch {
      // storage full or disabled
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('fastbite_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('fastbite_active_order');
      }
    } catch {
      // fallback
    }
  }, [activeOrder]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: food.id,
          name: food.name,
          price: food.price,
          image: food.image,
          prepTime: food.prepTime,
          isVeg: food.isVeg,
          category: food.category,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const getItemQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // Calculations in INR (₹)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Free delivery above ₹499, otherwise ₹49
  const baseDeliveryFee = subtotal >= 499 || cart.length === 0 ? 0 : 49;
  const isFreeDeliveryCoupon = appliedCoupon?.code === 'FREESHIP';
  const deliveryFee = isFreeDeliveryCoupon ? 0 : baseDeliveryFee;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      const calculated = Math.round((subtotal * appliedCoupon.value) / 100);
      discount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else if (appliedCoupon.type === 'flat') {
      discount = appliedCoupon.value;
    } else if (appliedCoupon.type === 'delivery') {
      discount = baseDeliveryFee;
    }
  }

  // 5% Restaurant GST
  const tax = Math.round(subtotal * 0.05);
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + tax);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyCoupon = (code) => {
    setCouponError('');
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS[cleanCode];

    if (!found) {
      setCouponError('Invalid coupon code. Try FEAST40 or BOGO2026!');
      return false;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      setCouponError(`Minimum order amount of ₹${found.minSpend} required.`);
      return false;
    }

    setAppliedCoupon({ code: cleanCode, ...found });
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: 'FB-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      deliveryFee,
      tax,
      discount,
      total: finalTotal,
      details: orderDetails,
      status: 'confirmed',
      estimatedDeliveryMinutes: 28,
    };
    setActiveOrder(newOrder);
    setIsOrderTrackingOpen(true);
    clearCart();
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
    setIsOrderTrackingOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        discount,
        finalTotal,
        appliedCoupon,
        couponError,
        isCartOpen,
        isCheckoutOpen,
        selectedFoodForDetail,
        activeOrder,
        isOrderTrackingOpen,
        user,
        isAuthOpen,
        setIsCartOpen,
        setIsCheckoutOpen,
        setSelectedFoodForDetail,
        setActiveOrder,
        setIsOrderTrackingOpen,
        clearActiveOrder,
        setUser,
        setIsAuthOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        applyCoupon,
        removeCoupon,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
