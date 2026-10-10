import React, { useState, useMemo } from 'react';
import { X, Star, Clock, Flame, ShieldCheck, Plus, Minus, ShoppingBag, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodModal = () => {
  const { selectedFoodForDetail, setSelectedFoodForDetail, addToCart, getItemQuantity, updateQuantity } = useCart();

  // Local state for interactive options
  const [selectedPortion, setSelectedPortion] = useState('regular'); // 'regular' | 'jumbo'
  const [selectedSpice, setSelectedSpice] = useState('medium'); // 'mild' | 'medium' | 'spicy'
  const [selectedAddons, setSelectedAddons] = useState([]); // array of addon ids
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedFoodForDetail) return null;

  const food = selectedFoodForDetail;
  const isDrinkOrDessert = food.category === 'dessert' || food.category === 'beverages';

  const portionOptions = [
    { id: 'regular', name: 'Regular Portion', subtitle: 'Serves 1 foodie', extraPrice: 0 },
    { id: 'jumbo', name: isDrinkOrDessert ? 'Large Size' : 'Jumbo Feast', subtitle: 'Serves 2 foodies', extraPrice: isDrinkOrDessert ? 40 : 80 }
  ];

  const addonOptions = [
    { id: 'dip', name: isDrinkOrDessert ? 'Extra Belgian Choco Drizzle' : 'Extra Burani Raita & Mint Dip', price: 25 },
    { id: 'side', name: isDrinkOrDessert ? 'Vanilla Scoop Add-On' : 'Crispy Roasted Papad & Salad', price: 35 },
    { id: 'drink', name: isDrinkOrDessert ? 'Crushed Dry Fruit Topping' : 'Chilled Cold Drink Can (250ml)', price: 45 }
  ];

  const spiceOptions = [
    { id: 'mild', label: 'Mild', icon: '🟢' },
    { id: 'medium', label: 'Medium', icon: '🟡' },
    { id: 'spicy', label: 'Spicy', icon: '🌶️' }
  ];

  const handleToggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Compute final price with selected options
  const portionExtra = portionOptions.find((p) => p.id === selectedPortion)?.extraPrice || 0;
  const addonsExtra = selectedAddons.reduce((sum, id) => {
    const item = addonOptions.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = food.price + portionExtra + addonsExtra;
  const quantity = getItemQuantity(food.id);

  const handleAddToCartWithOptions = () => {
    const portionObj = portionOptions.find((p) => p.id === selectedPortion);
    const addonsList = selectedAddons.map((id) => addonOptions.find((a) => a.id === id)?.name).filter(Boolean);
    
    addToCart(food, {
      portion: portionObj?.name,
      totalPrice: totalPrice,
      spiceLevel: !isDrinkOrDessert ? selectedSpice : undefined,
      addOns: addonsList,
      optionsSummary: `${portionObj?.name}${addonsList.length > 0 ? ` + ${addonsList.length} Addons` : ''}`
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedFoodForDetail(null);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={() => setSelectedFoodForDetail(null)}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedFoodForDetail(null)}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 hover:bg-black/75 text-white rounded-full backdrop-blur-md flex items-center justify-center transition active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Banner Image */}
        <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-stone-100 shrink-0">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent"></div>

          <div className="absolute bottom-2.5 left-4 right-4 sm:left-5 sm:right-5 text-white">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                {food.isVeg ? 'Pure Veg' : 'Non-Veg'}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {food.category}
              </span>
              {food.discountPercent && (
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                  {food.discountPercent}% OFF
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl font-black leading-tight drop-shadow-sm">{food.name}</h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-stone-700">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 text-center text-xs">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 font-bold text-amber-500 text-xs sm:text-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                {food.rating}
              </span>
              <span className="text-stone-400 text-[10px] mt-0.5">({food.reviews} ratings)</span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-stone-200">
              <span className="flex items-center gap-1 font-bold text-stone-700 text-xs sm:text-sm">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {food.prepTime}
              </span>
              <span className="text-stone-400 text-[10px] mt-0.5">Cook Time</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 font-bold text-rose-500 text-xs sm:text-sm">
                <Flame className="w-3.5 h-3.5" />
                {food.calories} kcal
              </span>
              <span className="text-stone-400 text-[10px] mt-0.5">Energy</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-stone-50/60 p-3 rounded-xl border border-stone-100">
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>Dish Details & Preparation</span>
            </h4>
            <p className="text-stone-600 text-xs leading-relaxed">
              {food.description}
            </p>
          </div>

          {/* OPTION 1: Serving Portion Size */}
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>1. Choose Portion Size</span>
              <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">Required</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {portionOptions.map((portion) => {
                const isSelected = selectedPortion === portion.id;
                return (
                  <button
                    key={portion.id}
                    type="button"
                    onClick={() => setSelectedPortion(portion.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/50 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{portion.name}</span>
                      <span className="text-xs font-black text-orange-600">
                        {portion.extraPrice > 0 ? `+₹${portion.extraPrice}` : 'Included'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-0.5">{portion.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* OPTION 2: Spice Level or Sweetness Preference */}
          {!isDrinkOrDessert ? (
            <div>
              <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>2. Customize Spice Level</span>
                <span className="text-[10px] text-stone-400 font-medium">Chef's Choice</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {spiceOptions.map((spice) => {
                  const isSelected = selectedSpice === spice.id;
                  return (
                    <button
                      key={spice.id}
                      type="button"
                      onClick={() => setSelectedSpice(spice.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 text-orange-800 font-black shadow-2xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700 font-bold text-xs'
                      }`}
                    >
                      <span>{spice.icon}</span>
                      <span className="text-xs">{spice.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* OPTION 3: Add-on Pairings */}
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{isDrinkOrDessert ? '2. Delicious Add-ons' : '3. Recommended Sides & Dips'}</span>
              <span className="text-[10px] text-stone-400 font-medium">Optional</span>
            </h4>
            <div className="space-y-1.5">
              {addonOptions.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/40'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-3.5 h-3.5 accent-orange-500 rounded cursor-pointer"
                      />
                      <span className="text-xs font-bold text-stone-800">{addon.name}</span>
                    </div>
                    <span className="text-xs font-black text-stone-700">+₹{addon.price}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* DEDICATED QUALITY ASSURANCE SECTION */}
          <div className="p-3.5 rounded-xl bg-linear-to-br from-emerald-50/80 to-teal-50/60 border border-emerald-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Quality Assurance & Food Safety Standards
                </h4>
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-white/80 border border-emerald-200 px-2 py-0.5 rounded-full">
                FSSAI Certified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-950">
              <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>100% Farm-Fresh:</strong> Prepared with fresh produce & pure desi ghee, zero chemicals.</span>
              </div>
              <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sanitized Kitchen:</strong> Daily microbial sanitization and certified food safety audits.</span>
              </div>
              <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chef Verified:</strong> Prepared fresh strictly after order confirmation.</span>
              </div>
              <div className="flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tamper-Proof Seal:</strong> Sealed hot in food-grade, spill-proof eco containers.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Price Breakdown and Compact Add to Cart Button */}
        <div className="p-3 sm:p-4 border-t border-stone-200/80 bg-stone-50 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
              <span>Calculated Price</span>
              {(portionExtra > 0 || addonsExtra > 0) && (
                <span className="text-orange-600 font-bold">(+₹{portionExtra + addonsExtra} customizations)</span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-stone-900">
                ₹{totalPrice}
              </span>
              {food.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{food.originalPrice + portionExtra + addonsExtra}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Compact Add to Cart Button */}
            <button
              onClick={handleAddToCartWithOptions}
              className={`bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer ${
                addedAnimation ? 'bg-emerald-600 scale-98' : ''
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{addedAnimation ? 'Added to Cart ✓' : `Add to Cart (₹${totalPrice})`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
