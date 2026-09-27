/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { workout } from '../types/workout';

export interface myplanpageprops {
  planitems: workout[];
  saveditems: workout[];
  onremovefromplan: (id: string, tab: 'today' | 'saved') => void;
  ontogglecomplete: (id: string) => void;
  onselectworkout: (workout: workout) => void;
  ongotoworkouts: () => void;
}

export default function MyPlanPage({
  planitems = [],
  saveditems = [],
  onremovefromplan,
  ontogglecomplete,
  onselectworkout,
  ongotoworkouts
}: myplanpageprops) {
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  const rawList = activeTab === 'today' ? planitems : saveditems;

  const currentList = [...rawList].sort((a, b) => {
    if (sortBy === 'duration') {
      return Number(b.duration || 0) - Number(a.duration || 0);
    }
    if (sortBy === 'calories') {
      return Number(b.calories || 0) - Number(a.calories || 0);
    }
    if (sortBy === 'rating') {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }
    return 0;
  });

  const totalExercises = planitems.length;
  const totalMinutes = planitems.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const totalCalories = planitems.reduce((sum, item) => sum + Number(item.calories || 0), 0);

  return (
    <div className="py-6 max-w-7xl mx-auto space-y-8">
      
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">
          MY PLAN
        </h1>
        <p className="text-sm text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#121620] border border-gray-800/80 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-800/80">
        
        <div className="space-y-1">
          <span className="text-xs font-semibold text-gray-400">Exercises</span>
          <p className="text-4xl font-black text-[#ccff00]">
            {totalExercises}
          </p>
        </div>

        <div className="space-y-1 md:pl-8 pt-4 md:pt-0">
          <span className="text-xs font-semibold text-gray-400">Minutes</span>
          <p className="text-4xl font-black text-white">
            {totalMinutes}
          </p>
        </div>

        <div className="space-y-1 md:pl-8 pt-4 md:pt-0">
          <span className="text-xs font-semibold text-gray-400">Calories</span>
          <p className="text-4xl font-black text-white">
            {totalCalories}
          </p>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        <div className="flex bg-[#121620] p-1.5 rounded-2xl border border-gray-800/80">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-[#1e2710] text-[#ccff00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Todays Plan
          </button>
          
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#1e2710] text-[#ccff00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
              className="bg-[#121620] border border-gray-800/80 text-white text-xs font-medium rounded-xl px-4 py-2 pr-8 appearance-none focus:outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {currentList.length === 0 ? (
        
        <div className="border border-dashed border-gray-800 rounded-3xl p-16 md:p-24 text-center space-y-4 bg-[#0d1017]/50">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            NOTHING HERE YET
          </h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <button
              onClick={ongotoworkouts}
              className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#b8e600] transition-all shadow-md"
            >
              Go to workouts
            </button>
          </div>
        </div>

      ) : (

        <div className="space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className={`bg-[#121620] border rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                item.completed && activeTab === 'today'
                  ? 'border-gray-800/60 opacity-60'
                  : 'border-gray-800/80 hover:border-gray-700/80'
              }`}
            >
              <div className="flex items-center gap-5 flex-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-20 rounded-xl object-cover bg-gray-900 shrink-0"
                />
                
                <div className="space-y-1">
                  <h3 className={`font-black uppercase text-white text-lg tracking-wide ${item.completed && activeTab === 'today' ? 'line-through text-gray-400' : ''}`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 font-medium">
                    {item.equipment}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-300 pt-1">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-1.048c-2.5 1.25-5.32 4.743-5.32 8.495 0 3.866 3.082 7 6.875 7 3.793 0 6.875-3.134 6.875-7 0-2.222-1.045-4.475-2.612-5.918a1 1 0 00-1.393 1.393c1.077 1.002 1.63 2.378 1.63 3.525 0 2.485-1.931 4.5-4.375 4.5-2.444 0-4.375-2.015-4.375-4.5 0-2.585 2.122-5.305 3.99-6.402a1 1 0 001.185.055z" clipRule="evenodd" />
                      </svg>
                      {item.calories} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0">
                <button
                  onClick={() => onselectworkout(item)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-300 bg-[#171d2a] border border-gray-700/60 hover:bg-gray-800 transition-all uppercase"
                >
                  View Details
                </button>

                {activeTab === 'today' && (
                  <button
                    onClick={() => ontogglecomplete(item.id)}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      item.completed
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                        : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {item.completed ? 'Completed' : 'Mark as Done'}
                  </button>
                )}

                <button
                  onClick={() => onremovefromplan(item.id, activeTab)}
                  className="p-2.5 text-gray-400 hover:text-white transition-all rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      )}

    </div>
  );
}