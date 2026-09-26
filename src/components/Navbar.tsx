/* eslint-disable @next/next/no-img-element */
import React from "react";
import { pagetype } from "../types/workout";

export interface navbarprops {
    currentpage: pagetype;
    onnavigate: (page: pagetype) => void;
}

export default function Navbar({ currentpage, onnavigate }: navbarprops) {
    return (
        <header className="bg-[#12161f] border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => onnavigate("home")}
                >
                    <img
                        src="/logo.png"
                        alt="FitLog Logo"
                        className="w-8 h-8 object-contain"
                        loading="eager"
                    />
                    <span className="font-black text-xl tracking-wider text-white uppercase">
                        FIT<span className="text-[#ccff00]">LOG</span>
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-2">
                    <button
                        onClick={() => onnavigate("home")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            currentpage === "home"
                                ? "bg-[#ccff00] text-black shadow-md"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                    >
                        Workouts
                    </button>

                    <button
                        onClick={() => onnavigate("plan")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            currentpage === "plan"
                                ? "bg-[#ccff00] text-black shadow-md"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                    >
                        My Plan
                    </button>
                </nav>
            </div>
        </header>
    );
}
