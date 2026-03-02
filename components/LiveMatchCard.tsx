import { Radio, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LiveMatchCard({ match, type }: { match: any, type: 'cricket' | 'football' }) {
  const isCricket = type === 'cricket';
  const id = isCricket ? match.id : match.idEvent;
  const title = isCricket ? match.name : `${match.strHomeTeam} vs ${match.strAwayTeam}`;
  const status = isCricket ? match.status : (match.strStatus || 'Live');
  const score = isCricket ? "" : `${match.intHomeScore || 0} - ${match.intAwayScore || 0}`;

  return (
    <Link href={isCricket ? \`/match/\${id}\` : "#"} className="block group">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-green-500/50 transition duration-300">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{isCricket ? 'Cricket' : 'Football'}</span>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black animate-pulse border border-red-500/20">
            <Radio size={10} />
            <span>LIVE</span>
          </div>
        </div>
        <h3 className="text-white font-black text-xl mb-3 leading-tight group-hover:text-green-400 transition">{title}</h3>
        <p className="text-zinc-500 text-sm font-medium mb-6">{status}</p>
        <div className="flex justify-between items-center pt-4 border-t border-zinc-800/50">
          <span className="text-white font-mono font-bold">{score}</span>
          <div className="text-green-500 flex items-center text-xs font-black uppercase opacity-0 group-hover:opacity-100 transition">
            Details <ChevronRight size={14} className="ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
