import React from 'react';
import { Zap, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning 30-Min Delivery',
    description: 'Hot food delivered straight from our specialized kitchens to your doorstep without delay.',
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    icon: ShieldCheck,
    title: '100% Quality & Hygiene',
    description: 'Every kitchen follows strict food-safety protocols with regular microbial tests & organic sourcing.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    icon: MapPin,
    title: 'Live GPS Delivery Tracking',
    description: 'Track your driver in real-time from the kitchen counter until they arrive at your doorbell.',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    icon: HeartHandshake,
    title: 'Master Artisan Chefs',
    description: 'Recipes curated by seasoned chefs dedicated to true authenticity and unmatched gastronomic taste.',
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-block mb-2">
            Why Choose FastBite
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            We Deliver Experiences, Not Just Meals
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1.5">
            Designed for busy food lovers who value taste, promptness, and immaculate culinary freshness.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/70 hover:border-orange-200 hover:bg-orange-50/20 transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl ${f.bg} ${f.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-stone-900 mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
