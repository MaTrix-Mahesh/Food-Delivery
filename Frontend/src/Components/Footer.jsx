import React, { useState } from 'react';
import { Flame, Mail, Phone, MapPin, Send, CheckCircle2, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-10 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-8 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8.5 h-8.5 rounded-xl bg-linear-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
                <Flame className="w-4.5 h-4.5 fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                FAST<span className="text-orange-500">BITE</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              FastBite delivers authentic Dum Biryanis, wood-fired pizzas, gourmet smash burgers, and fresh desserts straight to your doorstep within 30 minutes with pure quality guarantee.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Mumbai, Delhi NCR, Bengaluru & 45+ Cities in India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#menu" className="hover:text-orange-400 transition">
                  Dum Biryani & Thali
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition">
                  Wood-Fired Pizza
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition">
                  Gourmet Burgers
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition">
                  Starters & Momos
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-orange-400 transition">
                  Today's Deals (Save ₹150)
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>+91 1800 258 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>support@fastbite.in</span>
              </li>
              <li>
                <span className="hover:text-orange-400 transition cursor-pointer">
                  Live Order Tracker
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 transition cursor-pointer">
                  FSSAI Hygiene Standards
                </span>
              </li>
              <li>
                <span className="hover:text-orange-400 transition cursor-pointer">
                  Terms & Refund Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Promo Subscription */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Get ₹100 Off
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to get instant ₹100 voucher code and weekend secret discounts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-orange-500/20"
              >
                <span>Claim ₹100 Voucher</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Voucher code sent to your inbox!</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} FastBite Food Delivery Private Limited. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for food enthusiasts across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
