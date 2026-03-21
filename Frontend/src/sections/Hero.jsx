import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
            FASTEST DELIVERY IN TOWN 🚀
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mt-6">
            Everything is better <br /> 
            with a <span className="text-orange-600">Pizza.</span>
          </h1>
          <p className="text-gray-500 text-lg mt-6 max-w-md leading-relaxed">
            Experience the authentic taste of Italy with our wood-fired pizzas, 
            made with hand-picked organic ingredients.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl">
              Order Now
            </button>
            <button className="flex items-center justify-center gap-2 font-bold text-gray-700 px-10 py-4 rounded-2xl border-2 border-gray-100 hover:bg-gray-50 transition">
              Learn More →
            </button>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="relative">
          <div className="absolute -z-10 bg-orange-200 w-72 h-72 rounded-full blur-3xl opacity-30 top-10 right-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000" 
            alt="Hero Pizza" 
            className="rounded-[2.5rem] shadow-2xl hover:rotate-2 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;