"use client";
import { Radio, ChevronRight, Timer } from "lucide-react";
import Link from "next/link";
import { UnifiedMatch } from "@/lib/api";

export default function LiveMatchCard({ match }: { match: UnifiedMatch }) {
  const isLive = match.isLive;
  
  return (
    <Link href={`/match/${match.id}?sport=${match.sport}`} className="group block h-full">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 hover:border-green-500/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
        
        {/* League Info & Live Badge */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
             {match.leagueLogo && (
               <img src={match.leagueLogo} alt={match.league} className="w-6 h-6 object-contain opacity-50" />
             )}
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 truncate max-w-[150px]">
               {match.league}
             </span>
          </div>
          
          {isLive ? (
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black animate-pulse border border-red-500/20">
              <Radio size={10} />
              <span>LIVE {match.elapsed && `${match.elapsed}'`}</span>
            </div>
          ) : (
            <div className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">
              {match.status}
            </div>
          )}
        </div>

        {/* Teams & Scores */}
        <div className="flex-grow space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {match.homeLogo && <img src={match.homeLogo} alt={match.homeTeam} className="w-10 h-10 object-contain" />}
              <h3 className="text-white font-black text-lg uppercase italic tracking-tighter group-hover:text-green-400 transition truncate max-w-[140px]">
                {match.homeTeam}
              </h3>
            </div>
            <span className="text-3xl font-mono font-black text-white">{match.homeScore}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {match.awayLogo && <img src={match.awayLogo} alt={match.awayTeam} className="w-10 h-10 object-contain" />}
              <h3 className="text-white font-black text-lg uppercase italic tracking-tighter group-hover:text-green-400 transition truncate max-w-[140px]">
                {match.awayTeam}
              </h3>
            </div>
            <span className="text-3xl font-mono font-black text-white">{match.awayScore}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 mt-4 border-t border-zinc-800/50">
          <div className="flex items-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            {match.elapsed ? (
              <span className="flex items-center gap-1.5"><Timer size={12} /> {match.elapsed}' Played</span>
            ) : (
              <span>Match Details</span>
            )}
          </div>
          <div className="text-green-500 flex items-center text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Analytics <ChevronRight size={14} className="ml-1" />
          </div>
        </div>

        {/* Background glow for live matches */}
        {isLive && (
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/5 blur-[50px] pointer-events-none" />
        )}
      </div>
    </Link>
  );
}
