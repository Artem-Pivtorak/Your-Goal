import React, { useRef, useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import CharacterOverview from './CharacterOverview';
import SkillsPanel from './SkillsPanel';
import ActionTracker from './ActionTracker';
import RecentActions from './RecentActions';
import { BodyMap, AttributeRadar, XPProgress, QuestsCard } from './StatsPanel';

function SortableItem({ id, children, className }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className={`${className} relative group/drag flex-shrink-0 origin-center`}>
      
      {/* Safely retained grab handle to prevent React event bubbling crashes */}
      <div 
        {...attributes} 
        {...listeners} 
        className={`absolute top-2 left-1/2 -translate-x-1/2 transition-opacity z-50 cursor-grab active:cursor-grabbing bg-[#0B0F16]/90 backdrop-blur px-10 py-1.5 rounded-b-xl border border-white/20 border-t-0 shadow-[0_5px_15px_rgba(0,0,0,0.8)] text-gray-400 hover:text-white ${isDragging ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/drag:opacity-100'}`}
        title="Перетягнути вікно"
      >
        <i className="fa-solid fa-grip-lines drop-shadow-md"></i>
      </div>

      {/* Retain component mount state natively */}
      <div className={`w-full h-full ${isDragging ? 'opacity-0 pointer-events-none invisible' : ''}`}>
         {children}
      </div>

      {/* Placeholder rendered seamlessly on top if dragged */}
      {isDragging && (
        <div className="absolute inset-0 w-full h-full rounded-2xl border-2 border-white/50 border-dashed bg-white/5 shadow-[0_0_25px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center overflow-hidden backdrop-blur-md">
           <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 animate-pulse"></div>
           <span className="text-white/60 font-bold uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm z-10 flex flex-col items-center gap-2">
              <i className="fa-solid fa-crosshairs text-xl"></i>
              Відпустити
           </span>
        </div>
      )}

    </div>
  );
}

export default function MainDashboard({ appState, addXP }) {
  const scrollRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const initialItems = [
    { id: 'character', comp: <CharacterOverview appState={appState} />, cls: 'w-[850px] shrink-0 h-full' },
    { id: 'skills', comp: <SkillsPanel />, cls: 'w-[300px] shrink-0' },
    { id: 'action', comp: <ActionTracker addXP={addXP} />, cls: 'w-[340px] shrink-0' },
    { id: 'recent', comp: <RecentActions />, cls: 'w-[320px] shrink-0' },
    { id: 'bodymap', comp: <BodyMap />, cls: 'w-[620px] shrink-0' },
    { id: 'attributes', comp: <AttributeRadar />, cls: 'w-[340px] shrink-0' },
    { id: 'xpprogress', comp: <XPProgress appState={appState} />, cls: 'w-[450px] shrink-0' },
    { id: 'quests', comp: <QuestsCard />, cls: 'w-[340px] shrink-0' },
  ];

  const [items, setItems] = useState(initialItems.map(i => i.id));

  // Kinetic Horizontal Scroll Physics
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let vel = 0;
    let rafId = null;

    const tick = () => {
      el.scrollLeft += vel;
      vel *= 0.88; // Friction factor for smooth glide
      if (Math.abs(vel) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        vel = 0;
        rafId = null;
      }
    };

    const handleNativeWheel = (e) => {
      e.preventDefault(); 
      // Translate vertical mouse wheel delta to horizontal velocity
      vel += e.deltaY * 0.25; 
      if (!rafId && Math.abs(vel) > 0.5) {
        rafId = requestAnimationFrame(tick);
      }
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleNativeWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeItemDef = activeId ? initialItems.find(i => i.id === activeId) : null;

  return (
    <main 
      ref={scrollRef} 
      className="flex-1 overflow-x-auto overflow-y-hidden pl-5 py-6 w-full h-full scrollbar-hide"
    >
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div className="flex flex-row gap-6 h-full w-max pr-8 items-stretch pb-2">
            {items.map(id => {
              const itemDef = initialItems.find(i => i.id === id);
              if (!itemDef) return null;
              return (
                <SortableItem key={id} id={id} className={itemDef.cls}>
                  {itemDef.comp}
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>

        {/* Drag Overlay preserves exact original dimensions and adds visual elevation/rotation */}
        <DragOverlay zIndex={1000}>
          {activeItemDef ? (
             <div 
               style={{ height: 'calc(100vh - 8rem)' }}
               className={`${activeItemDef.cls} rotate-[1.5deg] scale-[1.01] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/20 rounded-2xl cursor-grabbing`}
             >
                <div className="pointer-events-none opacity-90 h-full w-full flex-shrink-0">
                   {activeItemDef.comp}
                </div>
             </div>
          ) : null}
        </DragOverlay>

      </DndContext>
    </main>
  );
}
