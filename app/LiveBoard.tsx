"use client";
import { useEffect, useState, useCallback } from "react";
import SportTabs from "@/components/SportTabs";
import LiveMatchCard from "@/components/LiveMatchCard";
import { UnifiedMatch } from "@/lib/api";
import { Loader2, RefreshCw, AlertCircle, Coffee, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function LiveBoard({ initialMatches }: { initialMatches: UnifiedMatch[] }) {
  const [sport, setSport] = useState<string>('all');
  const [matches, setMatches] = useState<UnifiedMatch[]>(initialMatches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isAuto = false) => {
    if (!isAuto) setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/live-scores?sport=${sport}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError("Unable to sync scores. Don't worry, we're retrying! ☕");
      console.error(err);
    } finally {
      if (!isAuto) setLoading(false);
    }
  }, [sport]);

  useEffect(() => {
    if (sport !== 'all' || matches.length === 0) {
      loadData();
    }
    const interval = setInterval(() => loadData(true), 45000);
    return () => clearInterval(interval);
  }, [sport, loadData]);

  return (
    <>
      <SportTabs active={sport} onChange={setSport} />
      
      <div className="flex items-center justify-between mb-12 mt-16 px-4">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute inset-0 opacity-40" />
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] relative z-10" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white leading-none">
            Live Feed
          </h2>
        </div>
        
        <button 
          onClick={() => loadData()}
          disabled={loading}
          className="bg-white text-black p-4 rounded-2xl hover:bg-green-500 hover:text-white transition-all transform hover:rotate-12 active:scale-95 disabled:opacity-50 shadow-xl shadow-white/5"
          title="Refresh Feed"
        >
          <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-8 py-6 rounded-[2.5rem] mb-12 flex items-center gap-4 text-base font-bold italic tracking-tight shadow-lg">
          <AlertCircle size={24} />
          {error}
        </div>
      )}

      {loading && matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-48 bg-zinc-900/20 rounded-[4rem] border border-zinc-900/50">
          <Loader2 className="animate-spin text-green-500 mb-8" size={80} />
          <p className="text-zinc-400 font-black uppercase italic tracking-[0.3em] text-xs">Calibrating Broadcasts...</p>
        </div>
      ) : (
        <div id="live-board-results" role="tabpanel" aria-labelledby={`tab-${sport}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.length > 0 ? (
            matches.map((match) => <LiveMatchCard key={`${match.sport}-${match.id}`} match={match} />)
          ) : (
            <div className="col-span-full py-40 px-10 text-center rounded-[4rem] border-2 border-dashed border-zinc-900 bg-zinc-950/20 shadow-inner">
              <div className="max-w-xl mx-auto flex flex-col items-center">
                <div className="bg-zinc-900 p-8 rounded-[3rem] mb-10 text-green-500 shadow-2xl">
                   <Coffee size={80} strokeWidth={1} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6 tracking-tighter">No live action? <br />Grab a chai! ☕</h2>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-12">
                  The pitch is quiet right now. Why not relive some classic moments or plan your next legal viewing?
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                   <Link href="/highlights" className="bg-white text-black px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-green-500 hover:text-white transition-all inline-flex items-center gap-3">
                      <PlayCircle size={18} /> Watch Replays
                   </Link>
                   <Link href="/watch-free-legally" className="bg-zinc-800 text-white px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] hover:bg-zinc-700 transition inline-flex items-center">
                      Legal Guide
                   </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
