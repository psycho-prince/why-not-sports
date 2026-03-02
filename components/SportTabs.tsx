"use client";
import { Trophy, CircleDot, Activity, Basketball } from "lucide-react";

const sports = [
  { id: 'all', name: "All Sports", icon: Activity },
  { id: 'cricket', name: "Cricket", icon: CircleDot },
  { id: 'football', name: "Football", icon: Trophy },
  { id: 'basketball', name: "Basketball", icon: Basketball },
];

export default function SportTabs({ active, onChange }: { active: string, onChange: (id: any) => void }) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-6 scrollbar-hide">
      {sports.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-2xl border transition-all font-bold text-sm whitespace-nowrap ${
            active === s.id ? "bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/20" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          <s.icon size={18} />
          <span>{s.name}</span>
        </button>
      ))}
    </div>
  );
}
