import React, { useState } from 'react';
import { X, MapPin, Phone, User, CreditCard, Banknote, ShieldCheck, Check, Sparkles, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutModal = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    finalTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    user
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Rahul Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Grandeur, Linking Road',
    apt: 'Near Bandra Station (West)',
    city: 'Mumbai - 400050',
    instructions: 'Ring doorbell, hand over to security or leave at door.',
    paymentMethod: 'upi', // upi, cod, card
    upiId: 'rahul.sharma@okaxis',
    cardNumber: '•••• •••• •••• 6521',
    cardExp: '08/29',
    cardCvc: '•••'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';

    const cleanedPhone = formData.phone.trim();
    const digitsOnly = cleanedPhone.replace(/\D/g, '');
    const tenDigitNumber = (digitsOnly.length === 12 && digitsOnly.startsWith('91'))
      ? digitsOnly.slice(2)
      : (digitsOnly.length === 11 && digitsOnly.startsWith('0'))
        ? digitsOnly.slice(1)
        : digitsOnly;

    const hasInvalidChars = /[^\d+\s\-()]/.test(cleanedPhone);
    if (!cleanedPhone || hasInvalidChars || tenDigitNumber.length !== 10) {
      errs.phone = 'Valid 10-digit mobile number required';
    }

    if (!formData.address.trim()) errs.address = 'Street/Flat address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-black">
              ✓
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">Complete Delivery Details</h2>
              <p className="text-xs text-stone-500">Express 30-minute delivery to your doorstep</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              1. Delivery Address (India)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="checkoutFullName" className="text-xs font-bold text-stone-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    id="checkoutFullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    className={`w-full bg-stone-50 border ${errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-orange-500'} rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white`}
                    placeholder="Rahul Sharma"
                  />
                </div>
                {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="checkoutPhone" className="text-xs font-bold text-stone-700 block mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    id="checkoutPhone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full bg-stone-50 border ${errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-orange-500'} rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="checkoutAddress" className="text-xs font-bold text-stone-700 block mb-1">
                  Flat / House / Floor & Society
                </label>
                <input
                  id="checkoutAddress"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                  className={`w-full bg-stone-50 border ${errors.address ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-orange-500'} rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:bg-white`}
                  placeholder="e.g. Flat 402, Lotus Grandeur, Linking Road"
                />
                {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={formData.apt}
                  onChange={(e) => setFormData({ ...formData, apt: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:bg-white"
                  placeholder="Near Metro Station or Park"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  City & Pincode
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:bg-white"
                  placeholder="Mumbai - 400050"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Delivery Instructions
                </label>
                <input
                  type="text"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:bg-white"
                  placeholder="e.g. Ring bell, leave at security gate"
                />
              </div>
            </div>
          </div>

          {/* Payment Method in India */}
          <div className="space-y-4 border-t border-stone-100 pt-6">
            <h3 className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-500" />
              2. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'upi' 
                    ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-bold' 
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                  className="hidden"
                />
                <Sparkles className={`w-5 h-5 ${formData.paymentMethod === 'upi' ? 'text-orange-600' : 'text-stone-400'}`} />
                <div>
                  <span className="text-xs block font-bold">UPI / GPay</span>
                  <span className="text-[10px] text-stone-400">PhonePe, Paytm, QR</span>
                </div>
              </label>

              <label 
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'card' 
                    ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-bold' 
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className="hidden"
                />
                <CreditCard className={`w-5 h-5 ${formData.paymentMethod === 'card' ? 'text-orange-600' : 'text-stone-400'}`} />
                <div>
                  <span className="text-xs block font-bold">Card / RuPay</span>
                  <span className="text-[10px] text-stone-400">Debit or Credit Card</span>
                </div>
              </label>

              <label 
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition ${
                  formData.paymentMethod === 'cod' 
                    ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-bold' 
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="hidden"
                />
                <Banknote className={`w-5 h-5 ${formData.paymentMethod === 'cod' ? 'text-orange-600' : 'text-stone-400'}`} />
                <div>
                  <span className="text-xs block font-bold">Cash on Delivery</span>
                  <span className="text-[10px] text-stone-400">Pay cash upon arrival</span>
                </div>
              </label>
            </div>

            {/* UPI Option active */}
            {formData.paymentMethod === 'upi' && (
              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-orange-900 font-semibold">
                  <span>Fast UPI Payment Gateway</span>
                  <span className="bg-orange-200/70 text-orange-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Instant Verify</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="flex-1 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
                  />
                  <div className="bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 font-bold text-stone-700">
                    <QrCode className="w-4 h-4 text-orange-600" />
                    <span>Scan QR</span>
                  </div>
                </div>
              </div>
            )}

            {/* If Card selected */}
            {formData.paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-700">Secured with RBI 2-Factor Authentication</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    readOnly
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.cardExp}
                    readOnly
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={formData.cardCvc}
                    readOnly
                    className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Box in INR */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 text-xs space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>Items count:</span>
              <span className="font-bold text-stone-800">{cart.length} items</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Item Total:</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Voucher Discount:</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Delivery Charge:</span>
              <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Restaurant GST (5%):</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Payable Amount:</span>
              <span className="text-orange-600 font-black">₹{finalTotal}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-stone-300 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-95 transition text-sm sm:text-base"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Securing Order...</span>
                </div>
              ) : (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <span>Confirm Order • ₹{finalTotal}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
