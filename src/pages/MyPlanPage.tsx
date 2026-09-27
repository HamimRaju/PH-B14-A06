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
 
  const [sortBy, setSortBy] = useState<'default' | 'duration' | 'calories' | 'rating'>('default');

  const rawList = activeTab === 'today' ? planitems : saveditems;

  const parseNumericValue = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    const extracted = String(value).replace(/[^0-9.]/g, '');
    return parseFloat(extracted) || 0;
  };

  // Sorting logic (Default sequence vs Ascending order)
  const currentList = [...rawList].sort((a, b) => {
    if (sortBy === 'duration') {
      return parseNumericValue(a.duration) - parseNumericValue(b.duration);
    }
    if (sortBy === 'calories') {
      return parseNumericValue(a.calories) - parseNumericValue(b.calories);
    }
    if (sortBy === 'rating') {
      return parseNumericValue(a.rating) - parseNumericValue(b.rating);
    }
    return 0; // 'default' sequence e array order preserve hobe
  });

  // Calculate totals for active tab items
  const activeItems = activeTab === 'today' ? planitems : saveditems;
  const totalExercises = activeItems.length;
  const totalMinutes = activeItems.reduce((sum, item) => sum + parseNumericValue(item.duration), 0);
  const totalCalories = activeItems.reduce((sum, item) => sum + parseNumericValue(item.calories), 0);

  return (
    <div className="py-4 sm:py-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn px-1 sm:px-0">
      
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
          MY PLAN
        </h1>
        <p className="text-xs md:text-sm text-gray-400">
          Track your workout plan and manage saved exercises.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="bg-[#121620] border border-gray-800/80 rounded-2xl p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-800/80">
        <div className="space-y-1 pb-3 sm:pb-0">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {activeTab === 'today' ? "Today's Exercises" : "Saved Exercises"}
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#ccff00]">
            {totalExercises}
          </p>
        </div>

        <div className="space-y-1 pt-3 sm:pt-0 sm:pl-6 md:pl-8">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Duration</span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {totalMinutes} <span className="text-xs sm:text-sm font-medium text-gray-400">min</span>
          </p>
        </div>

        <div className="space-y-1 pt-3 sm:pt-0 sm:pl-6 md:pl-8">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Burned Calories</span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {totalCalories} <span className="text-xs sm:text-sm font-medium text-gray-400">kcal</span>
          </p>
        </div>
      </div>

      {/* Navigation Tabs and Sorting Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex bg-[#121620] p-1.5 rounded-2xl border border-gray-800/80 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 sm:flex-none px-3 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === 'today'
                ? 'bg-[#1e2710] text-[#ccff00] border border-[#ccff00]/30 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Todays Plan ({planitems.length})
          </button>
          
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 sm:flex-none px-3 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#1e2710] text-[#ccff00] border border-[#ccff00]/30 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved Workouts ({saveditems.length})
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase shrink-0">Sort By:</span>
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'duration' | 'calories' | 'rating')}
              className="w-full sm:w-auto bg-[#121620] border border-gray-800/80 text-white text-xs font-medium rounded-xl px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-[#ccff00]/50 cursor-pointer"
            >
              <option value="default">Default Order (Added First)</option>
              <option value="duration">Duration (Low to High)</option>
              <option value="calories">Calories (Low to High)</option>
              <option value="rating">Rating (Low to High)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Items List or Empty State */}
      {currentList.length === 0 ? (
        <div className="border border-dashed border-gray-800 rounded-3xl p-8 sm:p-12 md:p-20 text-center space-y-4 bg-[#0d1017]/50">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            NO EXERCISES IN {activeTab === 'today' ? "TODAY'S PLAN" : "SAVED LIST"}
          </h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {activeTab === 'today'
              ? "Your plan is currently empty. Explore workouts to add exercises for today."
              : "You haven't saved any workouts yet. Bookmark workouts to quickly access them later."}
          </p>
          <div className="pt-2">
            <button
              onClick={ongotoworkouts}
              className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-[#b8e600] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Browse Workouts
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className={`bg-[#121620] border rounded-2xl p-3.5 sm:p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                item.completed && activeTab === 'today'
                  ? 'border-green-500/30 bg-[#121620]/60 opacity-75'
                  : 'border-gray-800/80 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-1 w-full md:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 sm:w-28 sm:h-20 rounded-xl object-cover bg-gray-900 shrink-0"
                />
                
                <div className="space-y-1">
                  <h3 className={`font-black uppercase text-white text-sm sm:text-base md:text-lg tracking-wide ${item.completed && activeTab === 'today' ? 'line-through text-gray-400' : ''}`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
                    {item.equipment || item.category || 'General Equipment'}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-semibold text-gray-300 pt-1">
                    <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.duration} min
                    </span>

                    <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-1.048c-2.5 1.25-5.32 4.743-5.32 8.495 0 3.866 3.082 7 6.875 7 3.793 0 6.875-3.134 6.875-7 0-2.222-1.045-4.475-2.612-5.918a1 1 0 00-1.393 1.393c1.077 1.002 1.63 2.378 1.63 3.525 0 2.485-1.931 4.5-4.375 4.5-2.444 0-4.375-2.015-4.375-4.5 0-2.585 2.122-5.305 3.99-6.402a1 1 0 001.185.055z" clipRule="evenodd" />
                      </svg>
                      {item.calories} kcal
                    </span>

                    <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <svg className="w-3.5 h-3.5 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-gray-800/60 pt-3 md:pt-0">
                <button
                  onClick={() => onselectworkout(item)}
                  className="flex-1 md:flex-none px-3.5 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold text-gray-300 bg-[#171d2a] border border-gray-700/60 hover:bg-gray-800 transition-all uppercase cursor-pointer active:scale-95 text-center"
                >
                  View Details
                </button>

                {activeTab === 'today' && (
                  <button
                    onClick={() => ontogglecomplete(item.id)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold uppercase transition-all cursor-pointer active:scale-95 ${
                      item.completed
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                        : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item.completed ? 'Completed' : 'Mark as Done'}</span>
                  </button>
                )}

                <button
                  onClick={() => onremovefromplan(item.id, activeTab)}
                  title="Remove"
                  className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-xl border border-transparent hover:border-red-500/20 cursor-pointer active:scale-95 shrink-0"
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