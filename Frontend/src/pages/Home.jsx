import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';

const Home = () => {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <Hero />
      {/* Aage yahan FoodCards aur Footer ayenge */}
    </main>
  );
};

export default Home;