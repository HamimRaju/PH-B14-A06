/* eslint-disable @next/next/no-img-element */
import React from "react";
import { pagetype } from "../types/workout";

export interface navbarprops {
    currentpage: pagetype;
    onnavigate: (page: pagetype) => void;
    planCount?: number;
    savedCount?: number;
}

export default function Navbar({
    currentpage,
    onnavigate,
    planCount = 0,
    savedCount = 0,
}: navbarprops) {
    return (
        <header className="bg-[#0e1117] border-b border-gray-800/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
                {/* Left: Brand Logo */}
                <div
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink-0"
                    onClick={() => onnavigate("home")}
                >
                    <img
                        src="/logo.png"
                        alt="FitLog Logo"
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        loading="eager"
                    />
                    <span className="font-black text-lg sm:text-2xl tracking-wider text-white uppercase">
                        FITLOG
                    </span>
                </div>

                {/* Center: Centered Navigation Pills */}
                <nav className="flex items-center bg-[#161a23] p-1 sm:p-1.5 rounded-full border border-gray-800/80">
                    <button
                        onClick={() => onnavigate("home")}
                        className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            currentpage === "home" || currentpage === "details"
                                ? "bg-[#1e2710] text-[#ccff00]"
                                : "text-gray-400 hover:text-white"
                        }`}>
                            
                        Workouts
                    </button>

                    <button
                        onClick={() => onnavigate("plan")}
                        className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            currentpage === "plan"
                                ? "bg-[#1e2710] text-[#ccff00]"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        My Plan
                    </button>
                </nav>

                {/* Right: Plan & Saved Counters */}
                <div className="flex items-center gap-2.5 sm:gap-6 shrink-0">
                    <div
                        onClick={() => onnavigate("plan")}
                        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-gray-300 text-xs sm:text-sm font-medium hover:text-white transition-colors"
                    >
                        <span className="hidden sm:inline">Plan</span>
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ccff00] text-black font-bold text-[10px] sm:text-xs flex items-center justify-center">
                            {planCount}
                        </span>
                    </div>

                    <div
                        onClick={() => onnavigate("plan")}
                        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-gray-300 text-xs sm:text-sm font-medium hover:text-white transition-colors"
                    >
                        <span className="hidden sm:inline">Saved</span>
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-700 text-gray-300 font-bold text-[10px] sm:text-xs flex items-center justify-center">
                            {savedCount}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}