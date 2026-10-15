import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-cardBorder flex flex-col justify-between shrink-0 hidden lg:flex relative overflow-hidden">
      
      {/* Top Navigation */}
      <div className="p-4 z-10 flex-shrink-0">
        <nav className="space-y-1.5">
          <SidebarItem icon="fa-solid fa-house" text="Головна" active={true} />
          <SidebarItem icon="fa-solid fa-bolt" text="Активності" />
          <SidebarItem icon="fa-regular fa-file-lines" text="Журнал" />
          <SidebarItem icon="fa-regular fa-star" text="Навички" />
          <SidebarItem icon="fa-solid fa-cube" text="Атрибути" />
          <SidebarItem icon="fa-solid fa-person" text="Тіло" />
          <SidebarItem icon="fa-regular fa-flag" text="Квести" />
          <SidebarItem icon="fa-solid fa-chart-column" text="Статистика" />
          <SidebarItem icon="fa-solid fa-gear" text="Налаштування" />
        </nav>
      </div>

      {/* Mountain & Bottom Container */}
      <div className="flex flex-col mt-auto w-full z-10">
          {/* Mountain Block explicitly above the frames */}
          <div className="w-full h-44 relative pointer-events-none overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" 
               alt="Mountains" 
               className="w-full h-full object-cover object-center brightness-75"
               style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 95%, transparent 100%)' }}
             />
          </div>

          <div className="px-4 pb-6 space-y-4 w-full -mt-2">
              {/* Matte Quote Frame */}
              <div className="relative rounded-2xl bg-cardDark/80 backdrop-blur-xl border border-white/5 p-4 flex items-center justify-between cursor-pointer group shadow-[0_0_25px_rgba(249,115,22,0.15)] overflow-hidden">
                  
                  {/* Fading neon border in warm colors */}
                  <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-orange-400 via-orange-500/40 to-transparent"></div>
                  {/* Warm bottom glow */}
                  <div className="absolute -bottom-2 left-0 h-4 w-2/3 bg-orange-500/25 blur-md"></div>
                  
                  {/* Right edge slight light */}
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-orange-200/20 to-transparent"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-12 bg-orange-300/10 blur-xl"></div>
                  
                  <p className="text-[13px] font-semibold text-gray-200 leading-snug">
                    Велика мета<br/>починається з<br/>маленьких дій.
                  </p>
                  <i className="fa-solid fa-chevron-right text-[10px] text-gray-400 group-hover:text-white transition"></i>
              </div>



              {/* Lock Text */}
              <div className="text-[11px] text-gray-500 flex items-center justify-center gap-2 font-medium pt-1">
                  <i className="fa-solid fa-lock text-gray-600"></i>
                  <span>Локально • Безпечно • Приватно</span>
              </div>
          </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  const baseClasses = "group relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold transition-all duration-200 overflow-hidden text-base";
  
  const stateClasses = active 
    ? "bg-primaryYellow/10 text-primaryYellow" 
    : "text-white hover:bg-gray-200 hover:text-black";
    
  const iconGlow = active 
    ? "drop-shadow-[0_0_12px_rgba(250,204,21,1)]" 
    : ""; 
    
  return (
    <a href="#" className={`${baseClasses} ${stateClasses}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-primaryYellow shadow-[0_0_15px_#FACC15] transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}></div>
      <i className={`${icon} ${iconGlow} text-lg w-6 text-center transition-all duration-200 ${active ? '' : 'group-hover:text-black'}`}></i>
      <span className="tracking-wide">{text}</span>
    </a>
  );
}
