import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: 'Ananya Deshmukh',
    role: 'Food Blogger & Connoisseur',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    dish: 'Hyderabadi Dum Chicken Biryani',
    comment: 'The aroma when opening the clay pot seal was unreal! Long basmati grains, tender chicken infused with saffron and desi ghee. Reached hot in 24 minutes in Mumbai rain!'
  },
  {
    name: 'Rohan Mehra',
    role: 'Software Architect & Weekend Foodie',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    dish: 'Double Smash Lamb Burger',
    comment: 'Hands down the juiciest burger in the city. The black garlic truffle aioli and brioche are heavenly. Easy UPI checkout and real-time live map tracking!'
  },
  {
    name: 'Pooja Iyer',
    role: 'Nutrition & Lifestyle Coach',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    dish: 'Paneer Makhani Feast Pizza',
    comment: 'Love the authentic fresh ingredients. The wood-fired sourdough crust was crispy yet pillowy with generous paneer and cheese. FastBite is our family ritual now!'
  }
];

const Testimonials = () => {
  return (
    <section id="reviews" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
            Customer Love
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            Loved By Over 50,000+ Food Lovers
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1.5">
            Read what our food connoisseurs and everyday gourmets have to say about our fast delivery and cuisine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/70 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(r.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-orange-200" />
                </div>

                <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed mb-4">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2.5">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">{r.name}</h4>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-[10px] text-stone-400 block">{r.role}</span>
                  <span className="text-[10px] font-semibold text-orange-600">Loved: {r.dish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
