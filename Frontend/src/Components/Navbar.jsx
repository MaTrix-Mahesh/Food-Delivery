import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Flame, Bike, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, subtotal, setIsCartOpen, activeOrder, setIsOrderTrackingOpen, user, setUser, setIsAuthOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    const defaultUser = { name: 'Guest', email: '', isLoggedIn: false };
    setUser(defaultUser);
    try {
      localStorage.removeItem('fastbite_user');
    } catch {
      // ignore
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-40 border-b border-stone-200/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-8.5 h-8.5 rounded-xl bg-linear-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/30 group-hover:scale-105 transition">
            <Flame className="w-4.5 h-4.5 fill-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-stone-900 group-hover:text-orange-600 transition">
              FAST<span className="text-orange-600">BITE</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 text-stone-600 font-semibold text-xs lg:text-sm">
          <li>
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-orange-600 transition"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('menu')} 
              className="hover:text-orange-600 transition"
            >
              Menu
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('offers')} 
              className="hover:text-orange-600 transition flex items-center gap-1.5"
            >
              <span>Offers</span>
              <span className="text-[10px] font-black uppercase bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
                Hot
              </span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-orange-600 transition"
            >
              Why Us
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('reviews')} 
              className="hover:text-orange-600 transition"
            >
              Reviews
            </button>
          </li>
        </ul>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Active Order Pill (if active order exists) */}
          {activeOrder && (
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-emerald-100 transition animate-pulse cursor-pointer shadow-xs"
              title="Click to view live order progress"
            >
              <Bike className="w-3.5 h-3.5 text-emerald-600" />
              <span>Order #{activeOrder.id} Active</span>
            </button>
          )}

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-stone-900 hover:bg-orange-600 text-white px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2.5 shadow-md hover:shadow-orange-500/25 transition-all active:scale-95"
            aria-label="View shopping bag"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-stone-900">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {cartCount === 0 ? 'Bag' : `₹${subtotal}`}
            </span>
          </button>

          {/* User Auth Info */}
          {user?.isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-stone-800 max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-stone-400 hover:text-rose-500 p-1"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-orange-600 px-3 py-2 rounded-xl border border-stone-200 hover:border-orange-200 transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Flyout Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white/95 backdrop-blur-md px-6 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left font-bold text-stone-700 py-2 hover:text-orange-600"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="block w-full text-left font-bold text-stone-700 py-2 hover:text-orange-600"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('offers')}
            className="block w-full text-left font-bold text-stone-700 py-2 hover:text-orange-600"
          >
            Special Offers
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left font-bold text-stone-700 py-2 hover:text-orange-600"
          >
            Why FastBite
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="block w-full text-left font-bold text-stone-700 py-2 hover:text-orange-600"
          >
            Testimonials
          </button>

          {activeOrder && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOrderTrackingOpen(true);
              }}
              className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-3 rounded-2xl hover:bg-emerald-100 transition"
            >
              <div className="flex items-center gap-2.5">
                <Bike className="w-4 h-4 text-emerald-600" />
                <span>Track Active Order #{activeOrder.id}</span>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold uppercase">Live</span>
            </button>
          )}

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            {user?.isLoggedIn ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-stone-700">Signed in as {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-500 font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full bg-orange-500 text-white font-bold py-2.5 rounded-xl text-center text-xs"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;