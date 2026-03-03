import { getMatchDetail } from "@/lib/api";
import { ChevronLeft, Timer, MapPin } from "lucide-react";
import Link from "next/link";

interface MatchDetailParams {
  id: string;
}

interface MatchDetailSearchParams {
  sport: string | string[] | undefined;
}

export default async function MatchDetail(props: { 
  params: Promise<MatchDetailParams>; 
  searchParams: Promise<MatchDetailSearchParams> 
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const sportParam = typeof searchParams.sport === 'string' ? searchParams.sport : (Array.isArray(searchParams.sport) ? searchParams.sport[0] : 'all');
  
  const match = await getMatchDetail(params.id, sportParam);

  if (!match) return (
    <div className="min-h-screen flex items-center justify-center">
       <div className="text-center">
          <p className="text-4xl font-black uppercase italic mb-8">Match Expired</p>
          <Link href="/" className="text-green-500 font-bold uppercase tracking-widest text-xs">Return Home</Link>
       </div>
    </div>
  );

  // Football Specific View
  if (sportParam === 'football') {
    const f = match;
    return (
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-40">
        <Link href={`/?sport=football`} className="flex items-center text-zinc-600 hover:text-white transition mb-12 text-[10px] font-black uppercase tracking-[0.2em]">
          <ChevronLeft size={16} className="mr-2" /> Back to Feed
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center mb-16">
              <div className="flex items-center gap-3 mb-6 bg-black/40 px-6 py-2 rounded-full border border-zinc-800">
                <img src={f.league.logo} className="w-6 h-6 object-contain" />
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{f.league.name}</span>
              </div>
              <p className="text-green-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                {f.fixture.status.long} {f.fixture.status.elapsed && `• ${f.fixture.status.elapsed}'`}
              </p>
            </div>

            {/* Scoreboard */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 mb-20">
              <div className="flex flex-col items-center gap-6 text-center">
                <img src={f.teams.home.logo} className="w-32 h-32 md:w-48 md:h-48 object-contain" />
                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white">{f.teams.home.name}</h2>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-8xl md:text-[10rem] font-black italic text-white flex items-center gap-4 leading-none tracking-tighter">
                  <span>{f.goals.home ?? 0}</span>
                  <span className="text-zinc-800">:</span>
                  <span>{f.goals.away ?? 0}</span>
                </div>
                {f.score.halftime.home !== null && (
                   <p className="text-zinc-500 font-black text-xs uppercase mt-4">HT {f.score.halftime.home} - {f.score.halftime.away}</p>
                )}
              </div>

              <div className="flex flex-col items-center gap-6 text-center">
                <img src={f.teams.away.logo} className="w-32 h-32 md:w-48 md:h-48 object-contain" />
                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white">{f.teams.away.name}</h2>
              </div>
            </div>

            {/* Venue & Details */}
            <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-zinc-800/50">
               <div className="flex items-center gap-4 text-zinc-400">
                  <MapPin className="text-green-500" />
                  <div className="text-left">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Venue</p>
                     <p className="font-bold">{f.fixture.venue.name}, {f.fixture.venue.city}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-zinc-400">
                  <Timer className="text-green-500" />
                  <div className="text-left">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Referee</p>
                     <p className="font-bold">{f.fixture.referee || "TBA"}</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 blur-[100px] pointer-events-none" />
        </div>
      </div>
    );
  }

  // Original Cricket/Other View (Simplified for brevity)
  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-40">
      <Link href={`/?sport=${sportParam}`} className="flex items-center text-zinc-600 hover:text-white transition mb-12 text-[10px] font-black uppercase tracking-[0.2em]">
        <ChevronLeft size={16} className="mr-2" /> Back
      </Link>
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-12 md:p-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-10 tracking-tighter text-white">
          {sportParam === 'cricket' ? match.data?.name : "Match Details"}
        </h1>
        <div className="flex justify-center items-center py-12 border-y border-zinc-800/50 mb-10">
           {sportParam === 'cricket' && (
             match.data?.score?.map((s: any, i: number) => (
               <div key={i} className="px-10">
                 <p className="text-zinc-500 text-[10px] font-black mb-4">{s.inning}</p>
                 <p className="text-6xl font-mono font-black text-white">{s.r}/{s.w}</p>
               </div>
             ))
           )}
        </div>
        <p className="text-green-500 font-black uppercase tracking-widest text-sm">
          {sportParam === 'cricket' ? match.data?.status : "Live Updates"}
        </p>
      </div>
    </div>
  );
}
