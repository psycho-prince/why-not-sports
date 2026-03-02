"use client";
import { useEffect, useState } from "react";
import SportTabs from "@/components/SportTabs";
import LiveMatchCard from "@/components/LiveMatchCard";
import { getLiveScores, SportType } from "@/lib/api";
import { Zap, ArrowRight, Loader2, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [sport, setSport] = useState<SportType>('all');
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const data = await getLiveScores(sport);
    setMatches(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [sport]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="relative rounded-[3rem] p-10 md:p-20 mb-16 overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-3 text-green-500 mb-8">
            <Globe size={20} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live 2026 World Events</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter italic uppercase">
            Real Scores.<br /><span className="text-green-500">Legal Access.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            No risks. Just live results and the ultimate guide to watching major sports legally for free.
          </p>
          <Link href="/watch-free-legally" className="bg-white text-black px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-green-500 hover:text-white transition inline-flex items-center">
            How to watch free <ArrowRight size={18} className="ml-3" />
          </Link>
        </div>
      </div>
      <SportTabs active={sport} onChange={setSport} />
      <div className="flex items-center justify-between mb-12 mt-4">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white">Live Board</h2>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="animate-spin text-green-500 mb-4" size={40} />
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Fetching Data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.length > 0 ? matches.map((match) => <LiveMatchCard key={match.id} match={match} />) : (
            <div className="col-span-full py-40 text-center rounded-[3rem] border-2 border-dashed border-zinc-900 bg-zinc-950/30 text-zinc-600 font-black uppercase italic">No Active Games</div>
          )}
        </div>
      )}
    </div>
  );
}
