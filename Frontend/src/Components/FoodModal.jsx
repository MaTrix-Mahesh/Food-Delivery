import React from 'react';
import { X, Star, Clock, Flame, ShieldCheck, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodModal = () => {
  const { selectedFoodForDetail, setSelectedFoodForDetail, addToCart, getItemQuantity, updateQuantity } = useCart();

  if (!selectedFoodForDetail) return null;

  const food = selectedFoodForDetail;
  const quantity = getItemQuantity(food.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedFoodForDetail(null)}
          className="absolute top-4 right-4 z-10 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-100 shrink-0">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${food.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                {food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase">
                {food.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">{food.name}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100 text-center text-xs">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 font-bold text-amber-500 text-sm">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                {food.rating}
              </span>
              <span className="text-stone-400 mt-0.5">{food.reviews} reviews</span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-stone-200">
              <span className="flex items-center gap-1 font-bold text-stone-700 text-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                {food.prepTime}
              </span>
              <span className="text-stone-400 mt-0.5">Cook Time</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 font-bold text-rose-500 text-sm">
                <Flame className="w-4 h-4" />
                {food.calories} kcal
              </span>
              <span className="text-stone-400 mt-0.5">Energy</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
              Description & Ingredients
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              {food.description}
            </p>
          </div>

          {/* Dietary Highlights */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Quality Assurance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-50/60 border border-orange-100">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Prepared with fresh, hand-picked ingredients</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hygienic prep in certified cloud kitchens</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Total Price</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">
                ₹{food.price}
              </span>
              {food.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ₹{food.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {quantity > 0 && (
              <div className="flex items-center bg-white rounded-2xl p-1.5 border border-stone-200 shadow-xs">
                <button
                  onClick={() => updateQuantity(food.id, -1)}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(food.id, 1)}
                  className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                addToCart(food);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{quantity > 0 ? 'Add Another' : 'Add to Order'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
