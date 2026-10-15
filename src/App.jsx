import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';

export default function App() {
  const [appState, setAppState] = useState({
    name: "Artem",
    age: 17,
    height: 185,
    weight: 50,
    level: 12,
    currentXp: 842,
    maxXp: 1500,
    totalXp: 8467,
    todayXp: 1210,
    currentTime: "22:47"
  });

  // Global clock update
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setAppState(prev => ({ ...prev, currentTime: `${h}:${m}` }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addXP = (amount) => {
    setAppState(prev => {
      let newCurrentXp = prev.currentXp + amount;
      let newLevel = prev.level;
      let newTotalXp = prev.totalXp + amount;
      let newTodayXp = prev.todayXp + amount;

      if (newCurrentXp >= prev.maxXp) {
        newCurrentXp -= prev.maxXp;
        newLevel += 1;
      }

      return {
        ...prev,
        currentXp: newCurrentXp,
        level: newLevel,
        totalXp: newTotalXp,
        todayXp: newTodayXp
      };
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header appState={appState} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainDashboard appState={appState} addXP={addXP} />
      </div>
    </div>
  );
}
