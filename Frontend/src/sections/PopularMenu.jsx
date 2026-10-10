import React, { useState, useMemo } from 'react';
import { Search, UtensilsCrossed, Sparkles } from 'lucide-react';
import { categories, foodItems } from '../data/foodData';
import FoodCard from '../Components/FoodCard';

const PopularMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // all, veg, non-veg
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating

  const filteredFoods = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
      let matchesDiet = true;
      if (dietFilter === 'veg') matchesDiet = item.isVeg;
      if (dietFilter === 'non-veg') matchesDiet = !item.isVeg;

      return matchesCategory && matchesSearch && matchesDiet;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, dietFilter, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietFilter('all');
    setSortBy('popular');
  };

  const currentCatObj = categories.find((c) => c.id === selectedCategory);

  return (
    <section id="menu" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
          Our Curated Menu
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
          Explore Handcrafted Flavors
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm mt-1.5">
          Made fresh to order with locally sourced farm produce, pure desi ghee, premium cheeses, and authentic secret spices.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-stone-200/80 shadow-2xs mb-6 space-y-3">
        {/* Top row: Search input, Diet filter & Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search biryani, pizza, burger, momos, pasta, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-12 py-2 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick controls: Diet filter & Sort */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 3-Way Diet Pill */}
            <div className="flex bg-stone-100 p-0.5 rounded-xl text-xs font-bold">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition text-xs ${dietFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs font-black' : 'text-stone-500 hover:text-stone-800'}`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 text-xs ${dietFilter === 'veg' ? 'bg-emerald-600 text-white shadow-2xs font-black' : 'text-stone-500 hover:text-stone-800'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                <span>Veg</span>
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 text-xs ${dietFilter === 'non-veg' ? 'bg-rose-600 text-white shadow-2xs font-black' : 'text-stone-500 hover:text-stone-800'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-300"></span>
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-xl px-2.5 py-1.5 pr-7 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated ⭐</option>
                <option value="price-asc">Price: Low to High (₹)</option>
                <option value="price-desc">Price: High to Low (₹)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1.5 border-t border-stone-100">
          <span>
            Showing <strong className="text-stone-800">{filteredFoods.length}</strong> items in{' '}
            <strong className="text-orange-600">{currentCatObj?.name || 'All'}</strong>
          </span>
          {(searchQuery || dietFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-orange-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Dishes */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="bg-stone-50 rounded-3xl p-12 text-center border border-dashed border-stone-300 max-w-md mx-auto my-12">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-black text-stone-800">No dishes found</h3>
          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
            We couldn't find any dishes matching your current search or dietary filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default PopularMenu;
