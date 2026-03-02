"use client";
import { Trophy, CircleDot, Disc, Activity, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const sports = [
  { name: "All", icon: Activity, href: "/" },
  { name: "Cricket", icon: CircleDot, href: "/matches?sport=cricket" },
  { name: "Football", icon: Trophy, href: "/matches?sport=football" },
  { name: "Highlights", icon: Disc, href: "/highlights" },
  { name: "Guide", icon: HelpCircle, href: "/watch-free-legally" },
];

export default function SportSelector() {
  const searchParams = useSearchParams();
  const active = searchParams.get('sport') || 'all';

  return (
    <div className="flex space-x-2 overflow-x-auto pb-6 scrollbar-hide">
      {sports.map((sport) => (
        <Link
          key={sport.name}
          href={sport.href}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-2xl border transition font-bold text-sm ${
            active === sport.name.toLowerCase() || (active === 'all' && sport.name === 'All')
            ? "bg-green-600 border-green-500 text-white" 
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
