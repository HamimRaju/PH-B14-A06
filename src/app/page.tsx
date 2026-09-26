"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";
import MyPlanPage from "../pages/MyPlanPage";
import { initialworkouts } from "../data/workout";
import { workout, pagetype } from "../types/workout";

export default function Home() {
    const [activepage, setactivepage] = useState<pagetype>("home");
    const [workouts] = useState<workout[]>(initialworkouts);
    const [selectedworkout, setselectedworkout] = useState<workout | null>(
        null,
    );

    const [planitems, setplanitems] = useState<workout[]>([]);
    const [saveditems, setsaveditems] = useState<workout[]>([]);

    const handleselectworkout = (item: workout) => {
        setselectedworkout(item);
        setactivepage("details");
    };

    const handleaddtoplan = (item: workout) => {
        if (planitems.length >= 5) {
            alert("Plan limit reached! Maximum 5 exercises allowed for today.");
            return;
        }
        if (!planitems.some((i) => i.id === item.id)) {
            setplanitems([...planitems, { ...item, completed: false }]);
        }
    };

    const handlesaveforlater = (item: workout) => {
        if (!saveditems.some((i) => i.id === item.id)) {
            setsaveditems([...saveditems, item]);
        }
    };

    const handleremovefromplan = (id: string, tab: "today" | "saved") => {
        if (tab === "today") {
            setplanitems(planitems.filter((item) => item.id !== id));
        } else {
            setsaveditems(saveditems.filter((item) => item.id !== id));
        }
    };

    const handletogglecomplete = (id: string) => {
        setplanitems(
            planitems.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item,
            ),
        );
    };

    return (
        <div className="bg-[#0b0e14] text-gray-200 min-h-screen flex flex-col font-sans">
            <Navbar
                activepage={activepage}
                setactivepage={setactivepage}
                plancount={planitems.length}
                savedcount={saveditems.length}
            />

            <main className="grow max-w-7xl w-full mx-auto p-6">
                {activepage === "home" && (
                    <HomePage
                        workouts={workouts}
                        onselectworkout={handleselectworkout}
                    />
                )}

                {activepage === "details" && selectedworkout && (
                    <DetailsPage
                        workout={selectedworkout}
                        onaddtoplan={handleaddtoplan}
                        onsaveforlater={handlesaveforlater}
                        isaddedtoplan={planitems.some(
                            (i) => i.id === selectedworkout.id,
                        )}
                        issaved={saveditems.some(
                            (i) => i.id === selectedworkout.id,
                        )}
                    />
                )}

                {activepage === "plan" && (
                    <MyPlanPage
                        planitems={planitems}
                        saveditems={saveditems}
                        onremovefromplan={handleremovefromplan}
                        ontogglecomplete={handletogglecomplete}
                        onselectworkout={handleselectworkout}
                        ongotoworkouts={() => setactivepage("home")}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}
