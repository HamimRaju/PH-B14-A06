import React from "react";
import { pagetype } from "../types/workout";

interface navbarprops {
    activepage: pagetype;
    setactivepage: (page: pagetype) => void;
    plancount: number;
    savedcount: number;
}

export default function Navbar({
    activepage,
    setactivepage,
    plancount,
    savedcount,
}: navbarprops) {
    return (
        <header className="bg-[#0b0e14] border-b border-gray-800 text-white px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div
                    onClick={() => setactivepage("home")}
                    className="flex items-center gap-2 cursor-pointer text-xl font-extrabold tracking-wider"
                >
                    <span className="text-[#ccff00] text-2xl">🏋️</span>
                    <span>FITLOG</span>
                </div>

                <nav className="flex items-center gap-6">
                    <button
                        onClick={() => setactivepage("home")}
                        className={`text-sm font-semibold transition-colors ${
                            activepage === "home" || activepage === "details"
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Workouts
                    </button>

                    <button
                        onClick={() => setactivepage("plan")}
                        className={`text-sm font-semibold px-3 py-1.5 rounded-full transition-colors ${
                            activepage === "plan"
                                ? "bg-gray-800 text-[#ccff00]"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        My Plan
                    </button>
                </nav>

                <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full text-gray-300">
                        Plan{" "}
                        <span className="bg-[#ccff00] text-black w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                            {plancount}
                        </span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full text-gray-300">
                        Saved{" "}
                        <span className="bg-gray-700 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                            {savedcount}
                        </span>
                    </span>
                </div>
            </div>
        </header>
    );
}
