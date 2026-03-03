"use client";
import { useEffect, useState, useCallback } from "react";
import SportTabs from "@/components/SportTabs";
import LiveMatchCard from "@/components/LiveMatchCard";
import { UnifiedMatch } from "@/lib/api";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";

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
      setError("Unable to update scores. Checking again in a moment...");
      console.error(err);
    } finally {
      if (!isAuto) setLoading(false);
    }
  }, [sport]);

  useEffect(() => {
    // Skip initial fetch for 'all' as we have initialMatches
    if (sport !== 'all' || matches.length === 0) {
      loadData();
    }

    const interval = setInterval(() => loadData(true), 45000); // 45s refresh
    return () => clearInterval(interval);
  }, [sport, loadData]);

  return (
    <>
      <SportTabs active={sport} onChange={setSport} />
      
      <div className="flex items-center justify-between mb-12 mt-12">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white flex items-center gap-4">
            Live Feed
            {loading && <Loader2 className="animate-spin text-zinc-700 w-6 h-6" />}
          </h2>
        </div>
        
        <button 
          onClick={() => loadData()}
          disabled={loading}
          className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl hover:bg-zinc-800 transition text-zinc-400 disabled:opacity-50"
          title="Refresh Scores"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-6 py-4 rounded-[1.5rem] mb-12 flex items-center gap-3 text-sm font-bold uppercase italic tracking-widest">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {loading && matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="animate-spin text-green-500 mb-6" size={60} />
          <p className="text-zinc-600 font-black uppercase italic tracking-widest text-sm">Syncing with World Events...</p>
        </div>
      ) : (
        <div id="live-board-results" role="tabpanel" aria-labelledby={`tab-${sport}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.length > 0 ? (
            matches.map((match) => <LiveMatchCard key={`${match.sport}-${match.id}`} match={match} />)
          ) : (
            <div className="col-span-full py-40 text-center rounded-[3.5rem] border-2 border-dashed border-zinc-900 bg-zinc-950/30">
              <div className="max-w-md mx-auto">
                <p className="text-white text-3xl font-black uppercase italic mb-4 tracking-tighter">No Active Games</p>
                <p className="text-zinc-500 font-medium leading-relaxed">It's quiet on the pitch right now. Check back soon for upcoming fixtures or select another sport.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
