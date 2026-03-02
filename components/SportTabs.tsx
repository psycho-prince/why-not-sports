"use client";

import { Trophy, CircleDot, Disc, Activity, HelpCircle, Award } from "lucide-react";

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
    <div className="flex flex-wrap gap-2 pb-6 border-b">
      {sports.map((sport) => {
        const Icon = sport.icon;
        const isActive = active === sport.id;

        return (
          <button
            key={sport.id}
            onClick={() => onChange(sport.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent"
            }`}
          >
            <Icon className="w-4 h-4" />
            {sport.name}
          </button>
        );
      })}

      {/* Separate pages */}
      <a
        href="/highlights"
        className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-accent transition-colors"
      >
        <Disc className="w-4 h-4" />
        Highlights
      </a>
      <a
        href="/watch-free-legally"
        className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-accent transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        Guide
      </a>
    </div>
  );
}
