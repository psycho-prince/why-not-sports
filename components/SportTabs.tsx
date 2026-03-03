"use client";

import { Trophy, CircleDot, Disc, Activity, HelpCircle, Award } from "lucide-react";
import Link from "next/link";

interface SportTabsProps {
  active: string;
  onChange: (sport: string) => void;
}

const sports = [
  { id: "all", name: "All", icon: Activity, color: "text-emerald-500" },
  { id: "cricket", name: "Cricket", icon: CircleDot, color: "text-orange-500" }, 
  { id: "football", name: "Football", icon: Trophy, color: "text-blue-500" },
  { id: "basketball", name: "Basketball", icon: Award, color: "text-red-500" },
  { id: "tennis", name: "Tennis", icon: Disc, color: "text-purple-500" },
];

export default function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex overflow-x-auto gap-4 pb-6 px-1 scrollbar-hide no-scrollbar -mx-4 md:mx-0">
      {sports.map((sport) => {
        const isActive = active === sport.id;
        const Icon = sport.icon;

        return (
          <button
            key={sport.id}
            role="tab"
            aria-selected={isActive}
            aria-controls="live-board-results"
            id={`tab-${sport.id}`}
            onClick={() => onChange(sport.id)}
            className={`group flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-sm border ${
              isActive
                ? "bg-green-600 text-white border-green-500 shadow-2xl shadow-green-600/40 scale-105"
                : "bg-white dark:bg-zinc-900 text-gray-500 dark:text-zinc-500 border-gray-100 dark:border-zinc-800 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/5"
            }`}
          >
            <Icon size={20} className={`${isActive ? "text-white" : sport.color} transition-transform group-hover:scale-110 duration-500`} aria-hidden="true" />
            {sport.name}
          </button>
        );
      })}

      <div className="h-10 w-[1px] bg-gray-200 dark:bg-zinc-800 mx-2 self-center flex-shrink-0" />

      <Link
        href="/highlights"
        className="flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/20 hover:scale-105 transition-all duration-500"
      >
        <Disc size={20} className="animate-spin-slow" aria-hidden="true" />
        Highlights
      </Link>
    </div>
  );
}
