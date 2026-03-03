import { getRecentHighlights } from "@/lib/api";
import { PlayCircle, Youtube, ExternalLink } from "lucide-react";

export default async function Highlights() {
  const highlights = await getRecentHighlights();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-40">
      <div className="mb-20">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic mb-6 text-white leading-[0.8]">
          Replays<span className="text-green-500">.</span>
        </h1>
        <p className="text-zinc-500 text-xl md:text-2xl max-w-2xl font-medium tracking-tight">
          Missed the action? Watch official highlights from rights holders. Support the sport, watch legally.
        </p>
      </div>

      {highlights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {highlights.map((match) => (
            <div key={match.id} className="group relative">
              <div className="aspect-video bg-zinc-900 rounded-[3rem] mb-8 overflow-hidden relative border border-zinc-800 transition group-hover:border-green-600 flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
                 
                 {/* Match Score Overlay */}
                 <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-8">
                       <img src={match.homeLogo} alt={match.homeTeam} className="w-16 h-16 object-contain" />
                       <span className="text-5xl font-black italic text-white">{match.homeScore} : {match.awayScore}</span>
                       <img src={match.awayLogo} alt={match.awayTeam} className="w-16 h-16 object-contain" />
                    </div>
                    <PlayCircle size={60} className="text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
                 </div>
              </div>
              
              <div className="flex justify-between items-start px-4">
                <div>
                  <h3 className="text-3xl font-black italic uppercase text-white mb-2 leading-none tracking-tighter">
                    {match.homeTeam} vs {match.awayTeam}
                  </h3>
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <img src={match.leagueLogo} className="w-4 h-4 opacity-50" />
                    {match.league}
                  </p>
                </div>
                
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${match.homeTeam} vs ${match.awayTeam} highlights ${match.league}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white p-4 rounded-2xl transition duration-300 group/btn"
                >
                  <Youtube size={24} className="group-hover/btn:scale-110 transition" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center rounded-[4rem] border-2 border-dashed border-zinc-900 bg-zinc-950/30">
          <PlayCircle size={80} className="mx-auto text-zinc-800 mb-8" />
          <h2 className="text-4xl font-black uppercase italic text-white mb-4">No Recent Highlights</h2>
          <p className="text-zinc-500 max-w-md mx-auto font-medium">
            We haven't indexed any recent replays yet. Check back after the next major matchday.
          </p>
        </div>
      )}
      
      {/* Footer Info */}
      <div className="mt-40 border-t border-zinc-900 pt-10 flex items-center justify-between text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
        <span>Powered by API-Football Official Data</span>
        <span className="flex items-center gap-2"><ExternalLink size={12}/> All Rights Reserved to Broadcasters</span>
      </div>
    </div>
  );
}
