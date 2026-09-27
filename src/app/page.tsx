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

  // Simple Custom Toast Alert implementation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectWorkout = (item: workout) => {
    setSelectedworkout(item);
    setCurrentpage('details');
  };

  const handleAddToPlan = (item: workout) => {
    // Check if item is already added to Today's Plan
    const isAlreadyAdded = planitems.some(i => i.id === item.id);
    
    if (isAlreadyAdded) {
      showToast(`⚠️ "${item.title}" is already added to Today's Plan!`);
      return;
    }

    setPlanitems([...planitems, { ...item, completed: false }]);
    showToast(`✅ "${item.title}" added to Today's Plan!`);
  };

  const handleToggleSave = (item: workout) => {
    const isSaved = saveditems.some(i => i.id === item.id);
    if (isSaved) {
      setSaveditems(saveditems.filter(i => i.id !== item.id));
      showToast(`🗑️ Removed "${item.title}" from Saved workouts.`);
    } else {
      setSaveditems([...saveditems, item]);
      showToast(`🔖 Saved "${item.title}" for later!`);
    }
  };

  const handleRemoveFromPlan = (id: string, tab: 'today' | 'saved') => {
    if (tab === 'today') {
      setPlanitems(planitems.filter(i => i.id !== id));
      showToast("Removed exercise from Today's Plan.");
    } else {
      setSaveditems(saveditems.filter(i => i.id !== id));
      showToast("Removed exercise from Saved workouts.");
    }
  };

  const handleToggleComplete = (id: string) => {
    setPlanitems(planitems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans antialiased relative">
      {/* Dynamic Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#171d2a] text-white border border-[#ccff00]/40 px-5 py-3 rounded-2xl shadow-2xl transition-all duration-300 animate-bounce text-xs font-semibold flex items-center gap-2">
          {toastMessage}
        </div>
      )}

      {/* Navbar with Page navigation & Badge Counts */}
      <Navbar 
        currentpage={currentpage} 
        onnavigate={setCurrentpage} 
        planCount={planitems.length}
        savedCount={saveditems.length}
      />

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