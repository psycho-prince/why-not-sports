import SportTabs from "@/components/SportTabs";
import LiveMatchCard from "@/components/LiveMatchCard";
import { getLiveScores } from "@/lib/api";
import LiveBoard from "./LiveBoard"; // We will create this client component
import { Zap, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

// This is now a Server Component
export default async function Home() {
  // 1. Initial data is fetched securely on the server
  const initialMatches = await getLiveScores('all');

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="relative rounded-[3rem] p-10 md:p-20 mb-16 overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-3 text-green-500 mb-8">
            <Globe size={20} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live 2026 World Events</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter italic uppercase">
            Real Scores.<br /><span className="text-green-500">Legal Access.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            No risks. Just live results and the ultimate guide to watching major sports legally for free.
          </p>
          <Link href="/watch-free-legally" className="bg-white text-black px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-green-500 hover:text-white transition inline-flex items-center">
            How to watch free <ArrowRight size={18} className="ml-3" />
          </Link>
        </div>
      </div>
      
      {/* 2. The LiveBoard is a client component that handles refresh */}
      <LiveBoard initialMatches={initialMatches} />
    </div>
  );
}
