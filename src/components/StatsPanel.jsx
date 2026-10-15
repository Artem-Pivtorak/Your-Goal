import React from 'react';
import { M_ZONES, Z_INFO, BODY_PATHS, BODY_BG_BASE64 } from './BodyMapData';

export function BodyMap() {
  const [hoveredM, setHoveredM] = React.useState(null);
  const [hoveredG, setHoveredG] = React.useState(null);
  const [selectedG, setSelectedG] = React.useState(null);
  const tipRef = React.useRef(null);

  const avg = Math.round(Object.values(Z_INFO).reduce((sum, z) => sum + z.v, 0) / 5);
  const getOpacity = (id) => (0.28 + (Z_INFO[id].v / 100) * 0.55).toFixed(2);

  const bgSrc = BODY_BG_BASE64 ? `data:image/webp;base64,${BODY_BG_BASE64}` : '/body_silhouette.png';

  const handlePointerMove = (e) => {
    const target = e.target.closest('[data-m]');
    if (target) {
      const idx = parseInt(target.getAttribute('data-m'), 10);
      if (idx !== hoveredM) setHoveredM(idx);
      if (tipRef.current) {
        const svgRect = e.currentTarget.getBoundingClientRect();
        tipRef.current.style.left = `${e.clientX - svgRect.left}px`;
        tipRef.current.style.top = `${e.clientY - svgRect.top - 30}px`; 
        tipRef.current.style.opacity = 1;
        tipRef.current.innerHTML = `${M_ZONES[idx].n}<br/><span style="color:#8da2c4; font-size:10px">${Z_INFO[M_ZONES[idx].g].n} · ${Z_INFO[M_ZONES[idx].g].v}%</span>`;
      }
    } else {
      if (hoveredM !== null) setHoveredM(null);
      if (tipRef.current) tipRef.current.style.opacity = 0;
    }
  };

  const handlePointerLeave = () => {
    setHoveredM(null);
    if (tipRef.current) tipRef.current.style.opacity = 0;
  };

  const handleClick = (e) => {
    const target = e.target.closest('[data-m]');
    if (target) {
       const idx = parseInt(target.getAttribute('data-m'), 10);
       setSelectedG(M_ZONES[idx].g);
    }
  };

  return (
    <div className="bg-[#0b1220] rounded-2xl border border-[#1d2c47] p-7 flex flex-col shadow-[0_0_40px_rgba(55,182,255,0.08)] h-full w-full">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        <h1 className="font-bold text-white text-[20px] m-0">Карта тіла</h1>
        <div className="flex gap-2">
          <button className="px-5 py-1.5 rounded-lg border border-[#f0b24a] bg-[#101a2e] text-white shadow-[0_0_12px_rgba(240,178,74,0.25)] text-sm font-medium transition">2D</button>
          <button className="px-5 py-1.5 rounded-lg border border-[#1d2c47] bg-[#101a2e] text-[#8da2c4] text-sm opacity-55 cursor-not-allowed">3D</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-8 items-start px-2">
        {/* LEFT STAGE SVG */}
        <div className="relative bg-[radial-gradient(70%_60%_at_50%_40%,#0f2a50_0%,transparent_75%)] rounded-2xl p-2 w-full flex items-center justify-center">
          <svg 
             viewBox="0 0 324 846" 
             className="w-full h-auto block mx-auto max-h-[600px] sm:max-h-[700px]" 
             onPointerMove={handlePointerMove}
             onPointerLeave={handlePointerLeave}
             onClick={handleClick}
          >
            <defs>
              <linearGradient id="gr_head" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="130"><stop offset="0" stopColor="#a8e0ff"/><stop offset=".5" stopColor="#3aa0ff"/><stop offset="1" stopColor="#1f6dff"/></linearGradient>
              <linearGradient id="gr_chest" gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="430"><stop offset="0" stopColor="#b6ffd6"/><stop offset=".5" stopColor="#22e08a"/><stop offset="1" stopColor="#0ea565"/></linearGradient>
              <linearGradient id="gr_abs" gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="430"><stop offset="0" stopColor="#b6ffd6"/><stop offset=".5" stopColor="#22e08a"/><stop offset="1" stopColor="#0ea565"/></linearGradient>
              <linearGradient id="gr_arms" gradientUnits="userSpaceOnUse" x1="0" y1="130" x2="0" y2="420"><stop offset="0" stopColor="#fff3a8"/><stop offset=".5" stopColor="#ffc533"/><stop offset="1" stopColor="#e8890a"/></linearGradient>
              <linearGradient id="gr_legs" gradientUnits="userSpaceOnUse" x1="0" y1="400" x2="0" y2="846"><stop offset="0" stopColor="#dcc0ff"/><stop offset=".5" stopColor="#9a5bff"/><stop offset="1" stopColor="#5a30e0"/></linearGradient>
              {BODY_PATHS.map((d, i) => <path key={i} id={`m${i}`} d={d} fillRule="evenodd" />)}
            </defs>

            {/* Base Image Fallback/Replacement */}
            <image href={bgSrc} width="324" height="846" />

            {/* Render Solid Base Muscle Elements */}
            {['head', 'chest', 'abs', 'arms', 'legs'].map(group => (
              <React.Fragment key={group}>
                <g className="mix-blend-color transition-opacity duration-300" style={{ opacity: getOpacity(group) }} fill={`url(#gr_${group})`}>
                  {M_ZONES.map((m, i) => m.g === group && <use key={`col-${i}`} href={`#m${i}`} data-m={i} className="cursor-pointer" />)}
                </g>
                <g className="mix-blend-screen pointer-events-none transition-opacity duration-300" style={{ opacity: getOpacity(group) * 0.4 }} fill={`url(#gr_${group})`}>
                  {M_ZONES.map((m, i) => m.g === group && <use key={`scr-${i}`} href={`#m${i}`} />)}
                </g>
              </React.Fragment>
            ))}

            {/* Dynamic Interactive Highlights */}
            <g className="pointer-events-none mix-blend-screen">
              {selectedG && M_ZONES.map((m, i) => m.g === selectedG && (
                  <use key={`sel-${i}`} href={`#m${i}`} fill={`url(#gr_${selectedG})`} style={{ opacity: 0.45 }} />
              ))}
              
              {hoveredG && hoveredG !== selectedG && M_ZONES.map((m, i) => m.g === hoveredG && (
                  <use key={`hG-${i}`} href={`#m${i}`} fill={`url(#gr_${hoveredG})`} style={{ opacity: 0.45 }} />
              ))}

              {hoveredM !== null && (
                  <use href={`#m${hoveredM}`} fill={`url(#gr_${M_ZONES[hoveredM].g})`} style={{ opacity: 0.95, filter: 'drop-shadow(0 0 5px currentColor)', color: Z_INFO[M_ZONES[hoveredM].g].c }} />
              )}
            </g>
          </svg>

          {/* Javascript Extracted Float Tooltip */}
          <div 
            ref={tipRef} 
            className="absolute z-50 pointer-events-none bg-[rgba(8,14,28,0.94)] border border-[#1d2c47] rounded-lg px-2.5 py-1.5 text-xs text-white whitespace-nowrap transform -translate-x-1/2 -translate-y-full opacity-0 transition-opacity duration-200"
          ></div>
        </div>

        {/* RIGHT INFO ROWS */}
        <div className="flex flex-col gap-2 h-full overflow-y-auto pr-1 scrollbar-hide pb-2">
          <div className="flex flex-col gap-2 shrink-0">
            {Object.keys(Z_INFO).map(id => {
               const z = Z_INFO[id];
               const isModelHovered = hoveredM !== null && M_ZONES[hoveredM]?.g === z.id;
               const isHovered = hoveredG === z.id || isModelHovered;
               return (
                 <button 
                   key={z.id} 
                   className={`flex items-center justify-between w-full py-2.5 px-4 rounded-xl border outline-none font-inherit cursor-pointer text-white transition-all duration-300 ${selectedG === z.id ? 'border-[#f0b24a] bg-[#101a2e] translate-x-1 shadow-[0_4px_12px_rgba(240,178,74,0.15)]' : isHovered ? 'border-[#f0b24a] bg-[#101a2e] -translate-y-1 transform scale-[1.02] shadow-[0_6px_15px_rgba(55,182,255,0.12)]' : 'border-[#1d2c47] bg-[#101a2e]'}`}
                   onClick={() => setSelectedG(z.id)}
                   onMouseEnter={() => setHoveredG(z.id)}
                   onMouseLeave={() => setHoveredG(null)}
                 >
                   <span className="w-3.5 h-3.5 rounded-full flex-none mr-3 transition-shadow duration-300" style={{ backgroundColor: z.c, boxShadow: isHovered ? `0 0 15px ${z.c}, 0 0 6px ${z.c}` : `0 0 8px ${z.c}` }}></span>
                   <span className="text-[13px] font-medium tracking-wide">{z.n}</span>
                   <b className="ml-auto font-mono text-[13px] pl-2">{z.v}%</b>
                 </button>
               );
            })}
          </div>

          <div className="flex justify-between text-[#8da2c4] text-[11px] font-semibold px-2 mt-1 shrink-0">
            <span>Середній показник</span>
            <span>{avg}%</span>
          </div>

          {/* ACTIVE DETAIL SECTION (ULTRA COMPACT) */}
          {selectedG ? (
            <div className="mt-1 p-2.5 rounded-xl border border-[#1d2c47] bg-[#101a2e] relative animate-fadeIn shadow-lg shrink-0">
               <button 
                  onClick={() => setSelectedG(null)}
                  className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-[#16233b] hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors"
                  title="Закрити"
               >
                 <i className="fa-solid fa-xmark text-[9px]"></i>
               </button>

               <h2 className="mt-0 mb-1.5 font-bold text-[13px] text-white flex items-center gap-1.5 pr-6">
                 <span className="w-2 h-2 rounded-full" style={{ background: Z_INFO[selectedG].c, boxShadow: `0 0 6px ${Z_INFO[selectedG].c}` }}></span>
                 {Z_INFO[selectedG].n}
                 <span className="ml-auto text-white font-mono text-[11px]">{Z_INFO[selectedG].v}%</span>
               </h2>
               <div className="h-1 rounded-full bg-[#16233b] overflow-hidden my-1 border border-[#1d2c47]">
                 <div className="h-full transition-all duration-300" style={{ width: `${Z_INFO[selectedG].v}%`, backgroundColor: Z_INFO[selectedG].c }}></div>
               </div>
               <p className="my-1.5 text-[10px] text-[#8da2c4] leading-tight line-clamp-2">
                 {Z_INFO[selectedG].t}
               </p>
               <div className="mt-2 flex flex-wrap gap-x-1.5 gap-y-0.5 items-center">
                 <span className="text-[9px] text-gray-500 font-bold uppercase">М'язи:</span>
                 {M_ZONES.filter(m => m.g === selectedG)
                   .reduce((acc, curr) => !acc.find(i=>i.k===curr.k) ? acc.concat([curr]) : acc, [])
                   .map((m, i, arr) => (
                     <span key={i} className="text-[#37b6ff] text-[9px] font-medium leading-none">
                        {m.n.replace(/ \((правий|лівий)\)/,'')} {i !== arr.length - 1 ? '•' : ''}
                     </span>
                 ))}
               </div>
            </div>
          ) : (
            <div className="mt-2.5 p-2 rounded-xl border border-[#1d2c47] bg-[#101a2e] min-h-[60px] flex items-center justify-center text-center">
                <span className="text-sm text-[#37b6ff] font-medium p-1 leading-relaxed">Більше...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AttributeRadar() {
  const cx = 100; 
  const cy = 105;
  const R = 62;
  const angles = [
    -Math.PI / 2,         // Top 
    -Math.PI / 6,         // Top Right 
    Math.PI / 6,          // Bottom Right 
    Math.PI / 2,          // Bottom 
    5 * Math.PI / 6,      // Bottom Left 
    7 * Math.PI / 6       // Top Left 
  ];
  const gridPolygons = [];
  for (let i = 1; i <= 5; i++) {
    const r = (R / 5) * i;
    gridPolygons.push(angles.map(a => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`).join(" "));
  }
  const radialLines = angles.map(a => ({ x2: cx + R * Math.cos(a), y2: cy + R * Math.sin(a) }));
  const data = [
    { label: 'Інтелект', val: 68 },
    { label: 'Креативність', val: 71 },
    { label: 'Сила', val: 55 },
    { label: 'Витривалість', val: 62 },
    { label: 'Дисципліна', val: 48 },
    { label: 'Соціальність', val: 45 }
  ];
  const dataPointsStr = data.map((d, i) => `${cx + ((d.val / 100) * R) * Math.cos(angles[i])},${cy + ((d.val / 100) * R) * Math.sin(angles[i])}`).join(" ");
  const dataDots = data.map((d, i) => ({ x: cx + ((d.val / 100) * R) * Math.cos(angles[i]), y: cy + ((d.val / 100) * R) * Math.sin(angles[i]) }));

  return (
    <div className="lg:col-span-3 bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 flex flex-col justify-between shadow-2xl h-full">
      <h3 className="font-bold text-white text-[15px] mb-1 flex items-baseline gap-2">
         Атрибути <span className="text-[#3B82F6]/60 font-medium text-[12px]">(детальніше)</span>
      </h3>
      <div className="relative w-full flex-1 min-h-[220px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 200">
           {gridPolygons.map((pts, i) => (
             <polygon key={i} points={pts} fill="none" stroke="#1E293B" strokeWidth="1" />
           ))}
           {radialLines.map((line, i) => (
             <line key={i} x1={cx} y1={cy} x2={line.x2} y2={line.y2} stroke="#1E293B" strokeWidth="1" />
           ))}
           <polygon points={dataPointsStr} fill="rgba(250,204,21,0.25)" stroke="#FACC15" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.4))' }} />
           {dataDots.map((dot, i) => (
             <circle key={i} cx={dot.x} cy={dot.y} r="2.5" fill="#FACC15" />
           ))}
        </svg>
        <div className="absolute inset-0 pointer-events-none">
          {data.map((d, i) => {
             const labelR = R + 26;
             const lx = cx + labelR * Math.cos(angles[i]);
             const ly = cy + labelR * Math.sin(angles[i]);
             return (
               <div key={i} className="absolute flex flex-col items-center justify-center" style={{ left: `${(lx / 200) * 100}%`, top: `${(ly / 200) * 100}%`, transform: 'translate(-50%, -50%)' }}>
                 <span className="text-[11px] text-gray-300 font-semibold leading-tight">{d.label}</span>
                 <span className="text-[12px] text-white font-bold">{d.val}</span>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}

export function XPProgress({ appState }) {
  const points = [
    { x: 0,   y: 20 },
    { x: 16.6, y: 35 },
    { x: 33.3, y: 55 },
    { x: 50,   y: 35 },
    { x: 66.6, y: 45 },
    { x: 83.3, y: 70 },
    { x: 100,  y: 60 }
  ];
  const dates = ["23.09", "24.09", "25.09", "26.09", "27.09", "28.09", "29.09"];
  
  const pathData = points.map(p => `${p.x},${100 - p.y}`).join(" ");
  const areaData = `${points[0].x},100 ${pathData} ${points[points.length-1].x},100`;

  const topFactors = [
    { id: 1, name: 'Фітнес',        pct: 75, val: '+28%', icon: 'fa-dumbbell',  colorHex: '#22C55E' },
    { id: 2, name: 'Сон',           pct: 50, val: '+18%', icon: 'fa-moon',      colorHex: '#A855F7' },
    { id: 3, name: 'Читання',       pct: 35, val: '+12%', icon: 'fa-book-open', colorHex: '#FACC15' },
    { id: 4, name: 'Програмування', pct: 25, val: '+9%',  icon: 'fa-code',      colorHex: '#3B82F6' },
  ];

  return (
    <div className="lg:col-span-4 bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 flex flex-col shadow-2xl h-full col-span-1">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center gap-5 mb-5">
        <h3 className="font-bold text-white text-[16px] tracking-wide">Прогрес ХР</h3>
        <div className="flex gap-2 text-[11px] font-semibold">
          <button className="px-3.5 py-1.5 rounded-lg border border-primaryYellow bg-[#0B0F16] text-white shadow-[0_0_10px_rgba(250,204,21,0.1)] transition">7 днів</button>
          <button className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-transparent text-gray-500 hover:text-white transition">30 днів</button>
          <button className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-transparent text-gray-500 hover:text-white transition">90 днів</button>
        </div>
      </div>

      {/* SVG CHART */}
      <div className="relative w-full h-36 mb-5">
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[11px] text-gray-400 font-mono z-10 pr-2">
          <span>1 500</span>
          <span>1 000</span>
          <span>500</span>
          <span>0</span>
        </div>

        {/* Chart Canvas */}
        <div className="absolute left-10 right-2 top-0 bottom-6 border-l border-white/5">
          {/* Grid setup */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0,1,2,3].map(i => <div key={i} className="w-full h-px bg-white/5"></div>)}
          </div>
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {[0,1,2,3,4,5,6].map(i => <div key={i} className="h-full w-px bg-white/5"></div>)}
          </div>

          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FACC15" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={areaData} fill="url(#xpGradient)" />
            <polyline points={pathData} fill="none" stroke="#FACC15" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 3px #FACC15)' }} />
          </svg>
          {points.map((p, i) => (
            <div key={i} className="absolute w-[6px] h-[6px] bg-[#FACC15] rounded-full shadow-[0_0_6px_rgba(250,204,21,1)] transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}></div>
          ))}
        </div>

        {/* X Axis Labels */}
        <div className="absolute left-10 right-2 bottom-0 h-5">
          {dates.map((d, i) => (
            <span key={i} className="absolute transform -translate-x-1/2 text-[10px] text-gray-500 font-mono" style={{ left: `${(i / 6) * 100}%`, bottom: '-2px' }}>
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        <div className="bg-[#0B0F16]/50 rounded-xl border border-white/5 p-4 flex flex-col shadow-sm">
          <h4 className="font-bold text-white text-[14px] mb-3">Топ чинників</h4>
          <div className="space-y-3">
             {topFactors.map(factor => (
               <div key={factor.id} className="relative group">
                 <div className="flex justify-between items-center mb-1.5">
                   <div className="flex items-center gap-2.5">
                     <div 
                        className="w-[22px] h-[22px] rounded-md flex items-center justify-center shadow-lg" 
                        style={{ backgroundColor: factor.colorHex, boxShadow: `0 0 8px ${factor.colorHex}` }}
                      >
                       <i className={`fa-solid ${factor.icon} text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] text-[10px]`}></i>
                     </div>
                     <span className="text-gray-200 text-[11px] font-semibold tracking-wide">{factor.name}</span>
                   </div>
                   <span className="font-mono text-[11px] font-bold drop-shadow-sm" style={{ color: factor.colorHex }}>{factor.val}</span>
                 </div>
                 <div className="ml-8 w-[calc(100%-32px)] bg-[#030508] h-[5px] shadow-inner relative overflow-visible border border-white/5 rounded-full" style={{ borderRadius: '50%' }}>
                   <div 
                      className="absolute top-1/2 -translate-y-1/2 left-0 h-[5px] transition-all duration-300"
                      style={{ 
                        width: `${factor.pct}%`, 
                        backgroundImage: `linear-gradient(90deg, ${factor.colorHex}20 0%, ${factor.colorHex} 50%, ${factor.colorHex}20 100%)`, 
                        boxShadow: `0 0 10px ${factor.colorHex}, 0 0 2px ${factor.colorHex}`,
                        borderRadius: '50%'
                      }}
                   ></div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-[#0B0F16]/50 rounded-xl border border-white/5 p-4 flex flex-col justify-center space-y-4 shadow-sm relative">
           <div>
             <div className="flex items-center gap-3 mb-1">
               <i className="fa-solid fa-bolt text-primaryYellow text-2xl drop-shadow-[0_0_8px_#FACC15] w-5 text-center"></i>
               <span className="text-[12px] text-gray-300 font-semibold tracking-wide">Всього ХР</span>
             </div>
             <div className="text-3xl font-extrabold text-white font-mono ml-8 tracking-tight drop-shadow-sm mb-1">{appState.totalXp || "8 467"}</div>
           </div>
           <div className="border-t border-white/5 pt-3">
             <span className="text-[11px] text-gray-500 font-medium ml-8 block mb-0.5">Сьогодні</span>
             <div className="text-[16px] font-bold text-white font-mono ml-8">1 210</div>
           </div>
           <div className="pt-2 flex items-center justify-between">
             <div className="flex items-start gap-4">
                <i className="fa-solid fa-arrows-to-line text-[#3B82F6] text-[15px] mt-0.5 drop-shadow-[0_0_5px_#3B82F6] w-5 text-center"></i>
                <div className="-ml-1">
                   <span className="text-[11px] text-gray-500 font-medium block mb-0.5">Денний ліміт</span>
                   <div className="text-[16px] font-bold text-white font-mono drop-shadow-sm">1 842</div>
                </div>
             </div>
             <button className="text-gray-600 hover:text-gray-400 transition mb-4">
               <i className="fa-regular fa-circle-question text-[12px]"></i>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

export function QuestsCard() {
  return (
    <div className="lg:col-span-2 bg-cardDark/80 backdrop-blur-xl rounded-2xl border border-white/5 p-5 flex flex-col shadow-2xl h-full">
      <div>
        <h3 className="font-bold text-white text-[15px] mb-4">Квести</h3>
        <div className="flex gap-2 text-[12px] font-semibold mb-3">
          <button className="flex-[1.2] py-2.5 rounded-xl border border-primaryYellow bg-primaryYellow/10 text-white text-center shadow-[inset_0_0_10px_rgba(250,204,21,0.15)] transition">
            Активні (2)
          </button>
          <button className="flex-1 py-2.5 rounded-xl border border-white/5 bg-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5 text-center transition">
            Виконані (3)
          </button>
        </div>
        <div className="space-y-0">
          <QuestItem icon="fa-star" colorHex="#FACC15" name="Прочитати 50 сторінок" prog="32 / 50" xp="+200 XP" pct={64} isFirst={true} />
          <QuestItem icon="fa-dumbbell" colorHex="#3B82F6" name="Тренування 3 рази на тиж..." prog="1 / 3" xp="+300 XP" pct={33} />
        </div>
      </div>
      <a href="#" className="text-xs font-semibold text-[#3B82F6] hover:text-white transition flex items-center justify-end gap-1 mt-auto pt-4">
        Усі квести <i className="fa-solid fa-arrow-right text-[10px]"></i>
      </a>
    </div>
  );
}

function QuestItem({ icon, colorHex, name, prog, xp, pct, isFirst }) {
  return (
    <div className={`py-4 ${isFirst ? 'border-y border-white/5' : 'border-b border-white/5'} transition group`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: colorHex, boxShadow: `0 0 15px ${colorHex}` }}>
          <i className={`fa-solid ${icon} text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] text-sm`}></i>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-start mb-0.5">
            <p className="font-semibold text-gray-200 text-[13px] leading-tight truncate mr-2">{name}</p>
            <span className="text-primaryYellow font-bold font-mono text-[13px] drop-shadow-[0_0_5px_rgba(250,204,21,0.5)] whitespace-nowrap">{xp}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium mb-2">
            <span className="font-mono tracking-wide">{prog}</span>
          </div>
          <div className="w-full bg-[#030508] h-[5px] shadow-inner relative overflow-visible border border-white/5" style={{ borderRadius: '50%' }}>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-[5px] transition-all duration-300"
                 style={{ 
                   width: `${pct}%`, 
                   backgroundImage: `linear-gradient(90deg, ${colorHex}20 0%, ${colorHex} 50%, ${colorHex}20 100%)`, 
                   boxShadow: `0 0 15px ${colorHex}, 0 0 5px ${colorHex}`,
                   borderRadius: '50%' 
                 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
