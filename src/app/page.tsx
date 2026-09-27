'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
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
    // Check if item is already added to Today's Plan
    const isAlreadyAdded = planitems.some(i => i.id === item.id);
    
    if (isAlreadyAdded) {
      toast(`${item.title} is already in Today's Plan!`, {
        icon: '⚠️',
        style: {
          border: '1px solid rgba(234, 179, 8, 0.4)',
        },
      });
      return;
    }

    setPlanitems([...planitems, { ...item, completed: false }]);
    
    toast.success(`${item.title} added to Today's Plan!`, {
      iconTheme: {
        primary: '#ccff00',
        secondary: '#000000',
      },
      style: {
        border: '1px solid rgba(204, 255, 0, 0.4)',
      },
    });
  };

  const handleToggleSave = (item: workout) => {
    const isSaved = saveditems.some(i => i.id === item.id);
    if (isSaved) {
      setSaveditems(saveditems.filter(i => i.id !== item.id));
      toast('Removed from Saved Workouts', {
        icon: '🗑️',
        style: {
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } else {
      setSaveditems([...saveditems, item]);
      toast.success(`${item.title} saved for later!`, {
        iconTheme: {
          primary: '#ccff00',
          secondary: '#000000',
        },
        style: {
          border: '1px solid rgba(204, 255, 0, 0.4)',
        },
      });
    }
  };

  const handleRemoveFromPlan = (id: string, tab: 'today' | 'saved') => {
    if (tab === 'today') {
      setPlanitems(planitems.filter(i => i.id !== id));
      toast.error("Removed exercise from Today's Plan.", {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#ffffff',
        },
        style: {
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } else {
      setSaveditems(saveditems.filter(i => i.id !== id));
      toast.error("Removed exercise from Saved workouts.", {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#ffffff',
        },
        style: {
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    }
  };

  const handleToggleComplete = (id: string) => {
    setPlanitems(planitems.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          toast.success("Workout marked as completed!", {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff',
            },
          });
        }
        return { ...item, completed: nextState };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans antialiased relative">
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