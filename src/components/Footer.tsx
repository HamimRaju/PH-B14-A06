import React from "react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#0b0e14] border-t border-gray-800/60 text-gray-500 py-6 px-6 text-xs mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Logo & Title */}
                <div className="flex items-center gap-2.5 font-bold text-gray-300">
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                        priority
                    />
                    <span className="tracking-wider uppercase text-sm font-black text-white">
                        FIT<span className="text-[#ccff00]">LOG</span>
                    </span>
                </div>

                {/* Copyright Text */}
                <div className="text-center sm:text-right text-gray-400">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </div>
            </div>
        </footer>
    );
}
