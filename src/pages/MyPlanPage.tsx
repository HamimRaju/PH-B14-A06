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
    const [tab, setTab] = useState<"today" | "saved">("today");
    const [sortby, setSortby] = useState<"duration" | "calories">("duration");

    const currentlist = tab === "today" ? planitems : saveditems;

    const totalexercises = planitems.length;
    const totalminutes = planitems.reduce(
        (acc, curr) => acc + curr.duration,
        0,
    );
    const totalcalories = planitems.reduce(
        (acc, curr) => acc + curr.calories,
        0,
    );

    const sortedlist = [...currentlist].sort((a, b) => {
        if (sortby === "duration") return b.duration - a.duration;
        if (sortby === "calories") return b.calories - a.calories;
        return 0;
    });

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                        MY PLAN
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">
                        Cap of five lifts for today. Finish them, then load
                        more.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-[#12161f] p-6 rounded-2xl border border-gray-800">
                    <div>
                        <span className="text-[11px] text-gray-500 font-bold uppercase">
                            Exercises
                        </span>
                        <p className="text-4xl font-black text-[#ccff00] mt-1">
                            {totalexercises}
                        </p>
                    </div>
                    <div>
                        <span className="text-[11px] text-gray-500 font-bold uppercase">
                            Minutes
                        </span>
                        <p className="text-4xl font-black text-white mt-1">
                            {totalminutes}
                        </p>
                    </div>
                    <div>
                        <span className="text-[11px] text-gray-500 font-bold uppercase">
                            Calories
                        </span>
                        <p className="text-4xl font-black text-white mt-1">
                            {totalcalories}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-800/80 pb-4">
                <div className="bg-[#12161f] p-1 rounded-lg border border-gray-800 flex gap-1">
                    <button
                        onClick={() => setTab("today")}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                            tab === "today"
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Todays Plan
                    </button>
                    <button
                        onClick={() => setTab("saved")}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                            tab === "saved"
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Sort By</span>
                    <select
                        value={sortby}
                        onChange={(e) =>
                            setSortby(e.target.value as "duration" | "calories")
                        }
                        className="bg-[#12161f] border border-gray-800 text-white text-xs rounded-md px-3 py-1.5 focus:outline-none"
                    >
                        <option value="duration">Duration</option>
                        <option value="calories">Calories</option>
                    </select>
                </div>
            </div>

            {sortedlist.length === 0 ? (
                <div className="bg-[#12161f] border border-gray-800/80 rounded-2xl py-20 text-center space-y-4">
                    <h3 className="text-sm font-extrabold uppercase text-white tracking-wider">
                        NOTHING HERE YET
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <button
                        onClick={ongotoworkouts}
                        className="bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2.5 rounded-md hover:bg-[#b8e600] transition-colors"
                    >
                        Go to workouts
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedlist.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#12161f] border border-gray-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gray-700 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-lg object-cover bg-gray-900"
                                />
                                <div>
                                    <h4 className="text-sm font-extrabold text-white uppercase">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {item.equipment}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                        <span>⏱ {item.duration} min</span>
                                        <span>🔥 {item.calories} kcal</span>
                                        <span className="text-yellow-400 font-bold">
                                            ★ {item.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onselectworkout(item)}
                                    className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                                >
                                    View Details
                                </button>

                                {tab === "today" && (
                                    <button
                                        onClick={() =>
                                            ontogglecomplete(item.id)
                                        }
                                        className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${
                                            item.completed
                                                ? "bg-gray-800 text-gray-400 line-through"
                                                : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                        }`}
                                    >
                                        {item.completed
                                            ? "Completed"
                                            : "✓ Mark as Done"}
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        onremovefromplan(item.id, tab)
                                    }
                                    className="text-gray-500 hover:text-red-400 p-2 text-sm"
                                    title="Remove"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
