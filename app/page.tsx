import { getLiveScores } from "@/lib/api";
import LiveBoard from "./LiveBoard";
import { ArrowRight, Globe, Zap, Heart } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const initialMatches = await getLiveScores('all');

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      {/* All-Ages Friendly Onboarding Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-[3.5rem] p-10 md:p-16 mb-20 text-center border-2 border-green-200 dark:border-green-900 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-7xl md:text-8xl mb-10 transform hover:scale-110 transition-transform cursor-default">👋🏏🌍</div>
          <h1 className="text-4xl md:text-6xl font-black text-emerald-900 dark:text-emerald-400 mb-6 uppercase italic tracking-tighter">
            Welcome to WhyNot Sports!
          </h1>
          <p className="text-xl md:text-3xl font-medium text-emerald-700 dark:text-emerald-500 mb-12 leading-tight">
            The easiest way to catch live scores & free highlights. <br className="hidden md:block" />
            Made for every sports fan in Kerala and beyond. ☕
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#live-feed" className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-bold text-xl hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-xl shadow-green-600/20">
              🏏 See Live Scores
            </Link>
            <Link href="/highlights" className="bg-purple-600 text-white px-10 py-5 rounded-[2rem] font-bold text-xl hover:bg-black transition-all shadow-xl shadow-purple-600/20">
              📺 Watch Videos
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Hearts */}
        <div className="absolute -bottom-10 -left-10 opacity-5 dark:opacity-10 rotate-12">
           <Heart size={300} strokeWidth={1} />
        </div>
      </div>
      
      {/* Live Board with results */}
      <div id="live-feed">
        <LiveBoard initialMatches={initialMatches} />
      </div>
    </div>
  );
}
