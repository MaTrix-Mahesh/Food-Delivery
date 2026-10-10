import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';

const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, setUser } = useCart();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: isLoginTab ? (email.split('@')[0] || 'Alex Foodie') : (name || 'New Gourmet'),
      email: email || 'foodie@fastbite.com',
      isLoggedIn: true,
    });
    try {
      localStorage.setItem('fastbite_user', JSON.stringify({
        name: isLoginTab ? (email.split('@')[0] || 'Alex Foodie') : (name || 'New Gourmet'),
        email: email || 'foodie@fastbite.com',
        isLoggedIn: true,
      }));
    } catch {
      // ignore
    }
    setIsAuthOpen(false);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      isLoggedIn: true,
    };
    setUser(demoUser);
    try {
      localStorage.setItem('fastbite_user', JSON.stringify(demoUser));
    } catch {
      // ignore
    }
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="p-6 pb-2 text-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-stone-900">
            {isLoginTab ? 'Welcome Back!' : 'Join FastBite'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Unlock exclusive member discounts & free delivery
          </p>

          <div className="flex bg-stone-100 p-1 rounded-2xl mt-5">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                isLoginTab ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                !isLoginTab ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginTab && (
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-orange-500/20 active:scale-95 transition"
          >
            {isLoginTab ? 'Sign In to Account' : 'Create Free Account'}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="grow border-t border-stone-200"></div>
            <span className="shrink mx-3 text-[11px] text-stone-400 font-medium">Or</span>
            <div className="grow border-t border-stone-200"></div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Quick 1-Click Demo Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
