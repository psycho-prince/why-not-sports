"use client";

import { Trophy, CircleDot, Disc, Activity, HelpCircle, Award } from "lucide-react";
import Link from "next/link";

interface SportTabsProps {
  active: string;
  onChange: (sport: string) => void;
}

const sports = [
  { id: "all", label: "🌍 All Sports", icon: Activity },
  { id: "cricket", label: "🏏 Cricket", icon: CircleDot },
  { id: "football", label: "⚽ Football", icon: Trophy },
  { id: "basketball", label: "🏀 Basketball", icon: Award },
  { id: "tennis", label: "🎾 Tennis", icon: Disc },
];

export default function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex overflow-x-auto gap-5 pb-8 px-2 scrollbar-hide no-scrollbar -mx-4 md:mx-0" role="tablist" aria-label="Sports categories">
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
            className={`group flex-shrink-0 flex items-center gap-4 px-10 py-6 rounded-[2.5rem] font-bold text-xl md:text-2xl transition-all duration-500 shadow-lg border-2 ${
              isActive
                ? "bg-green-600 text-white border-green-500 shadow-2xl shadow-green-600/40 scale-105"
                : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-400 border-gray-100 dark:border-zinc-800 hover:border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950/30"
            }`}
            aria-label={`Select ${sport.label} - tap to see scores`}
          >
            <Icon size={28} className={isActive ? "text-white" : "text-gray-400"} aria-hidden="true" />
            {sport.label}
          </button>
        );
      })}

      <div className="h-16 w-[2px] bg-gray-200 dark:bg-zinc-800 mx-2 self-center flex-shrink-0 rounded-full" />

      <Link
        href="/highlights"
        className="flex-shrink-0 flex items-center gap-4 px-10 py-6 rounded-[2.5rem] font-bold text-xl md:text-2xl bg-purple-600 text-white shadow-2xl shadow-purple-600/30 hover:scale-105 transition-all duration-500"
        aria-label="Watch highlights - tap for videos"
      >
        <Disc size={28} className="animate-spin-slow" aria-hidden="true" />
        📺 Highlights
      </Link>

      <Link
        href="/watch-free-legally"
        className="flex-shrink-0 flex items-center gap-4 px-10 py-6 rounded-[2.5rem] font-bold text-xl md:text-2xl bg-blue-600 text-white shadow-2xl shadow-blue-600/30 hover:scale-105 transition-all duration-500"
        aria-label="Learn how to watch free - tap for guide"
      >
        <HelpCircle size={28} aria-hidden="true" />
        🆓 Watch Free
      </Link>
    </div>
  );
}
