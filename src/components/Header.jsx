import React from 'react';

export default function Header({ appState }) {
  return (
    <header className="h-20 bg-[#0B0F19] border-b border-cardBorder px-6 flex items-center sticky top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21L2 3h5l5 9 5-9h5L12 21z" fill="#FACC15" />
            <path d="M12 14L8.5 6h7L12 14z" fill="#FACC15" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-xl tracking-wide">
              Life <span className="text-primaryYellow">RPG</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Кожен день — це прогрес</p>
        </div>
      </div>

      {/* Center / Controls Info */}
      <div className="hidden md:flex items-center gap-10 text-sm text-gray-300 ml-auto mr-8">
        
        {/* Date / Time (Removed oval bg, bigger icons) */}
        <div className="flex items-center gap-3">
          <i className="fa-regular fa-sun text-primaryYellow text-xl drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"></i>
          <span className="font-medium text-base">29 вер. 2025</span>
          <span className="text-gray-500 text-lg">•</span>
          <span className="text-gray-400 font-medium text-base">Пн</span>
          <span className="text-gray-500 text-lg">•</span>
          <i className="fa-regular fa-clock text-xl text-gray-400"></i>
          <span className="font-mono text-white font-bold text-lg">{appState.currentTime || "22:47"}</span>
        </div>

        {/* Profile Badge Header (Made much larger) */}
        <div className="flex items-center gap-4 bg-bgDark/80 px-4 py-2 rounded-2xl border border-cardBorder shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            className="w-11 h-11 rounded-full object-cover border-2 border-primaryYellow drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]"
            alt={appState.name}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-white text-base">{appState.name}</span>
              <span className="bg-primaryYellow/20 text-primaryYellow text-xs font-bold px-2 py-0.5 rounded-md border border-primaryYellow/30 shadow-sm">
                Рівень <span className="text-sm font-extrabold">{appState.level}</span>
              </span>
            </div>
            <div className="w-36 bg-gray-800 h-2.5 rounded-full overflow-hidden mt-1.5 shadow-inner">
              <div
                className="bg-primaryYellow h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                style={{ width: `${(appState.currentXp / appState.maxXp) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-400 font-mono font-medium pl-2 whitespace-nowrap">
            <span className="text-gray-200">{appState.currentXp}</span> / {appState.maxXp} XP
          </span>
        </div>
      </div>

      {/* Top Right Window Actions */}
      <div className="flex items-center text-gray-400">
        <button className="hover:text-primaryYellow transition text-sm">
          <i className="fa-solid fa-gear text-2xl drop-shadow-sm"></i>
        </button>
      </div>
    </header>
  );
}
