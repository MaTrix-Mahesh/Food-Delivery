import React from 'react';
import { ArrowRight, Flame, Clock, Star, ShieldCheck, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-20 pb-8 sm:pt-24 sm:pb-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Headlines & CTA */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-orange-100/90 border border-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide shadow-2xs">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse shrink-0" />
            <span className="truncate">⚡ LIGHTNING FAST 30-MIN FOOD DELIVERY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
            Taste the Magic <br />
            Delivered <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-500 to-rose-600">Hot & Fresh.</span>
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm lg:text-base max-w-xl leading-relaxed">
            From fragrant royal Hyderabadi Dum Biryani to wood-fired artisan pizzas and juicy smash burgers. Prepared fresh by master chefs and delivered to your doorstep across India.
          </p>

          {/* Quick Categories Bar for Mobile/Desktop */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs font-bold text-stone-600">
            <span className="text-stone-400 font-semibold text-[11px]">Popular:</span>
            {['Dum Biryani', 'Paneer Tikka Pizza', 'Smash Burgers', 'Peri-Peri Fries', 'Lassi & Shakes'].map((tag) => (
              <button
                key={tag}
                onClick={() => scrollTo('menu')}
                className="bg-stone-100 hover:bg-orange-100 hover:text-orange-700 px-2.5 py-1 rounded-lg text-[11px] transition"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => scrollTo('menu')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group active:scale-95 transition text-xs sm:text-sm"
            >
              <span>Explore Food Menu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('offers')}
              className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-extrabold px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:border-orange-300 transition active:scale-95 text-xs sm:text-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Special Vouchers (Save ₹150)</span>
            </button>
          </div>

          {/* Trust Metrics Bar in INR */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200/70 max-w-md">
            <div>
              <div className="text-lg sm:text-xl font-black text-stone-900">30<span className="text-orange-500">m</span></div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Avg. delivery</p>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-stone-900 flex items-center">
                4.9<Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 ml-0.5 inline" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">25k+ Foodies</p>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-stone-900">₹499<span className="text-emerald-600 text-xs font-bold ml-0.5">+</span></div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Free delivery</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visuals with Clean Contained Layout */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-2 bg-linear-to-tr from-orange-400/20 to-amber-300/25 rounded-3xl blur-xl -z-10"></div>

            {/* Main Hero Card Image with Overflow Hidden to Prevent Spilling */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-stone-100 aspect-4/3 max-h-[340px]">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                alt="Royal Hyderabadi Biryani"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                <span className="bg-orange-500 text-[9px] font-black uppercase px-2 py-0.5 rounded-full mb-1 inline-block">
                  Chef's Royal Special
                </span>
                <h3 className="text-base sm:text-lg font-black leading-tight">Hyderabadi Dum Chicken Biryani</h3>
                <p className="text-[11px] text-stone-200">Clay pot cooked with desi ghee • ₹349</p>
              </div>

              {/* Contained Badge 1: Speed (Inside Top-Left) */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-md border border-stone-100 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-stone-900 block leading-tight">Express Delivery</span>
                  <span className="text-[9px] text-stone-500 block leading-none">Under 30 Mins</span>
                </div>
              </div>

              {/* Contained Badge 2: Hygiene (Inside Top-Right) */}
              <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-md border border-stone-100 flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-stone-900 block leading-tight">FSSAI Certified</span>
                  <span className="text-[9px] text-stone-500 block leading-none">100% Hygienic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;