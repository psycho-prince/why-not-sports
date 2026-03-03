import { getLiveScores } from "@/lib/api";
import LiveBoard from "./LiveBoard";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

// This is a Server Component that fetches initial data
export default async function Home() {
  // Fetch initial data for SSR/Speed
  // If API keys are missing, this safely returns []
  const initialMatches = await getLiveScores('all');

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="relative rounded-[3.5rem] p-10 md:p-24 mb-16 overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-3 text-green-500 mb-8">
            <Globe size={18} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Real-Time World Sports</span>
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black mb-10 leading-[0.8] tracking-tighter italic uppercase">
            Why Not <br />
            <span className="text-green-500">Sports?</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl mb-14 leading-relaxed font-medium tracking-tight">
            Stop digging for scores. We track live events from around the world and guide you to official, legal broadcasts.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/watch-free-legally" className="bg-white text-black px-12 py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all transform hover:scale-105 inline-flex items-center shadow-2xl shadow-white/5">
              Access Guide <ArrowRight size={20} className="ml-3" />
            </Link>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />
      </div>
      
      {/* Client Component for live updates & filtering */}
      <LiveBoard initialMatches={initialMatches} />
    </div>
  );
}
