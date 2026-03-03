"use client";
import { Radio, ChevronRight, Timer, Trophy } from "lucide-react";
import Link from "next/link";
import { UnifiedMatch } from "@/lib/api";

export default function LiveMatchCard({ match }: { match: UnifiedMatch }) {
  const isLive = match.isLive;
  
  return (
    <Link href={`/match/${match.id}?sport=${match.sport}`} className="group block h-full">
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] p-10 hover:border-green-500 transition-all duration-500 flex flex-col h-full relative overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none hover:shadow-green-500/10 hover:scale-[1.02]">
        
        {/* League Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-zinc-950 px-4 py-2 rounded-2xl border border-gray-100 dark:border-zinc-800">
             {match.leagueLogo && (
               <img src={match.leagueLogo} alt={match.league} className="w-5 h-5 object-contain" />
             )}
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500 truncate max-w-[120px]">
               {match.league}
             </span>
          </div>
          
          {isLive ? (
            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-red-600 text-white text-[10px] font-black animate-pulse shadow-lg shadow-red-600/20">
              <Radio size={12} />
              <span>LIVE {match.elapsed && `${match.elapsed}'`}</span>
            </div>
          ) : (
            <div className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest bg-gray-50 dark:bg-zinc-950 px-4 py-2 rounded-2xl">
              {match.status}
            </div>
          )}
        </div>

        {/* Teams & Scores */}
        <div className="flex-grow space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-gray-50 dark:bg-zinc-950 p-3 rounded-3xl shadow-inner group-hover:bg-green-500/5 transition-colors duration-500">
                {match.homeLogo ? (
                  <img src={match.homeLogo} alt={match.homeTeam} className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-zinc-800 dark:text-zinc-600"><Trophy size={24}/></div>
                )}
              </div>
              <h3 className="text-gray-900 dark:text-white font-black text-2xl uppercase italic tracking-tighter group-hover:text-green-500 transition-all duration-500 truncate max-w-[160px]">
                {match.homeTeam}
              </h3>
            </div>
            <span className="text-5xl font-black italic text-gray-900 dark:text-white tabular-nums tracking-tighter shadow-green-500/20">{match.homeScore}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-gray-50 dark:bg-zinc-950 p-3 rounded-3xl shadow-inner group-hover:bg-green-500/5 transition-colors duration-500">
                {match.awayLogo ? (
                  <img src={match.awayLogo} alt={match.awayTeam} className="w-12 h-12 object-contain" />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-zinc-800 dark:text-zinc-600"><Trophy size={24}/></div>
                )}
              </div>
              <h3 className="text-gray-900 dark:text-white font-black text-2xl uppercase italic tracking-tighter group-hover:text-green-500 transition-all duration-500 truncate max-w-[160px]">
                {match.awayTeam}
              </h3>
            </div>
            <span className="text-5xl font-black italic text-gray-900 dark:text-white tabular-nums tracking-tighter shadow-green-500/20">{match.awayScore}</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-between items-center pt-10 mt-6 border-t border-gray-100 dark:border-zinc-800/50">
          <div className="flex items-center text-gray-400 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest">
            {match.elapsed ? (
              <span className="flex items-center gap-2 bg-green-500/5 text-green-600 dark:text-green-500 px-3 py-1 rounded-full"><Timer size={14} /> {match.elapsed}' Match Flow</span>
            ) : (
              <span className="flex items-center gap-2"><Trophy size={14} /> Official Feed</span>
            )}
          </div>
          <div className="bg-green-600 text-white p-3 rounded-2xl transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-green-600/20">
            <ChevronRight size={20} />
          </div>
        </div>

        {/* Pro Background Accents */}
        {isLive && (
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/5 blur-[60px] pointer-events-none" />
        )}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-600/5 blur-[60px] pointer-events-none" />
      </div>
    </Link>
  );
}
