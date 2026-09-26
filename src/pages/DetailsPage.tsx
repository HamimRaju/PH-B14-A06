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
    const isInPlan = planitems.some((item) => item.id === workout.id);
    const isSaved = saveditems.some((item) => item.id === workout.id);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Back Button */}
            <button
                onClick={onback}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
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
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back to Workouts
            </button>

            {/* Main Card */}
            <div className="bg-[#12161f] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="relative w-full h-80 bg-gray-900">
                    <img
                        src={workout.image}
                        alt={workout.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex gap-2 flex-wrap mb-3">
                                {workout.category?.map((cat, i) => (
                                    <span
                                        key={i}
                                        className="bg-[#ccff00] text-black text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                                {workout.title}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                {workout.equipment}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => ontogglesave(workout)}
                                className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                                    isSaved
                                        ? "border-[#ccff00] text-[#ccff00] bg-[#ccff00]/10"
                                        : "border-gray-700 text-gray-300 hover:border-white hover:text-white"
                                }`}
                            >
                                {isSaved ? "Saved" : "Save"}
                            </button>

                            <button
                                onClick={() => onaddtoplan(workout)}
                                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                                    isInPlan
                                        ? "bg-gray-800 text-gray-400 cursor-default"
                                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                }`}
                                disabled={isInPlan}
                            >
                                {isInPlan
                                    ? "Added to Plan"
                                    : "Add to Today's Plan"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-y border-gray-800 py-4 text-center">
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">
                                Duration
                            </span>
                            <span className="text-lg font-black text-white">
                                {workout.duration} min
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">
                                Calories
                            </span>
                            <span className="text-lg font-black text-white">
                                {workout.calories} kcal
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">
                                Rating
                            </span>
                            <span className="text-lg font-black text-white">
                                {workout.rating} / 5
                            </span>
                        </div>
                    </div>

                    {workout.description && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                Overview
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {workout.description}
                            </p>
                        </div>
                    )}

                    {workout.instructions &&
                        workout.instructions.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                    Instructions
                                </h3>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
                                    {workout.instructions.map((step, idx) => (
                                        <li
                                            key={idx}
                                            className="leading-relaxed"
                                        >
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
