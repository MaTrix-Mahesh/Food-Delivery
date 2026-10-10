import React from 'react';
import { Zap, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning 30-Min Delivery',
    description: 'Hot food delivered straight from specialized cloud kitchens to your doorstep without delay.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    badge: 'Express'
  },
  {
    icon: ShieldCheck,
    title: '100% Quality Assurance',
    description: 'FSSAI certified kitchens, strict microbial tests, tamper-proof seals & organic sourcing.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    badge: 'FSSAI Certified'
  },
  {
    icon: MapPin,
    title: 'Live GPS Delivery Tracking',
    description: 'Track your delivery partner in real-time on live map from kitchen to your doorstep.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    badge: 'Real-Time'
  },
  {
    icon: HeartHandshake,
    title: 'Master Artisan Chefs',
    description: 'Recipes handcrafted by seasoned chefs with pure desi ghee and authentic spices.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    badge: 'Authentic'
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
                className="p-4 sm:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/70 hover:border-orange-200 hover:bg-orange-50/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${f.bg} ${f.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {f.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600 shadow-2xs">
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
