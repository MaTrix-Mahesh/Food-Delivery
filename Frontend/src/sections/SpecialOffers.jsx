import React, { useState } from 'react';
import { Tag, Sparkles, Clock, Copy, Check, ArrowRight } from 'lucide-react';
import { specialDeals } from '../data/foodData';
import { useCart } from '../context/CartContext';

const SpecialOffers = () => {
  const { applyCoupon, setIsCartOpen, appliedCoupon } = useCart();
  const [feedback, setFeedback] = useState({ code: '', status: '' });

  const handleClaimDeal = async (code) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      }
    } catch {
      // ignore clipboard permission errors
    }

    const isApplied = applyCoupon(code);
    if (isApplied) {
      setFeedback({ code, status: 'applied' });
    } else {
      setFeedback({ code, status: 'copied' });
    }
    setIsCartOpen(true);
    setTimeout(() => {
      setFeedback({ code: '', status: '' });
    }, 3000);
  };

  return (
    <section id="offers" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-stone-100/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold text-[11px] uppercase tracking-wider bg-orange-100 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Limited Time Promotions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              Exclusive Food Deals & Vouchers
            </h2>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm max-w-sm mt-1.5 md:mt-0">
            Enjoy great discounts on your favorite delicacies. Use these limited-time voucher codes at checkout!
          </p>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {specialDeals.map((deal) => {
            const isApplied = appliedCoupon?.code === deal.code || (feedback.code === deal.code && feedback.status === 'applied');
            const isCopiedOnly = feedback.code === deal.code && feedback.status === 'copied';

            return (
              <div
                key={deal.id}
                className={`rounded-2xl p-4 sm:p-5 bg-linear-to-br ${deal.bgGradient} text-white shadow-lg relative overflow-hidden flex flex-col justify-between group hover:-translate-y-0.5 transition-all duration-300`}
              >
                {/* Background decorative circles */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none"></div>

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {deal.badge}
                    </span>
                    <span className="text-[11px] text-white/80 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {deal.expiresIn}
                    </span>
                  </div>

                  {/* Main Value */}
                  <div className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
                    {deal.discount}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-1">
                    {deal.title}
                  </h3>

                  <p className="text-white/80 text-[11px] leading-relaxed">
                    {deal.subtitle}
                  </p>
                </div>

                {/* Promo Code & Action */}
                <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between gap-2.5">
                  <div className="bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-white/80" />
                    <span className="font-mono text-xs font-black tracking-wider">
                      {deal.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleClaimDeal(deal.code)}
                    className="bg-white hover:bg-stone-50 text-stone-900 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-sm active:scale-95 transition cursor-pointer"
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                        <span className="text-emerald-700 font-black">Applied!</span>
                      </>
                    ) : isCopiedOnly ? (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-amber-800 font-bold">Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>Claim Deal</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
