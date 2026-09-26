'use client';

import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";
import MyPlanPage from "../pages/MyPlanPage";
import { initialworkouts } from "../data/workout";
import { workout, pagetype } from "../types/workout";

export default function Home() {
  const [currentpage, setCurrentpage] = useState<pagetype>('home');
  const [selectedworkout, setSelectedworkout] = useState<workout | null>(null);
  const [workouts] = useState<workout[]>(initialworkouts);
  const [planitems, setPlanitems] = useState<workout[]>([]);
  const [saveditems, setSaveditems] = useState<workout[]>([]);

  const handleSelectWorkout = (item: workout) => {
    setSelectedworkout(item);
    setCurrentpage('details');
  };

  const handleAddToPlan = (item: workout) => {
    if (!planitems.some(i => i.id === item.id)) {
      setPlanitems([...planitems, { ...item, completed: false }]);
    }
  };

  const handleToggleSave = (item: workout) => {
    if (saveditems.some(i => i.id === item.id)) {
      setSaveditems(saveditems.filter(i => i.id !== item.id));
    } else {
      setSaveditems([...saveditems, item]);
    }
  };

  const handleRemoveFromPlan = (id: string, tab: 'today' | 'saved') => {
    if (tab === 'today') {
      setPlanitems(planitems.filter(i => i.id !== id));
    } else {
      setSaveditems(saveditems.filter(i => i.id !== id));
    }
  };

  const handleToggleComplete = (id: string) => {
    setPlanitems(planitems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans antialiased">
      {/* Navbar component with correct currentpage prop */}
      <Navbar currentpage={currentpage} onnavigate={setCurrentpage} />

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentpage === 'home' && (
          <HomePage 
            workouts={workouts} 
            onselectworkout={handleSelectWorkout} 
          />
        )}

        {currentpage === 'details' && selectedworkout && (
          <DetailsPage 
            workout={selectedworkout}
            planitems={planitems}
            saveditems={saveditems}
            onaddtoplan={handleAddToPlan}
            ontogglesave={handleToggleSave}
            onback={() => setCurrentpage('home')}
          />
        )}

        {currentpage === 'plan' && (
          <MyPlanPage 
            planitems={planitems}
            saveditems={saveditems}
            onremovefromplan={handleRemoveFromPlan}
            ontogglecomplete={handleToggleComplete}
            onselectworkout={handleSelectWorkout}
            ongotoworkouts={() => setCurrentpage('home')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}