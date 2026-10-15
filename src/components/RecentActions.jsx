import React from 'react';

export default function RecentActions() {
  return (
    <div className="lg:col-span-2 bg-cardDark rounded-2xl border border-cardBorder p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-white text-base mb-3">Останні дії</h3>
        <div className="space-y-3">
          <ActionItem icon="fa-dumbbell" iconRing="bg-red-500/20 text-red-400" name="Тренування (фітнес)" details="45 хв • Якість 2" xp="+90 XP" time="22:10" />
          <ActionItem icon="fa-book" iconRing="bg-primaryYellow/20 text-primaryYellow" name="Читання книги" details="60 хв • Якість 3" xp="+72 XP" time="19:34" />
          <ActionItem icon="fa-code" iconRing="bg-accentBlue/20 text-accentBlue" name="Програмування" details="120 хв • Якість 2" xp="+120 XP" time="16:20" />
          <ActionItem icon="fa-moon" iconRing="bg-accentPurple/20 text-accentPurple" name="Сон" details="8 год • Якість 3" xp="+40 XP" time="07:45" />
          <ActionItem icon="fa-droplet" iconRing="bg-accentCyan/20 text-accentCyan" name="Вода" details="1 л • Якість 3" xp="+10 XP" time="12:03" />
        </div>
      </div>
      <a href="#" className="text-xs font-semibold text-accentBlue hover:underline flex items-center justify-end gap-1 mt-4">
        Усі події <i className="fa-solid fa-arrow-right text-[10px]"></i>
      </a>
    </div>
  );
}

function ActionItem({ icon, iconRing, name, details, xp, time }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-lg ${iconRing} flex items-center justify-center shrink-0`}>
          <i className={`fa-solid ${icon} text-xs`}></i>
        </div>
        <div>
          <p className="font-semibold text-white text-[11px]">{name}</p>
          <p className="text-[10px] text-gray-500">{details}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-primaryYellow font-bold font-mono text-[11px] block">{xp}</span>
        <span className="text-[9px] text-gray-500 font-mono">{time}</span>
      </div>
    </div>
  );
}
