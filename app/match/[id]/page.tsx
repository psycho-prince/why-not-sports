import { getMatchDetail } from "@/lib/api";
import { ChevronLeft, Zap, Info } from "lucide-react";
import Link from "next/link";

export default async function MatchDetail({ params, searchParams }: { params: { id: string }; searchParams: { sport: string | string[] | undefined } }) {
  // Ensure sport is a string, defaulting if undefined or array
  const sportParam = typeof searchParams.sport === 'string' ? searchParams.sport : (Array.isArray(searchParams.sport) ? searchParams.sport[0] : 'all');
  const match = await getMatchDetail(params.id, sportParam);

  if (!match) return <div className="p-20 text-center uppercase font-black">Match data not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-40">
      <Link href={`/?sport=${sportParam}`} className="flex items-center text-zinc-600 hover:text-white transition mb-12 text-[10px] font-black uppercase tracking-[0.2em]">
        <ChevronLeft size={16} className="mr-2" /> Back
      </Link>
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-12 md:p-20 text-center relative">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-10 tracking-tighter text-white">
          {sportParam === 'cricket' ? match.data?.name : (match.events ? match.events[0].strEvent : "Match Details")}
        </h1>
        <div className="flex justify-center items-center py-12 border-y border-zinc-800/50 mb-10">
           {sportParam === 'cricket' ? (
             match.data?.score?.map((s: any, i: number) => (
               <div key={i} className="px-10">
                 <p className="text-zinc-500 text-[10px] font-black mb-4">{s.inning}</p>
                 <p className="text-6xl font-mono font-black text-white">{s.r}/{s.w}</p>
                 <p className="text-zinc-500 text-xs mt-4">Overs {s.o}</p>
               </div>
             ))
           ) : (
             <p className="text-3xl font-black text-white italic">{match.events ? match.events[0].strStatus : "Live"}</p>
           )}
        </div>
        <p className="text-green-500 font-black uppercase tracking-widest text-sm">
          {sportParam === 'cricket' ? match.data?.status : (match.events ? match.events[0].strProgress : "Live Updates Only")}
        </p>
      </div>
    </div>
  );
}
