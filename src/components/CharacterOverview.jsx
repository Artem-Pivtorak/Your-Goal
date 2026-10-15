import React from 'react';

export default function CharacterOverview({ appState }) {
  // Use exact static mappings to avoid tailwind purge
  const attributes = [
    { id: 'int', label: 'INT', name: 'Інтелект',     val: 68, mod: '+2',  color: '#3B82F6', icon: 'fa-brain' },
    { id: 'str', label: 'STR', name: 'Сила',         val: 55, mod: '+1',  color: '#EF4444', icon: 'fa-dumbbell' },
    { id: 'end', label: 'END', name: 'Витривалість', val: 62, mod: '+1',  color: '#22C55E', icon: 'fa-leaf' },
    { id: 'dis', label: 'DIS', name: 'Дисципліна',   val: 48, mod: '+1',  color: '#EAB308', icon: 'fa-bolt' },
    { id: 'soc', label: 'SOC', name: 'Соціальність', val: 45, mod: '0',   color: '#A855F7', icon: 'fa-users' },
    { id: 'cre', label: 'CRE', name: 'Креативність', val: 71, mod: '+2',  color: '#06B6D4', icon: 'fa-wand-magic-sparkles' },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1.4fr] gap-4 h-full">
      
      {/* Left Split: Image Box */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-cardBorder h-full min-h-[470px]">
         <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
            alt="Character" 
            className="absolute inset-0 w-full h-full object-cover" 
         />
         
         {/* Top Gradient for Text Readability */}
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent"></div>
         
         {/* Top Left Info */}
         <div className="absolute top-4 left-5 z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white drop-shadow-md tracking-wide">{appState.name}</h2>
              <button className="text-gray-400 hover:text-white transition"><i className="fa-solid fa-pen text-sm drop-shadow-md"></i></button>
            </div>
            <p className="text-sm text-gray-300 font-medium mt-1 drop-shadow-md flex items-center">
              <span>{appState.age} років</span>
              <span className="mx-3 text-gray-500">•</span>
              {appState.height} см
              <span className="mx-3 text-gray-500">•</span>
              {appState.weight} кг
            </p>
         </div>

         {/* Bottom Left Button (Matte) */}
         <button className="absolute bottom-4 left-5 bg-[#0B101A]/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs font-bold text-gray-200 hover:bg-[#0B101A]/80 transition shadow-lg">
            <i className="fa-solid fa-rotate drop-shadow-sm"></i> Змінити зовнішність
         </button>
      </div>

      {/* Right Split: Stats Card */}
      <div className="bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 flex flex-col justify-between shadow-2xl h-full relative">
         
         {/* Top: Rank Sphere & XP */}
         <div className="flex items-center gap-4">
            {/* Neumorphic Sphere */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-700/60 to-[#030508] shadow-[inset_0_-2px_10px_rgba(255,255,255,0.05),_0_5px_15px_rgba(0,0,0,0.8)] border border-white/10 flex items-center justify-center flex-shrink-0">
               {/* SVG progress ring */}
               <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_#FACC15]">
                 <circle cx="32" cy="32" r="28" stroke="transparent" strokeWidth="4" fill="none" />
                 <circle cx="32" cy="32" r="28" stroke="#FACC15" strokeWidth="4" fill="none" strokeDasharray="175" strokeDashoffset={175 - ((appState.currentXp/appState.maxXp)*175)} strokeLinecap="round" className="transition-all duration-500" />
               </svg>
               <span className="font-extrabold text-white text-2xl z-10 tracking-tight">{appState.level}</span>
            </div>

            {/* XP Bar */}
            <div className="flex-1 shrink-0">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-gray-200 font-semibold text-sm">Рівень</span>
                 <span className="text-xs text-gray-500 font-mono font-bold">
                   <span className="text-primaryYellow">{appState.currentXp}</span> / {appState.maxXp} XP
                 </span>
               </div>
               {/* Thicker level bar with tapered ends */}
               <div className="w-full bg-[#030508] h-[5px] shadow-inner relative border border-white/5 overflow-visible" style={{ borderRadius: '50%' }}>
                  <div className="absolute top-0 left-0 bg-primaryYellow h-[5px] shadow-[0_0_12px_#FACC15]" style={{ width: `${(appState.currentXp / appState.maxXp) * 100}%`, borderRadius: '50%' }}></div>
               </div>
            </div>
         </div>

         {/* Middle: Attributes */}
         <div className="mt-3 flex-1 flex flex-col justify-around">
             <h3 className="font-bold text-white text-[15px] mb-2">Атрибути</h3>
             <div className="space-y-3">
                {attributes.map(attr => (
                  <div key={attr.id} className="relative group">
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-3">
                         {/* Squircle colored icon with Neon Drop Shadow */}
                         <div 
                            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: attr.color, boxShadow: `0 0 15px ${attr.color}` }}
                          >
                            <i className={`fa-solid ${attr.icon} text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] text-sm`}></i>
                         </div>
                         <div className="flex items-center gap-2 text-[12px] font-semibold">
                            <span style={{ color: attr.color, textShadow: `0 0 10px ${attr.color}` }}>{attr.label}</span>
                            <span className="text-gray-200">{attr.name}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 text-[12px]">
                         <span className="text-white font-mono font-extrabold" style={{ textShadow: `0 0 8px ${attr.color}` }}>{attr.val}</span>
                         <span className={attr.mod !== '0' ? 'text-[#22C55E] font-bold' : 'text-gray-600 font-medium'}>
                            ({attr.mod})
                         </span>
                      </div>
                    </div>
                    {/* Tapered Neon Line - thicker with pure elliptical rounding (border-radius: 50%) providing extremely thin, sharp corners */}
                    <div className="ml-[45px] w-[calc(100%-45px)] bg-[#030508] h-[5px] shadow-inner relative overflow-visible border border-white/5" style={{ borderRadius: '50%' }}>
                       <div 
                          className="absolute top-1/2 -translate-y-1/2 left-0 h-[5px] transition-all duration-300"
                          style={{ 
                            width: `${attr.val}%`, 
                          backgroundImage: `linear-gradient(90deg, ${attr.color}20 0%, ${attr.color} 50%, ${attr.color}20 100%)`,
                            boxShadow: `0 0 15px ${attr.color}, 0 0 5px ${attr.color}`,
                            borderRadius: '50%',
                          }}
                       ></div>
                    </div>
                  </div>
                ))}
             </div>
         </div>

         {/* Bottom: Status Frame */}
         <div className="relative mt-4 rounded-2xl bg-[#0B0F16]/50 backdrop-blur-xl border border-white/5 p-4 flex items-center gap-4 group shadow-[0_0_20px_rgba(34,197,94,0.08)] overflow-hidden">
            <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-green-500 via-green-500/20 to-transparent"></div>
            <div className="absolute -bottom-2 left-0 h-4 w-1/2 bg-green-500/20 blur-md"></div>
            <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-10 h-10 bg-white/5 blur-xl"></div>

            {/* Remapped Smile Icon: Removed black background, vastly increased size */}
            <div className="flex items-center justify-center flex-shrink-0 relative text-green-400 z-10 transition transform group-hover:scale-110">
               <i className="fa-regular fa-face-smile text-[55px] drop-shadow-[0_0_15px_rgba(34,197,94,1)]"></i>
            </div>
            
            <div className="z-10 ml-2">
              <span className="text-[13px] font-bold text-gray-200 block mb-0.5">Стан: <span className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">У нормі</span></span>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">Ти на правильному шляху.</p>
            </div>
         </div>

      </div>

    </div>
  );
}
