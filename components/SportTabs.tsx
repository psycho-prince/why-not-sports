"use client";

import { Trophy, CircleDot, Disc, Activity, HelpCircle, Award } from "lucide-react";
import Link from "next/link";

interface SportTabsProps {
  active: string;
  onChange: (sport: string) => void;
}

const sports = [
  { id: "all", name: "All Sports", icon: Activity },
  { id: "football", name: "Football", icon: Trophy },
  { id: "cricket", name: "Cricket", icon: CircleDot },
  { id: "basketball", name: "Basketball", icon: Award },
  { id: "tennis", name: "Tennis", icon: Disc },
];

export default function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-8 border-b border-zinc-900" role="tablist" aria-label="Sports categories">
      <div className="flex flex-wrap gap-3">
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
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 text-[10px] font-black uppercase tracking-widest ${
                isActive
                  ? "bg-green-600 text-white border-green-600 shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                  : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
              {sport.name}
            </button>
          );
        })}
      </div>

      <div className="h-4 w-[1px] bg-zinc-800 mx-2 hidden md:block" />

      <div className="flex gap-3">
        <Link
          href="/highlights"
          className="flex items-center gap-3 px-6 py-3 rounded-2xl border bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-green-600 hover:text-white transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          <Disc size={14} className="text-green-500" aria-hidden="true" />
          Highlights
        </Link>
      </div>
    </div>
  );
}
