/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { workout } from "../types/workout";

export interface myplanpageprops {
    planitems: workout[];
    saveditems: workout[];
    onremovefromplan: (id: string, tab: "today" | "saved") => void;
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
    ongotoworkouts,
}: myplanpageprops) {
    const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
    const currentList = activeTab === "today" ? planitems : saveditems;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Tab Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                        My Workout Plan
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        Manage your active training schedule and saved routines.
                    </p>
                </div>

                <div className="flex gap-2 bg-[#12161f] p-1.5 rounded-xl border border-gray-800">
                    <button
                        onClick={() => setActiveTab("today")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === "today"
                                ? "bg-[#ccff00] text-black shadow-md"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Todays Plan ({planitems.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === "saved"
                                ? "bg-[#ccff00] text-black shadow-md"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Saved ({saveditems.length})
                    </button>
                </div>
            </div>

            {/* Content List */}
            {currentList.length === 0 ? (
                <div className="bg-[#12161f] border border-gray-800 rounded-2xl p-12 text-center space-y-4">
                    <p className="text-gray-400 text-sm">
                        No workouts added in{" "}
                        {activeTab === "today" ? "today's plan" : "saved list"}{" "}
                        yet.
                    </p>
                    <button
                        onClick={ongotoworkouts}
                        className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-lg hover:bg-[#b8e600] transition-all"
                    >
                        Explore Workouts
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {currentList.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-[#12161f] border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                                item.completed && activeTab === "today"
                                    ? "border-green-500/40 bg-green-950/10 opacity-75"
                                    : "border-gray-800"
                            }`}
                        >
                            <div
                                className="flex items-center gap-4 cursor-pointer flex-1 w-full"
                                onClick={() => onselectworkout(item)}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-xl object-cover bg-gray-900"
                                />
                                <div>
                                    <h3
                                        className={`font-bold uppercase text-white ${item.completed && activeTab === "today" ? "line-through text-gray-400" : ""}`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        {item.equipment} • {item.duration} min
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                {activeTab === "today" && (
                                    <button
                                        onClick={() =>
                                            ontogglecomplete(item.id)
                                        }
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                                            item.completed
                                                ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                        }`}
                                    >
                                        {item.completed
                                            ? "Completed"
                                            : "Mark Done"}
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        onremovefromplan(item.id, activeTab)
                                    }
                                    className="px-3 py-2 rounded-lg text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all uppercase"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
