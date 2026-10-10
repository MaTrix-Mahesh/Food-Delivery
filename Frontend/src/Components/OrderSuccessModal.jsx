import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Bike, Utensils, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const calculateOrderStep = (createdAt) => {
  if (!createdAt) return 1;
  const elapsed = Date.now() - new Date(createdAt).getTime();
  if (elapsed >= 18000) return 3;
  if (elapsed >= 6000) return 2;
  return 1;
};

const OrderSuccessModal = () => {
  const { activeOrder, isOrderTrackingOpen, setIsOrderTrackingOpen, clearActiveOrder } = useCart();
  const [currentStep, setCurrentStep] = useState(() => calculateOrderStep(activeOrder?.createdAt));

  useEffect(() => {
    if (!activeOrder) return;
    
    const elapsed = Date.now() - new Date(activeOrder.createdAt || Date.now()).getTime();
    const t1 = elapsed < 6000 ? setTimeout(() => setCurrentStep(2), 6000 - elapsed) : null;
    const t2 = elapsed < 18000 ? setTimeout(() => setCurrentStep(3), 18000 - elapsed) : null;

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [activeOrder]);

  if (!activeOrder || !isOrderTrackingOpen) return null;

  const steps = [
    { num: 1, label: 'Order Confirmed', sub: 'Sent to restaurant kitchen', icon: CheckCircle },
    { num: 2, label: 'Kitchen Preparing', sub: 'Chef is baking & cooking fresh', icon: Utensils },
    { num: 3, label: 'Rider on the Way', sub: 'Express courier dispatched', icon: Bike },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={() => setIsOrderTrackingOpen(false)}
    >
      <div 
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="bg-linear-to-br from-orange-500 via-orange-600 to-amber-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-3">
            <Sparkles className="w-7 h-7 text-amber-200 animate-bounce" />
          </div>

          <h2 className="text-2xl font-black">Order Placed Successfully!</h2>
          <p className="text-orange-100 text-xs mt-1">
            Order #{activeOrder.id} • Arriving in ~{activeOrder.estimatedDeliveryMinutes} minutes
          </p>
        </div>

        {/* Live Progress Tracker */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
            <h4 className="text-xs font-black uppercase text-stone-400 tracking-wider mb-4">
              Live Order Tracker
            </h4>

            <div className="space-y-4">
              {steps.map((st) => {
                const IconComponent = st.icon;
                const isPassed = currentStep >= st.num;
                const isCurrent = currentStep === st.num;

                return (
                  <div key={st.num} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isPassed 
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                        : 'bg-stone-200 text-stone-400'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isCurrent ? 'text-orange-600 font-extrabold' : 'text-stone-800'}`}>
                          {st.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full animate-pulse">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{st.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Delivering to:</span>
            </div>
            <p className="text-sm font-semibold text-stone-900 pl-6">
              {activeOrder.details?.address} {activeOrder.details?.apt ? `(${activeOrder.details.apt})` : ''}
            </p>
            <p className="text-xs text-stone-500 pl-6">
              Recipient: {activeOrder.details?.fullName} • {activeOrder.details?.phone}
            </p>
          </div>

          {/* Items Summary */}
          <div className="border border-stone-100 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Items Ordered
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {activeOrder.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-orange-600">{item.quantity}x</span>
                    <span className="text-stone-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-stone-900">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-stone-100 pt-2 flex justify-between text-sm font-black text-stone-900">
              <span>Total Paid</span>
              <span className="text-orange-600">₹{activeOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <button
            type="button"
            onClick={clearActiveOrder}
            className="text-xs text-stone-400 hover:text-rose-500 font-semibold transition cursor-pointer"
          >
            Dismiss / Clear Order
          </button>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="bg-stone-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
