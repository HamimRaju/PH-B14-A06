/* eslint-disable @next/next/no-img-element */
import React from "react";
import { workout } from "../types/workout";

export interface homepageprops {
    workouts: workout[];
    onselectworkout: (workout: workout) => void;
}

export default function HomePage({
    workouts = [],
    onselectworkout,
}: homepageprops) {
    return (
        <div className="space-y-10">
            {/* Hero Section */}
            <section className="bg-[#12161f] rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="max-w-xl space-y-4 z-10">
                    <span className="text-xs font-bold text-[#ccff00] tracking-widest uppercase">
                        Workout Library
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                        Train with intent. Log every set.
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        FitLog is a dark, no-nonsense gym companion: pick a
                        lift, lock it into todays plan, and watch the weeks
                        work add up.
                    </p>
                    <button
                        onClick={() => {
                            const el =
                                document.getElementById("library-section");
                            el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-[#ccff00] text-black hover:bg-[#b8e600] font-bold text-xs uppercase px-6 py-3 rounded-md transition-all shadow-lg"
                    >
                        Browse Workouts
                    </button>
                </div>

                {/* Hero Illustration */}
                <div className="flex-1 relative flex justify-center items-center w-full max-w-md">
                    <div className="absolute w-72 h-72 bg-[#ccff00]/10 rounded-full blur-3xl -z-10 animate-pulse" />
                    <img
                        src="/banner.png"
                        alt="Gym Illustration"
                        className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(204,255,0,0.15)] relative z-10"
                        loading="eager"
                    />
                </div>
            </section>

            {/* Library Cards Section */}
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
                                className="bg-[#12161f] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-700 transition-all cursor-pointer flex flex-col group shadow-lg"
                            >
                                {/* Image Section */}
                                <div className="relative w-full h-52 bg-gray-900 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col grow justify-between space-y-5">
                                    <div className="space-y-3">
                                        {/* Category Badges */}
                                        <div className="flex gap-2 flex-wrap">
                                            {item.category?.map((cat, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-[#ccff00] text-black text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title & Equipment */}
                                        <div>
                                            <h3 className="font-black text-white text-xl tracking-tight uppercase group-hover:text-[#ccff00] transition-colors leading-snug">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium mt-1">
                                                {item.equipment}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Stats Row */}
                                    <div className="flex items-center justify-start gap-5 text-xs text-gray-400 pt-4 border-t border-gray-800/80">
                                        <span className="flex items-center gap-1.5 font-medium">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    d="M12 6v6l4 2"
                                                />
                                            </svg>
                                            {item.duration} min
                                        </span>

                                        <span className="flex items-center gap-1.5 font-medium">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.316.492-.627 1.053-.942 1.631-.62 1.137-1.22 2.23-1.88 3.011-.27.321-.6.61-.986.837a4.965 4.965 0 01-2.03.65 1 1 0 00-.73.916 5.82 5.82 0 00.12 1.623c.27 1.488 1.18 2.82 2.37 3.63a7.33 7.33 0 004.14 1.258c2.05 0 4.02-.78 5.48-2.18a7.28 7.28 0 002.04-4.88c0-1.78-.65-3.48-1.84-4.78a8.3 8.3 0 00-3.47-2.31z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {item.calories} kcal
                                        </span>

                                        <span className="flex items-center gap-1.5 font-medium">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                />
                                            </svg>
                                            {item.rating}
                                        </span>
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
