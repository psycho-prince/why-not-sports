import SportSelector from "@/components/SportSelector";
import LiveMatchCard from "@/components/LiveMatchCard";
import { getLiveFootball, getCricketMatches } from "@/lib/api";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const cricketData = await getCricketMatches();
  const footballData = await getLiveFootball();

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
      <div className="relative rounded-[2.5rem] p-10 md:p-16 mb-16 overflow-hidden bg-zinc-900 border border-zinc-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-green-500 mb-6">
            <Zap size={16} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Live 2026 Coverage</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase">
            Sports Should <br /> Be <span className="text-green-500">Free.</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium">
            Track live scores and discover official free broadcasting channels worldwide. No illegal streams, just rights-compliant access.
          </p>
          <Link href="/watch-free-legally" className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition inline-flex items-center">
            Watch Free Guide <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>

      <SportSelector />

      <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 flex items-center space-x-4">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <span>Live Now</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cricketData.data?.slice(0, 3).map((match: any) => (
          <LiveMatchCard key={match.id} match={match} type="cricket" />
        ))}
        {footballData.events?.slice(0, 3).map((match: any) => (
          <LiveMatchCard key={match.idEvent} match={match} type="football" />
        ))}
      </div>
    </div>
  );
}
