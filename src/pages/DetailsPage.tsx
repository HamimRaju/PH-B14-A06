/* eslint-disable @next/next/no-img-element */
import React from "react";
import { workout } from "../types/workout";

interface detailspageprops {
    workout: workout;
    onaddtoplan: (workout: workout) => void;
    onsaveforlater: (workout: workout) => void;
    isaddedtoplan: boolean;
    issaved: boolean;
}

export default function DetailsPage({
    workout,
    onaddtoplan,
    onsaveforlater,
    isaddedtoplan,
    issaved,
}: detailspageprops) {
    if (!workout) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="bg-[#12161f] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src={workout.image}
                        alt={workout.title}
                        className="w-full h-auto object-cover aspect-square"
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex gap-2 mb-3">
                            {workout.category?.map((cat, i) => (
                                <span
                                    key={i}
                                    className="bg-[#ccff00] text-black text-xs font-black px-2.5 py-1 rounded uppercase"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                            {workout.title}
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                            {workout.description}
                        </p>
                    </div>

                    <div className="bg-[#12161f] border border-gray-800 rounded-xl divide-y divide-gray-800/60 text-xs">
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Equipment
                            </span>
                            <span className="text-white font-medium">
                                {workout.equipment}
                            </span>
                        </div>
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Difficulty
                            </span>
                            <span className="text-white font-medium">
                                {workout.difficulty}
                            </span>
                        </div>
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Sets
                            </span>
                            <span className="text-white font-medium">
                                {workout.sets}
                            </span>
                        </div>
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Reps
                            </span>
                            <span className="text-white font-medium">
                                {workout.reps}
                            </span>
                        </div>
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Duration
                            </span>
                            <span className="text-white font-medium">
                                {workout.duration} min
                            </span>
                        </div>
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Calories
                            </span>
                            <span className="text-white font-medium">
                                {workout.calories} kcal
                            </span>
                        </div>
                        <div className="flex justify-between p-3.5">
                            <span className="text-gray-500 uppercase font-semibold">
                                Rating
                            </span>
                            <span className="text-yellow-400 font-bold">
                                {workout.rating}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-extrabold uppercase text-gray-300 tracking-wider">
                            Instructions
                        </h3>
                        <ol className="space-y-2 text-xs text-gray-400 list-decimal list-inside leading-relaxed">
                            {workout.instructions?.map((step, idx) => (
                                <li key={idx} className="pl-1">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            onClick={() => onaddtoplan(workout)}
                            disabled={isaddedtoplan}
                            className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                                isaddedtoplan
                                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                    : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                            }`}
                        >
                            <span>📂</span>{" "}
                            {isaddedtoplan
                                ? "In Today's Plan"
                                : "Add to today's plan"}
                        </button>

                        <button
                            onClick={() => onsaveforlater(workout)}
                            className={`py-3 px-5 rounded-lg font-bold text-xs uppercase border transition-all flex items-center gap-2 ${
                                issaved
                                    ? "bg-gray-800 text-white border-gray-700"
                                    : "bg-[#12161f] text-gray-300 border-gray-800 hover:border-gray-700"
                            }`}
                        >
                            <span>🔖</span>{" "}
                            {issaved ? "Saved" : "Save for later"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
