"use client";
import { Trophy, CircleDot, Disc, Activity, HelpCircle, Basketball } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const sports = [
  { id: "all", name: "All Sports", icon: Activity },
  { id: "cricket", name: "Cricket", icon: CircleDot },
  { id: "football", name: "Football", icon: Trophy },
  { id: "basketball", name: "Basketball", icon: Basketball }, // Corrected: Basketball is now imported
  { id: "tennis", name: "Tennis", icon: Disc },
  { name: "Highlights", icon: Disc, href: "/highlights" },
  { name: "Guide", icon: HelpCircle, href: "/watch-free-legally" },
];

export default function SportTabs({ active }: { active?: string }) {
  const searchParams = useSearchParams();
  const currentSport = searchParams.get('sport') || 'all';

  return (
    <div className="flex space-x-2 overflow-x-auto pb-6 scrollbar-hide">
      {sports.map((sport) => (
        <Link
          key={sport.id}
          href={sport.href || `/matches?sport=${sport.id}`}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-2xl border transition-all font-bold text-sm whitespace-nowrap ${
            currentSport === sport.id
            ? "bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/20"
            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          <sport.icon size={16} />
          <span>{sport.name}</span>
        </Link>
      ))}
    </div>
  );
}
