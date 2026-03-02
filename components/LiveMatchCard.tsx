"use client";
import { Radio, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LiveMatchCard({ match }: { match: any }) {
  const isCricket = match.sport === 'cricket';
  const title = isCricket ? match.name : `${match.strHomeTeam} vs ${match.strAwayTeam}`;
  const status = isCricket ? match.status : (match.strStatus || 'Live');
  const score = isCricket ? "" : `${match.intHomeScore || 0} - ${match.intAwayScore || 0}`;
  const league = isCricket ? "ICC World Events" : (match.strLeague || "Pro League");

  return (
    <Link href={isCricket ? `/match/${match.id}?sport=cricket` : `/match/${match.id}?sport=football`} className="group block">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 hover:border-green-500/50 transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{league}</span>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black animate-pulse border border-red-500/20">
            <Radio size={10} />
            <span>LIVE</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-white font-black text-xl mb-2 leading-tight group-hover:text-green-400 transition italic">{title}</h3>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{status}</p>
        </div>
        <div className="flex justify-between items-center pt-5 border-t border-zinc-800/50">
          <div className="text-2xl font-mono font-black text-white">{score}</div>
          <div className="text-green-500 flex items-center text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">
            Stats <ChevronRight size={14} className="ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
