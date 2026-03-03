"use client";

import { Trophy, CircleDot, Disc, Activity, HelpCircle, Award } from "lucide-react";
import Link from "next/link";

interface SportTabsProps {
  active: string;
  onChange: (sport: string) => void;
}

const sports = [
  { id: "all", name: "All Sports", icon: Activity },
  { id: "cricket", name: "Cricket", icon: CircleDot },
  { id: "football", name: "Football", icon: Trophy },
  { id: "basketball", name: "Basketball", icon: Award },
  { id: "tennis", name: "Tennis", icon: Disc },
];

export default function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex flex-col gap-6 py-10 px-4 bg-gray-50/50 dark:bg-zinc-900/20 rounded-[3rem] border border-gray-100 dark:border-zinc-800/50 mb-12">
      <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide no-scrollbar" role="tablist" aria-label="Sports categories">
        {sports.map((sport) => {
          const Icon = sport.icon;
          const isActive = active === sport.id;

          return (
            <button
              key={sport.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="live-board-results"
              id={`tab-${sport.id}`}
              onClick={() => onChange(sport.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-300 text-[10px] font-black uppercase tracking-widest shadow-sm ${
                isActive
                  ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-600/20 scale-105"
                  : "bg-white dark:bg-zinc-950 text-gray-500 dark:text-zinc-500 border-gray-100 dark:border-zinc-800 hover:border-green-500/50 hover:text-green-500 dark:hover:text-white"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              {sport.name}
            </button>
          );
        })}

        <div className="h-10 w-[1px] bg-gray-200 dark:bg-zinc-800 mx-2 self-center hidden md:block" />

        <Link
          href="/highlights"
          className="flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl border bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50 hover:bg-purple-600 hover:text-white transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          <Disc size={16} className="animate-spin-slow" aria-hidden="true" />
          Highlights
        </Link>
        <Link
          href="/watch-free-legally"
          className="flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl border bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50 hover:bg-blue-600 hover:text-white transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          <HelpCircle size={16} aria-hidden="true" />
          Free Access
        </Link>
      </div>
    </div>
  );
}
