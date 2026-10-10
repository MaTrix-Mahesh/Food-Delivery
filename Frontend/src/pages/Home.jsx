import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../sections/Hero';
import SpecialOffers from '../sections/SpecialOffers';
import PopularMenu from '../sections/PopularMenu';
import Features from '../sections/Features';
import Testimonials from '../sections/Testimonials';
import Footer from '../Components/Footer';
import CartDrawer from '../Components/CartDrawer';
import CheckoutModal from '../Components/CheckoutModal';
import OrderSuccessModal from '../Components/OrderSuccessModal';
import FoodModal from '../Components/FoodModal';
import AuthModal from '../Components/AuthModal';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Home as HomeIcon, Utensils, Sparkles, User } from 'lucide-react';

const Home = () => {
  const { cartCount, subtotal, setIsCartOpen, setIsAuthOpen } = useCart();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-orange-500 selection:text-white pb-16 sm:pb-0 overflow-x-hidden w-full">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <SpecialOffers />
        <PopularMenu />
        <Features />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <FoodModal />
      <AuthModal />

      {/* Floating Bottom Quick-Cart Button (Active when cart has items on tablet/desktop) */}
      {cartCount > 0 && (
        <div className="hidden sm:block fixed bottom-6 right-6 z-30 animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-5 py-3.5 rounded-full shadow-2xl shadow-orange-500/40 flex items-center gap-3 active:scale-95 transition-all"
            aria-label="View basket"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-sm">View Basket (₹{subtotal})</span>
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Super Modern & App-like) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => scrollTo('hero')}
          className="flex flex-col items-center text-stone-500 hover:text-orange-600 transition"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => scrollTo('menu')}
          className="flex flex-col items-center text-stone-500 hover:text-orange-600 transition"
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Menu</span>
        </button>

        <button
          onClick={() => scrollTo('offers')}
          className="flex flex-col items-center text-stone-500 hover:text-orange-600 transition"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Offers</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center text-orange-600 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black mt-0.5">
            {cartCount > 0 ? `₹${subtotal}` : 'Cart'}
          </span>
        </button>

        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex flex-col items-center text-stone-500 hover:text-orange-600 transition"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Account</span>
        </button>
      </div>
    </div>
  );
};

export default Home;