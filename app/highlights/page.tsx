import { getRecentHighlights } from "@/lib/api";
import { PlayCircle, Youtube, ExternalLink, Play } from "lucide-react";

export default async function Highlights() {
  const recentResults = await getRecentHighlights();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-40">
      {/* Ultra-Friendly Highlights Banner */}
      <div className="bg-purple-50 dark:bg-purple-950/20 rounded-[3.5rem] p-10 md:p-16 mb-24 text-center border-2 border-purple-200 dark:border-purple-900 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-7xl md:text-8xl mb-10 transform hover:scale-110 transition-transform cursor-default">📺🍿🏆</div>
          <h1 className="text-4xl md:text-6xl font-black text-purple-900 dark:text-purple-400 mb-6 uppercase italic tracking-tighter">
            Recent Highlights
          </h1>
          <p className="text-xl md:text-3xl font-medium text-purple-700 dark:text-purple-500 leading-tight">
            Missed the match? No problem. Tap any video to play the best official clips. Easy as that!
          </p>
        </div>
      </div>

      {/* Featured Highlights (Embeds) */}
      <div className="mb-32">
        <div className="flex items-center gap-6 mb-12">
          <div className="bg-red-600 p-3 rounded-2xl text-white shadow-xl">
             <Play size={24} fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">Must-Watch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Cricket Highlight 1 */}
          <div className="group bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 border-2 border-gray-100 dark:border-zinc-800">
            <div className="aspect-video relative bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/mJdDDro_BEA"
                title="India vs Netherlands"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-black italic uppercase text-gray-900 dark:text-white mb-3">India vs Netherlands</h3>
              <p className="text-purple-600 font-bold text-lg uppercase tracking-widest">T20 World Cup</p>
            </div>
          </div>

          {/* Cricket Highlight 2 */}
          <div className="group bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 border-2 border-gray-100 dark:border-zinc-800">
            <div className="aspect-video relative bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/fVoNS00CqPE"
                title="India vs South Africa"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-black italic uppercase text-gray-900 dark:text-white mb-3">India vs South Africa</h3>
              <p className="text-purple-600 font-bold text-lg uppercase tracking-widest">T20 Warm-up</p>
            </div>
          </div>

          {/* DD Sports Spotlight */}
          <div className="group bg-gradient-to-br from-orange-500 to-red-600 rounded-[3.5rem] shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 p-12 flex flex-col justify-center items-center text-center text-white relative">
            <span className="text-8xl mb-8">📺</span>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6">DD Sports Clips</h3>
            <p className="text-orange-100 text-xl font-medium mb-10 max-w-[250px]">Free India cricket & more – tap below!</p>
            <a 
              href="https://www.youtube.com/@PrasarBharatiSports/videos" 
              target="_blank" 
              className="bg-white text-orange-600 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-lg hover:bg-black hover:text-white transition shadow-2xl"
            >
              Watch Now
            </a>
          </div>
        </div>
      </div>

      {/* Recent Results Feed */}
      <div className="mb-20">
        <div className="flex items-center gap-6 mb-12">
           <div className="bg-green-600 p-3 rounded-2xl text-white shadow-xl">
              <PlayCircle size={24} />
           </div>
           <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">Recent Results</h2>
        </div>

        {recentResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {recentResults.map((match) => (
              <div key={match.id} className="group relative">
                <div className="aspect-video bg-gray-50 dark:bg-zinc-900 rounded-[4rem] mb-10 overflow-hidden relative border-2 border-gray-100 dark:border-zinc-800 transition-all duration-500 group-hover:border-green-600 flex items-center justify-center shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
                   
                   <div className="relative z-10 flex flex-col items-center gap-10">
                      <div className="flex items-center gap-10">
                         <img src={match.homeLogo} alt={match.homeTeam} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl" />
                         <span className="text-6xl md:text-[6rem] font-black italic text-white tabular-nums tracking-tighter">{match.homeScore} : {match.awayScore}</span>
                         <img src={match.awayLogo} alt={match.awayTeam} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-full border-2 border-white/20 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-500">
                         <Youtube size={48} className="text-white" />
                      </div>
                   </div>
                </div>
                
                <div className="flex justify-between items-start px-10">
                  <div>
                    <h3 className="text-4xl font-black italic uppercase text-gray-900 dark:text-white mb-3 leading-none tracking-tighter group-hover:text-green-500 transition-colors">
                      {match.homeTeam} vs {match.awayTeam}
                    </h3>
                    <p className="text-gray-500 dark:text-zinc-600 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                      <img src={match.leagueLogo} className="w-6 h-6 opacity-50" />
                      {match.league}
                    </p>
                  </div>
                  
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${match.homeTeam} vs ${match.awayTeam} highlights official`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 hover:bg-red-600 hover:text-white p-6 rounded-[2rem] transition duration-300 shadow-xl"
                  >
                    <ExternalLink size={32} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center rounded-[4rem] border-2 border-dashed border-gray-200 dark:border-zinc-900 bg-gray-50/20 dark:bg-zinc-950/20">
            <span className="text-9xl mb-12 block">📺🍿</span>
            <h2 className="text-5xl font-black uppercase italic text-gray-400 dark:text-zinc-600 mb-6">No Recent Replays</h2>
            <p className="text-gray-500 text-2xl font-medium">Check back after the next big game!</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-40 border-t-2 border-gray-100 dark:border-zinc-900 pt-16 flex flex-col md:flex-row items-center justify-between text-gray-400 dark:text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] gap-8 text-center md:text-left">
        <span>Official Data Enabled</span>
        <span>Support Legally • Rights Reserved to Broadcasters</span>
      </div>
    </div>
  );
}
