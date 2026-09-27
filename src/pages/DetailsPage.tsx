/* eslint-disable @next/next/no-img-element */
import React from "react";
import { workout } from "../types/workout";

export interface detailspageprops {
    workout: workout;
    planitems: workout[];
    saveditems: workout[];
    onaddtoplan: (item: workout) => void;
    ontogglesave: (item: workout) => void;
    onback: () => void;
}

export default function DetailsPage({
    workout,
    planitems,
    saveditems,
    onaddtoplan,
    ontogglesave,
    onback,
}: detailspageprops) {
    // Static Prerendering-er somoy workout missing thakle build crash rodh korar guard clause
    if (!workout) {
        return null;
    }

    const isInPlan = planitems?.some((item) => item?.id === workout?.id) ?? false;
    const isSaved = saveditems?.some((item) => item?.id === workout?.id) ?? false;

    return (
        <div className="py-6 max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={onback}
                className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Image Card */}
                <div className="lg:col-span-6">
                    <div className="w-full h-145 rounded-3xl overflow-hidden bg-[#12161f] border border-gray-800/60 shadow-2xl">
                        <img
                            src={workout?.image}
                            alt={workout?.title || "Workout"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Column: Workout Details */}
                <div className="lg:col-span-6 space-y-6">
                    {/* Header & Description */}
                    <div className="space-y-3">
                        <h1 className="text-4xl font-black text-white tracking-tight uppercase leading-none">
                            {workout?.title}
                        </h1>
                        <p className="text-gray-400 text-sm leading-relaxed font-normal">
                            {workout?.description ||
                                "A compound exercise designed to build upper body strength and muscle."}
                        </p>
                    </div>

                    {/* Category Badges */}
                    <div className="flex gap-2.5 flex-wrap">
                        {workout?.category?.map((cat, i) => (
                            <span
                                key={i}
                                className="bg-[#ccff00] text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Specifications Table */}
                    <div className="bg-[#121620]/80 border border-gray-800/80 rounded-2xl overflow-hidden text-sm divide-y divide-gray-800/60">
                        <div className="flex justify-between items-center px-5 py-3.5">
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                EQUIPMENT
                            </span>
                            <span className="text-white font-medium">
                                {workout?.equipment}
                            </span>
                        </div>

                        {workout?.difficulty && (
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                    DIFFICULTY
                                </span>
                                <span className="text-white font-medium">
                                    {workout.difficulty}
                                </span>
                            </div>
                        )}

                        {workout?.sets && (
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                    SETS
                                </span>
                                <span className="text-white font-medium">
                                    {workout.sets}
                                </span>
                            </div>
                        )}

                        {workout?.reps && (
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                    REPS
                                </span>
                                <span className="text-white font-medium">
                                    {workout.reps}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between items-center px-5 py-3.5">
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                DURATION
                            </span>
                            <span className="text-white font-medium">
                                {workout?.duration} min
                            </span>
                        </div>

                        <div className="flex justify-between items-center px-5 py-3.5">
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                CALORIES
                            </span>
                            <span className="text-white font-medium">
                                {workout?.calories} kcal
                            </span>
                        </div>

                        <div className="flex justify-between items-center px-5 py-3.5">
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                RATING
                            </span>
                            <span className="text-white font-medium">
                                {workout?.rating}
                            </span>
                        </div>
                    </div>

                    {/* Instructions List */}
                    {workout?.instructions &&
                        workout.instructions.length > 0 && (
                            <div className="space-y-3 pt-2">
                                <h3 className="text-base font-black text-white uppercase tracking-wider">
                                    INSTRUCTIONS
                                </h3>
                                <ol className="space-y-2 text-sm text-gray-300">
                                    {workout.instructions.map((step, idx) => (
                                        <li
                                            key={idx}
                                            className="flex gap-2.5 leading-relaxed"
                                        >
                                            <span className="font-semibold text-gray-400">
                                                {idx + 1}.
                                            </span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={() => onaddtoplan(workout)}
                            disabled={isInPlan}
                            className={`flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg ${
                                isInPlan
                                    ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                                    : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                            }`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            {isInPlan
                                ? "Added to today's plan"
                                : "Add to today's plan"}
                        </button>

                        <button
                            onClick={() => ontogglesave(workout)}
                            className={`flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border transition-all ${
                                isSaved
                                    ? "border-[#ccff00] text-[#ccff00] bg-[#ccff00]/10"
                                    : "border-gray-800 text-gray-300 hover:border-gray-600 hover:text-white bg-[#121620]/60"
                            }`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill={isSaved ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                            </svg>
                            {isSaved ? "Saved" : "Save for later"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}