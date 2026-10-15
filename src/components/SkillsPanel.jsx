import React from 'react';

export default function SkillsPanel() {
  const skills = [
    { id: 'prog', name: 'Програмування',     level: 5, pct: 75, colorHex: '#3B82F6', icon: 'fa-code' },
    { id: 'eng',  name: 'Англійська мова',   level: 3, pct: 50, colorHex: '#A855F7', icon: 'fa-language' },
    { id: 'fit',  name: 'Фітнес',            level: 4, pct: 65, colorHex: '#22C55E', icon: 'fa-person-running' },
    { id: 'mus',  name: 'Музика',            level: 2, pct: 35, colorHex: '#FACC15', icon: 'fa-music' },
    { id: 'art',  name: 'Рисування',         level: 1, pct: 20, colorHex: '#F97316', icon: 'fa-palette' },
    { id: 'cook', name: 'Кулінарія',         level: 1, pct: 15, colorHex: '#EC4899', icon: 'fa-utensils' },
  ];

  return (
    <div className="lg:col-span-2 bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 flex flex-col justify-between shadow-2xl h-full">
      <div>
        <h3 className="font-bold text-white text-[15px] mb-2">
           Навички
        </h3>
        
        <div className="space-y-3">
          {skills.map(skill => {
            return (
              <div key={skill.id} className="relative group">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-3">
                     <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: skill.colorHex, boxShadow: `0 0 15px ${skill.colorHex}` }}
                      >
                        <i className={`fa-solid ${skill.icon} text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] text-sm`}></i>
                     </div>
                     <div className="flex items-center gap-2 text-[12px] font-semibold">
                        <span className="text-gray-200">{skill.name}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                     <span className="text-white font-mono font-extrabold" style={{ textShadow: `0 0 8px ${skill.colorHex}` }}>{skill.level}</span>
                  </div>
                </div>

                {/* Tapered Gradient Neon Line */}
                <div className="ml-[45px] w-[calc(100%-45px)] bg-[#030508] h-[5px] shadow-inner relative overflow-visible border border-white/5" style={{ borderRadius: '50%' }}>
                   <div 
                      className="absolute top-1/2 -translate-y-1/2 left-0 h-[5px] transition-all duration-300"
                      style={{ 
                        width: `${skill.pct}%`, 
                        // Horizontal gradient making the center pure color and the edges dark (transparent mixing with bg #030508)
                        backgroundImage: `linear-gradient(90deg, ${skill.colorHex}20 0%, ${skill.colorHex} 50%, ${skill.colorHex}20 100%)`, 
                        boxShadow: `0 0 15px ${skill.colorHex}, 0 0 5px ${skill.colorHex}`,
                        borderRadius: '50%',
                      }}
                   ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <a href="#" className="text-xs font-semibold text-[#3B82F6] hover:text-white transition flex items-center justify-end gap-1 mt-5">
        Усі навички <i className="fa-solid fa-arrow-right text-[10px]"></i>
      </a>
    </div>
  );
}
