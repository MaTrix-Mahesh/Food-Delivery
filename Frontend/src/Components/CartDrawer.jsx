import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const {
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
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code) => {
    setCouponInput(code);
    applyCoupon(code);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Background backdrop click to close */}
      <div 
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900">Your Food Basket</h2>
              <span className="text-xs text-stone-500 font-medium">
                {cartCount} {cartCount === 1 ? 'item selected' : 'items selected'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-rose-500 font-medium px-2 py-1 rounded-lg hover:bg-stone-100 transition"
                title="Clear entire basket"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar in INR */}
        <div className="px-4 sm:px-5 py-3 bg-orange-50/60 border-b border-orange-100/70">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            {deliveryFee === 0 ? (
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Yay! FREE Express Delivery Unlocked!
              </span>
            ) : (
              <span className="text-stone-700">
                Add <span className="font-extrabold text-orange-600">₹{amountNeededForFreeDelivery}</span> more for Free Delivery
              </span>
            )}
            <span className="text-stone-500 font-extrabold">{Math.round(freeDeliveryPercent)}%</span>
          </div>
          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-linear-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${deliveryFee === 0 ? 100 : freeDeliveryPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-4xl mb-3 text-orange-400">
                🍲
              </div>
              <h3 className="text-lg font-black text-stone-800">Your basket is empty</h3>
              <p className="text-stone-500 text-xs mt-1 max-w-xs leading-relaxed">
                Hungry? Explore our hot Biryanis, wood-fired pizzas, gourmet smash burgers, and shakes!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-md shadow-orange-500/20 active:scale-95 transition"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-stone-100 hover:border-orange-100 bg-white transition group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-300 hover:text-rose-500 p-1 rounded-lg transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-stone-400 font-semibold mb-2">
                    ₹{item.price} each
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-stone-100 rounded-xl p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white text-stone-700 hover:bg-orange-500 hover:text-white flex items-center justify-center transition shadow-2xs text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition shadow-2xs text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-stone-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon & Totals section (only if cart has items) */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/80 space-y-3.5 shrink-0">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-extrabold">{appliedCoupon.code}</span> applied: {appliedCoupon.name}
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-600 font-bold ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (FEAST40, BOGO2026)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs uppercase tracking-wider font-semibold placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="bg-stone-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95"
                    >
                      Apply
                    </button>
                  </form>
                  
                  {couponError && (
                    <p className="text-rose-600 text-[11px] mt-1 font-semibold">{couponError}</p>
                  )}

                  {/* Quick Click coupons */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Quick:</span>
                    <button
                      type="button"
                      onClick={() => handleQuickCoupon('FEAST40')}
                      className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md hover:bg-orange-200 transition"
                    >
                      FEAST40
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickCoupon('BOGO2026')}
                      className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md hover:bg-amber-200 transition"
                    >
                      BOGO2026
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickCoupon('FREESHIP')}
                      className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md hover:bg-emerald-200 transition"
                    >
                      FREESHIP
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/60 pt-2.5">
              <div className="flex justify-between">
                <span>Item Subtotal</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-black uppercase text-[11px]">Free</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span>₹{tax}</span>
              </div>

              <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>To Pay</span>
                <span className="text-orange-600">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 active:scale-95 transition text-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
