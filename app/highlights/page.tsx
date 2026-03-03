import { getRecentHighlights } from "@/lib/api";
import { PlayCircle, Youtube, ExternalLink, Play } from "lucide-react";

export default async function Highlights() {
  const recentResults = await getRecentHighlights();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-40">
      {/* Page Header */}
      <div className="mb-24 text-center">
        <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase italic mb-8 text-gray-900 dark:text-white leading-[0.8]">
          Replays<span className="text-green-500">.</span>
        </h1>
        <p className="text-gray-600 dark:text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium tracking-tight">
          Relive the biggest moments — official clips from ICC, DD Sports, and world leagues. Watch legally, support the sport.
        </p>
      </div>

      {/* Featured Highlights (Embeds) */}
      <div className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-red-600 p-2 rounded-lg text-white shadow-lg">
             <Play size={20} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">Featured</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Cricket Highlight 1 */}
          <div className="group bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden hover:shadow-green-500/10 hover:scale-[1.02] transition-all duration-500 border border-gray-100 dark:border-zinc-800">
            <div className="aspect-video relative bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/mJdDDro_BEA"
                title="India vs Netherlands"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black italic uppercase text-gray-900 dark:text-white mb-2 leading-none">India vs Netherlands</h3>
              <p className="text-gray-500 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest">T20 World Cup | ICC Official</p>
            </div>
          </div>

          {/* Cricket Highlight 2 */}
          <div className="group bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden hover:shadow-green-500/10 hover:scale-[1.02] transition-all duration-500 border border-gray-100 dark:border-zinc-800">
            <div className="aspect-video relative bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/fVoNS00CqPE"
                title="India vs South Africa"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black italic uppercase text-gray-900 dark:text-white mb-2 leading-none">India vs South Africa</h3>
              <p className="text-gray-500 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest">T20 Warm-up | Epic Moments</p>
            </div>
          </div>

          {/* DD Sports Spotlight */}
          <div className="group bg-gradient-to-br from-orange-500 to-red-600 rounded-[3rem] shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 p-10 flex flex-col justify-center items-center text-center text-white relative">
            <div className="absolute top-4 right-4 opacity-20">
              <Youtube size={80} />
            </div>
            <span className="text-7xl mb-6">📺</span>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">DD Sports Live Clips</h3>
            <p className="text-orange-100 text-sm font-medium mb-8 max-w-[200px]">Free India cricket, Olympics & more – from Prasar Bharati.</p>
            <a 
              href="https://www.youtube.com/@PrasarBharatiSports/videos" 
              target="_blank" 
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition shadow-xl"
            >
              Watch Channel →
            </a>
          </div>
        </div>
      </div>

      {/* Recent Results Feed */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-12">
           <div className="bg-green-600 p-2 rounded-lg text-white shadow-lg">
              <PlayCircle size={20} />
           </div>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">Recent Results</h2>
        </div>

        {recentResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {recentResults.map((match) => (
              <div key={match.id} className="group relative">
                <div className="aspect-video bg-gray-50 dark:bg-zinc-900 rounded-[3.5rem] mb-8 overflow-hidden relative border border-gray-100 dark:border-zinc-800 transition-all duration-500 group-hover:border-green-600 flex items-center justify-center shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
                   
                   {/* Match Score Overlay */}
                   <div className="relative z-10 flex flex-col items-center gap-8">
                      <div className="flex items-center gap-10">
                         <img src={match.homeLogo} alt={match.homeTeam} className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl" />
                         <span className="text-5xl md:text-7xl font-black italic text-white tabular-nums tracking-tighter">{match.homeScore} : {match.awayScore}</span>
                         <img src={match.awayLogo} alt={match.awayTeam} className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-500">
                         <Youtube size={32} className="text-white" />
                      </div>
                   </div>
                </div>
                
                <div className="flex justify-between items-start px-8">
                  <div>
                    <h3 className="text-3xl font-black italic uppercase text-gray-900 dark:text-white mb-2 leading-none tracking-tighter group-hover:text-green-500 transition-colors">
                      {match.homeTeam} vs {match.awayTeam}
                    </h3>
                    <p className="text-gray-500 dark:text-zinc-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <img src={match.leagueLogo} className="w-4 h-4 opacity-50" />
                      {match.league}
                    </p>
                  </div>
                  
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${match.homeTeam} vs ${match.awayTeam} highlights official`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-500 hover:bg-red-600 hover:text-white p-4 rounded-2xl transition duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center rounded-[4rem] border-2 border-dashed border-gray-100 dark:border-zinc-900 bg-gray-50/20 dark:bg-zinc-950/20">
            <PlayCircle size={80} className="mx-auto text-gray-200 dark:text-zinc-800 mb-8" />
            <h2 className="text-4xl font-black uppercase italic text-gray-400 dark:text-zinc-600 mb-4">No Recent Feeds</h2>
            <p className="text-gray-500 max-w-md mx-auto font-medium">
              Check back soon for the latest match results and official replays.
            </p>
          </div>
        )}
      </div>
      
      {/* Footer Info */}
      <div className="mt-40 border-t border-gray-100 dark:border-zinc-900 pt-16 flex flex-col md:flex-row items-center justify-between text-gray-400 dark:text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] gap-8">
        <div className="flex items-center gap-4">
           <img src="https://media.api-sports.io/football/leagues/39.png" className="w-6 h-6 grayscale opacity-50" />
           <span>Official Data Feeds Enabled</span>
        </div>
        <span className="flex items-center gap-2"><ExternalLink size={12}/> All Rights Reserved to Original Broadcasters</span>
      </div>
    </div>
  );
}
