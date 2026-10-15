import React, { useState, useEffect } from 'react';

export default function ActionTracker({ addXP }) {
  const [timerSeconds, setTimerSeconds] = useState(1723); // 28:43
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const handleFinish = () => {
    addXP(90);
    setTimerSeconds(0);
    setTimerRunning(false);
  };

  const [quickInput, setQuickInput] = useState('');
  const [quickAct, setQuickAct] = useState('');

  const submitQuickAction = () => {
    if (!quickAct) return;
    let xp = 50;
    if (quickAct.includes('Програмування')) xp = 120;
    if (quickAct.includes('Фітнес')) xp = 90;
    if (quickAct.includes('Читання')) xp = 72;
    addXP(xp);
    setQuickInput('');
    setQuickAct('');
  };

  return (
    <div className="lg:col-span-2 space-y-4">
      {/* Timer */}
      <div className="bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 space-y-4 shadow-2xl">
        <h3 className="font-bold text-white text-[15px]">Активна дія</h3>
        
        {/* Activity Row - Removed dark bg, added top/bottom border lines */}
        <div className="py-4 border-y border-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Extremely glowing red squircle */}
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              <i className="fa-solid fa-dumbbell text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] text-sm"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-200 text-[13px] mb-0.5">Тренування (фітнес)</p>
              <p className="text-[11px] text-gray-500 font-medium tracking-wide">45 хв • Якість: 2</p>
            </div>
          </div>
          {/* Removed yellow rectangle context, just yellow text */}
          <span className="text-primaryYellow font-bold font-mono text-[13px] drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">+90 XP</span>
        </div>

        {/* Timer UI - Background matched to main transparent, circular pause/stop buttons */}
        <div className="flex items-center justify-between bg-transparent py-2.5 px-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2.5">
            <i className="fa-regular fa-clock text-gray-400 text-lg"></i>
            <span className="font-mono text-xl font-bold text-white tracking-widest">{timeStr}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {/* Round Pause Button */}
            <button onClick={() => setTimerRunning(!timerRunning)} className="w-[38px] h-[38px] rounded-full bg-[#0B0F16] border border-white/5 text-white flex items-center justify-center transition hover:bg-gray-800 shadow-sm">
              <i className={`fa-solid ${timerRunning ? 'fa-pause' : 'fa-play'} text-sm`}></i>
            </button>
            {/* Round Stop Button */}
            <button onClick={() => { setTimerSeconds(0); setTimerRunning(false); }} className="w-[38px] h-[38px] rounded-full bg-[#0B0F16] border border-red-500/30 flex items-center justify-center transition hover:bg-red-500/10 shadow-sm">
              <div className="w-[10px] h-[10px] bg-red-500 rounded-sm"></div>
            </button>
          </div>
        </div>
        
        {/* Solid Yellow Button (No neon, black icons/text) */}
        <button onClick={handleFinish} className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#030508] font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-[13px]">
          <i className="fa-solid fa-bolt text-sm"></i> Завершити
        </button>
      </div>

      {/* Quick Record */}
      <div className="bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 space-y-4 shadow-2xl">
        <h3 className="font-bold text-white text-[15px]">Швидкий запис</h3>
        
        {/* Independent Tab Buttons */}
        <div className="flex gap-2 text-[12px] font-semibold">
          {/* Active Tab */}
          <button className="flex-[1.2] py-2 rounded-xl border border-primaryYellow bg-primaryYellow/10 text-white text-center shadow-[inset_0_0_10px_rgba(250,204,21,0.15)] flex items-center justify-center transition">
            Активність
          </button>
          {/* Inactive Tabs */}
          <button className="flex-1 py-2 rounded-xl border border-white/5 bg-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5 text-center flex items-center justify-center gap-1.5 transition">
            <i className="fa-regular fa-clock"></i> Час
          </button>
          <button className="flex-1 py-2 rounded-xl border border-white/5 bg-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5 text-center flex items-center justify-center gap-1.5 transition">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Якість
          </button>
        </div>
        
        {/* Big rounded Input Fields */}
        <div className="space-y-3">
          <div className="relative">
            <select value={quickAct} onChange={e => setQuickAct(e.target.value)} className="w-full bg-[#0B0F16] border border-white/10 rounded-xl p-3.5 text-[13px] text-gray-300 focus:outline-none focus:border-primaryYellow transition appearance-none cursor-pointer">
              <option value="" disabled>Обрати активність</option>
              <option value="Програмування">💻 Програмування (+120 XP)</option>
              <option value="Фітнес">🏋️ Тренування / Фітнес (+90 XP)</option>
              <option value="Читання">📚 Читання книги (+72 XP)</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] pointer-events-none"></i>
          </div>
          
          <input type="text" value={quickInput} onChange={e => setQuickInput(e.target.value)} placeholder="Додати нотатку (необов'язково)" className="w-full bg-[#0B0F16] border border-white/10 rounded-xl p-3.5 text-[13px] text-gray-200 placeholder-gray-600 focus:outline-none focus:border-primaryYellow transition" />
        </div>
        
        {/* Solid Yellow Button with right span */}
        <button onClick={submitQuickAction} className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#030508] font-bold py-3.5 rounded-xl transition flex items-center justify-between px-5 text-[13px]">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-bolt text-sm"></i> Записати дію
          </span>
          <span className="font-extrabold">+XP</span>
        </button>
      </div>
    </div>
  );
}
