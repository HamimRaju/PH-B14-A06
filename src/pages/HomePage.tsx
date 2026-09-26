/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { workout } from '../types/workout';

export interface homepageprops {
  workouts: workout[];
  onselectworkout: (workout: workout) => void;
}

export default function HomePage({ workouts = [], onselectworkout }: homepageprops) {
  return (
    <div className="space-y-10">
      <section className="bg-[#12161f] rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-xl space-y-4 z-10">
          <span className="text-xs font-bold text-[#ccff00] tracking-widest uppercase">
            Workout Library
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Train with intent. Log every set.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into todays plan, and watch the weeks work add up.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('library-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#ccff00] text-black hover:bg-[#b8e600] font-bold text-xs uppercase px-6 py-3 rounded-md transition-all shadow-lg"
          >
            Browse Workouts
          </button>
        </div>

        <div className="mt-8 md:mt-0 relative w-64 h-64 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full bg-linear-to-tr from-[#ccff00]/10 to-transparent absolute"></div>
          <img 
            src="https://placehold.co/400x400/000000/ccff00?text=Gym+Illustration" 
            alt="Hero Illustration" 
            className="object-contain w-full h-full relative z-10 filter drop-shadow-2xl"
          />
        </div>
      </section>

      <section id="library-section" className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wide">
            The Library
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts && workouts.length > 0 ? (
            workouts.map((item) => (
              <div 
                key={item.id}
                onClick={() => onselectworkout(item)}
                className="bg-[#12161f] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative h-48 bg-gray-900 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {item.category?.map((cat, i) => (
                      <span 
                        key={i} 
                        className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 flex flex-col grow justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-white text-base tracking-wide uppercase group-hover:text-[#ccff00] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.equipment}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800/80">
                    <span className="flex items-center gap-1">⏱ {item.duration} min</span>
                    <span className="flex items-center gap-1">🔥 {item.calories} kcal</span>
                    <span className="flex items-center gap-1 text-yellow-400 font-bold">★ {item.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No workouts found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}