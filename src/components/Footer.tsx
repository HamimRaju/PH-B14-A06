import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#0b0e14] border-t border-gray-800/60 text-gray-500 py-6 px-6 text-xs mt-auto">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-gray-300">
                    <span className="text-[#ccff00]">🏋️</span> FITLOG
                </div>
                <div>
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </div>
            </div>
        </footer>
    );
}
