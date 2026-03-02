"use client";
import { useEffect, useState } from "react";
import SportTabs from "@/components/SportTabs";
import LiveMatchCard from "@/components/LiveMatchCard";
// Removed: import { SportType } from "@/lib/api"; // SportType is not directly used as a type here anymore
import { Loader2 } from "lucide-react";

export default function LiveBoard({ initialMatches }: { initialMatches: any[] }) {
  const [sport, setSport] = useState<string>('all'); // Changed type to string
  const [matches, setMatches] = useState<any[]>(initialMatches);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await fetch(`/api/live-scores?sport=${sport}`);
      const data = await res.json();
      setMatches(data);
      setLoading(false);
    };

    // Don't refetch on initial 'all' render, as we have initialMatches
    if (sport !== 'all' || matches !== initialMatches) {
        loadData();
    }

    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [sport]);

  return (
    <>
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.length > 0 ? matches.map((match) => <LiveMatchCard key={match.id} match={match} />) : (
            <div className="col-span-full py-40 text-center rounded-[3rem] border-2 border-dashed border-zinc-900 bg-zinc-950/30 text-zinc-600 font-black uppercase italic">No Active Games</div>
          )}
        </div>
      )}
    </>
  );
}
