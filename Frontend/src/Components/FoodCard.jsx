import React from 'react';
import { Star, Clock, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart, updateQuantity, getItemQuantity, setSelectedFoodForDetail } = useCart();
  const quantity = getItemQuantity(food.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-0.5">
      {/* Food Image Container */}
      <div 
        className="relative h-40 sm:h-44 overflow-hidden cursor-pointer bg-stone-100"
        onClick={() => setSelectedFoodForDetail(food)}
      >
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {/* FSSAI Veg / Non-Veg Indicator */}
          <div className="bg-white/95 backdrop-blur-md p-1 rounded shadow-2xs flex items-center justify-center">
            {food.isVeg ? (
              <div className="w-3.5 h-3.5 border-2 border-emerald-600 rounded-xs flex items-center justify-center p-0.5" title="Pure Vegetarian">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              </div>
            ) : (
              <div className="w-3.5 h-3.5 border-2 border-rose-600 rounded-xs flex items-center justify-center p-0.5" title="Non-Vegetarian">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
              </div>
            )}
          </div>

          {food.discountPercent && (
            <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs tracking-wider">
              {food.discountPercent}% OFF
            </span>
          )}

          {food.isPopular && !food.discountPercent && (
            <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs tracking-wider">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Prep Time Pill */}
        <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs border border-stone-100/80">
          <Clock className="w-3 h-3 text-orange-500" />
          {food.prepTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="capitalize font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md text-[10px]">
              {food.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{food.rating}</span>
              <span className="text-stone-400 font-normal text-[10px]">({food.reviews})</span>
            </div>
          </div>

          {/* Dish Title */}
          <h3 
            className="text-sm sm:text-base font-black text-stone-900 group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-1"
            onClick={() => setSelectedFoodForDetail(food)}
            title={food.name}
          >
            {food.name}
          </h3>

          {/* Quality Assurance Mention */}
          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50/70 border border-emerald-200/50 px-2 py-0.5 rounded-md w-fit">
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>100% Quality Assured • FSSAI Certified</span>
          </div>

          {/* Dish Description */}
          <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {food.description}
          </p>

          {/* Tags */}
          {food.tags && food.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {food.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Compact Add to Cart Action */}
        <div className="pt-2.5 mt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 block font-semibold uppercase tracking-wider">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-stone-900">
                ₹{food.price}
              </span>
              {food.originalPrice && (
                <span className="text-[11px] text-stone-400 line-through">
                  ₹{food.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Compact ADD button */}
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(food)}
              className="bg-white hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-500 font-extrabold text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <span>ADD</span>
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          ) : (
            <div className="flex items-center bg-orange-50 rounded-lg p-0.5 border border-orange-200">
              <button
                onClick={() => updateQuantity(food.id, -1)}
                className="w-5 h-5 rounded bg-white hover:bg-orange-500 hover:text-white text-stone-700 flex items-center justify-center transition shadow-2xs active:scale-90 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
              </button>
              <span className="w-5 text-center text-[11px] font-black text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(food.id, 1)}
                className="w-5 h-5 rounded bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition shadow-2xs active:scale-90 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
