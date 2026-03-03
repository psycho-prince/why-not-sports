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
            <div className="w-6 h-6 rounded-full bg-red-500 animate-ping absolute inset-0 opacity-40" />
            <div className="w-6 h-6 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] relative z-10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-gray-900 dark:text-white leading-none">
            Live Now
          </h2>
        </div>
        
        <button 
          onClick={() => loadData()}
          disabled={loading}
          className="bg-green-600 text-white p-6 rounded-[2rem] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all transform hover:rotate-12 active:scale-95 disabled:opacity-50 shadow-2xl shadow-green-600/20"
          title="Refresh Feed"
          aria-label="Refresh current scores"
        >
          <RefreshCw size={32} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="bg-amber-500/10 border-2 border-amber-500/20 text-amber-600 dark:text-amber-500 px-10 py-8 rounded-[3rem] mb-12 flex items-center gap-6 text-2xl font-bold italic tracking-tight shadow-xl">
          <AlertCircle size={36} />
          {error}
        </div>
      )}

      {loading && matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-48 bg-zinc-900/5 dark:bg-zinc-900/20 rounded-[4rem] border-2 border-gray-100 dark:border-zinc-900/50">
          <div className="w-24 h-24 border-8 border-green-200 border-t-green-600 rounded-full animate-spin mb-10" />
          <p className="text-gray-900 dark:text-zinc-400 font-bold text-3xl uppercase italic tracking-widest">Loading games...</p>
          <p className="text-gray-500 dark:text-zinc-500 text-xl mt-4">Just a moment, preparing your scoreboard! 🏏</p>
        </div>
      ) : (
        <div id="live-board-results" role="tabpanel" aria-labelledby={`tab-${sport}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {matches.length > 0 ? (
            matches.map((match) => <LiveMatchCard key={`${match.sport}-${match.id}`} match={match} />)
          ) : (
            <div className="col-span-full py-40 px-10 text-center rounded-[4rem] border-2 border-dashed border-gray-200 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/20 shadow-inner">
              <div className="max-w-2xl mx-auto flex flex-col items-center">
                <div className="bg-white dark:bg-zinc-900 p-12 rounded-[4rem] mb-12 text-green-500 shadow-2xl border border-gray-100 dark:border-zinc-800">
                   <span className="text-9xl">🏏🍵</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black uppercase italic text-gray-900 dark:text-white mb-8 tracking-tighter leading-tight">No live action right now</h2>
                <p className="text-gray-600 dark:text-zinc-500 text-2xl md:text-3xl font-medium leading-tight mb-16">
                  It's quiet on the pitch. Relax, grab a chai, and come back soon! Or watch some classic highlights below.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-8 w-full max-w-md">
                   <Link href="/highlights" className="bg-purple-600 text-white px-12 py-8 rounded-[2.5rem] font-bold text-2xl hover:bg-black transition-all shadow-2xl shadow-purple-600/20 flex items-center justify-center gap-4">
                      <PlayCircle size={32} /> Highlights
                   </Link>
                   <Link href="/watch-free-legally" className="bg-blue-600 text-white px-12 py-8 rounded-[2.5rem] font-bold text-2xl hover:bg-black transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-4">
                      🆓 Free Guide
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
