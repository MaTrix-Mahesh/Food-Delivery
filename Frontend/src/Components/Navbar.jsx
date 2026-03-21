import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <h1 className="text-2xl font-black text-orange-600 tracking-tighter">
          FAST<span className="text-gray-800">BITE</span>
        </h1>
        
        <ul className="hidden md:flex space-x-10 text-gray-700 font-medium">
          <li className="hover:text-orange-600 cursor-pointer transition">Home</li>
          <li className="hover:text-orange-600 cursor-pointer transition">Menu</li>
          <li className="hover:text-orange-600 cursor-pointer transition">Offers</li>
          <li className="hover:text-orange-600 cursor-pointer transition">Contact</li>
        </ul>

        <div className="flex items-center space-x-4">
          <button className="text-gray-700 font-semibold px-4">Login</button>
          <button className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all active:scale-95">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;