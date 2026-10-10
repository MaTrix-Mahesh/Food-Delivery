import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty cart and default state', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.activeOrder).toBeNull();
    expect(result.current.isOrderTrackingOpen).toBe(false);
  });

  it('adds item to cart and updates cart count and subtotal', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 'biryani-1',
      name: 'Dum Chicken Biryani',
      price: 349,
      image: '/test.jpg',
      prepTime: '25 min',
      isVeg: false,
      category: 'biryani',
    };

    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.cartCount).toBe(1);
    expect(result.current.subtotal).toBe(349);
    expect(result.current.cart[0].quantity).toBe(1);

    // Adding same item increases quantity
    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.cartCount).toBe(2);
    expect(result.current.subtotal).toBe(698);
  });

  it('rejects coupon when minimum spend is not met', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    // FEAST40 requires minSpend of 399
    // Cart is currently empty (subtotal = 0)
    let applied = false;
    act(() => {
      applied = result.current.applyCoupon('FEAST40');
    });

    expect(applied).toBe(false);
    expect(result.current.appliedCoupon).toBeNull();
    expect(result.current.couponError).toContain('Minimum order amount');
  });

  it('applies coupon successfully when minimum spend is met', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    // Add expensive item (subtotal >= 399)
    act(() => {
      result.current.addToCart({
        id: 'biryani-2',
        name: 'Awadhi Mutton Biryani',
        price: 479,
      });
    });

    let applied = false;
    act(() => {
      applied = result.current.applyCoupon('FEAST40');
    });

    expect(applied).toBe(true);
    expect(result.current.appliedCoupon).not.toBeNull();
    expect(result.current.appliedCoupon.code).toBe('FEAST40');
    expect(result.current.discount).toBeGreaterThan(0);
  });

  it('places order, sets activeOrder, opens order tracking modal, and clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: 'pizza-1',
        name: 'Truffle Pizza',
        price: 499,
      });
    });

    expect(result.current.cartCount).toBe(1);

    let order = null;
    act(() => {
      order = result.current.placeOrder({
        fullName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        address: 'Flat 402, Lotus Grandeur',
      });
    });

    expect(order).not.toBeNull();
    expect(result.current.cartCount).toBe(0);
    expect(result.current.activeOrder).not.toBeNull();
    expect(result.current.activeOrder.id).toBe(order.id);
    expect(result.current.isOrderTrackingOpen).toBe(true);

    // Can close tracking modal without destroying activeOrder
    act(() => {
      result.current.setIsOrderTrackingOpen(false);
    });
    expect(result.current.isOrderTrackingOpen).toBe(false);
    expect(result.current.activeOrder).not.toBeNull();

    // Clear active order
    act(() => {
      result.current.clearActiveOrder();
    });
    expect(result.current.activeOrder).toBeNull();
  });
});
