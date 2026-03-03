import { ShieldCheck, Tv, Globe, Youtube, Info, ExternalLink, Play } from "lucide-react";

export default function WatchFreeLegally() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-40">
      <div className="text-center mb-24">
        <h1 className="text-6xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase text-white leading-none">
          Legal <span className="text-green-500 underline decoration-zinc-800 underline-offset-8">Access.</span>
        </h1>
        <p className="text-zinc-500 text-xl md:text-2xl max-w-2xl mx-auto font-medium tracking-tight">
          Sports should be for everyone. Watch major events for free, legally, through official national broadcasters.
        </p>
      </div>

      <div className="grid gap-12">
        {/* Featured: DD Sports / Prasar Bharati */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition">
             <Youtube size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-10 text-white">
              <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-900/20">
                <Tv size={32}/>
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">DD Sports (India)</h2>
            </div>

            <p className="text-zinc-400 text-lg mb-12 max-w-2xl leading-relaxed">
              Prasar Bharati (India's Public Service Broadcaster) provides free-to-air coverage of all major cricket events involving India, the Olympics, and National Games.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <a 
                href="https://www.youtube.com/@PrasarBharatiSports" 
                target="_blank" 
                className="flex items-center justify-between bg-red-600 hover:bg-red-500 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all transform hover:scale-[1.02]"
              >
                <span className="flex items-center gap-3"><Youtube size={20}/> Live on YouTube</span>
                <ExternalLink size={16}/>
              </a>
              <a 
                href="https://prasarbharati.gov.in" 
                target="_blank" 
                className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all transform hover:scale-[1.02]"
              >
                <span className="flex items-center gap-3"><Globe size={20}/> Official Portal</span>
                <ExternalLink size={16}/>
              </a>
            </div>
          </div>
        </section>

        {/* Global Public Broadcasters */}
        <div className="grid md:grid-cols-2 gap-8">
           <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[3rem]">
              <h4 className="text-green-500 font-black uppercase tracking-widest text-[10px] mb-4">United Kingdom</h4>
              <h3 className="text-2xl font-black text-white italic mb-6">BBC iPlayer / ITVX</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">Home of Wimbledon, Match of the Day, and major tournament finals. Free for TV License holders.</p>
              <a href="https://www.bbc.co.uk/iplayer/categories/sport" target="_blank" className="inline-flex items-center text-white font-black uppercase text-[10px] tracking-widest gap-2 hover:text-green-500 transition">
                Visit BBC Sport <ExternalLink size={14}/>
              </a>
           </div>

           <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[3rem]">
              <h4 className="text-green-500 font-black uppercase tracking-widest text-[10px] mb-4">Australia</h4>
              <h3 className="text-2xl font-black text-white italic mb-6">SBS On Demand</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">Legendary coverage of the FIFA World Cup and international cycling (Tour de France).</p>
              <a href="https://www.sbs.com.au/ondemand/sport" target="_blank" className="inline-flex items-center text-white font-black uppercase text-[10px] tracking-widest gap-2 hover:text-green-500 transition">
                Visit SBS Sport <ExternalLink size={14}/>
              </a>
           </div>
        </div>

        {/* Important Warning */}
        <div className="mt-12 bg-green-600/5 border border-green-600/20 rounded-[2.5rem] p-8 flex items-start gap-6">
           <div className="bg-green-600 p-2 rounded-lg text-white">
              <ShieldCheck size={20} />
           </div>
           <div>
              <p className="text-white font-bold mb-2 uppercase tracking-tighter text-sm italic">Why Not Sports Policy</p>
              <p className="text-zinc-500 text-xs leading-relaxed">
                We do not host illegal streams. We point users toward official rights holders because supporting the sport ensures its future. Always use a VPN if you are traveling to access your home country's public broadcaster.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
