import { getLiveScores } from "@/lib/api";
import LiveBoard from "./LiveBoard";
import { ArrowRight, Globe, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const initialMatches = await getLiveScores('all');

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      {/* Friendly Hero Header */}
      <div className="relative rounded-[4rem] p-10 md:p-24 mb-20 overflow-hidden bg-gradient-to-br from-green-50 to-white dark:from-zinc-900 dark:to-black border border-green-100 dark:border-zinc-800 shadow-2xl shadow-green-500/5 group">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-3 text-green-600 dark:text-green-500 mb-10 bg-green-500/10 dark:bg-green-500/10 w-fit px-6 py-2 rounded-full border border-green-500/20">
            <Zap size={16} className="fill-current animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Kerala's Legal Score Hub 🏏</span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-black mb-10 leading-[0.8] tracking-tighter italic uppercase text-gray-900 dark:text-white">
            Score.<br />
            <span className="text-green-500 underline decoration-gray-100 dark:decoration-zinc-800 underline-offset-[20px]">Legal.</span><br />
            Fast.
          </h1>
          
          <p className="text-gray-600 dark:text-zinc-400 text-xl md:text-3xl mb-16 leading-tight font-medium tracking-tight max-w-2xl">
            Real scores, official highlights, and the ultimate guide to watching major sports legally. No more sketchy links. ☕
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link href="/watch-free-legally" className="bg-green-600 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all transform hover:scale-105 inline-flex items-center shadow-2xl shadow-green-500/20">
              Free Access Guide <ArrowRight size={20} className="ml-3" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-[100px] group-hover:bg-green-500/20 transition-all duration-700" />
        <div className="absolute bottom-10 right-10 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform duration-1000">
           <Globe size={300} strokeWidth={1} />
        </div>
      </div>
      
      {/* Live Updates Section */}
      <LiveBoard initialMatches={initialMatches} />
    </div>
  );
}
