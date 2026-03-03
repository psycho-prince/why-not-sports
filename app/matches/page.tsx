import { getLiveScores } from "@/lib/api";
import LiveBoard from "../LiveBoard";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Live Matches | Why Not Sports",
  description: "Real-time scores and live updates for football and cricket.",
};

export default async function MatchesPage() {
  // SSR the initial data
  const initialMatches = await getLiveScores('all');

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="flex items-center gap-4 mb-12">
        <Trophy className="text-green-500 w-10 h-10" />
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
          Match <span className="text-green-500">Center.</span>
        </h1>
      </div>
      
      <LiveBoard initialMatches={initialMatches} />
      
      {/* Educational Footer for the Matches page specifically */}
      <div className="mt-24 p-12 rounded-[3rem] bg-zinc-900/50 border border-zinc-800/50">
         <h2 className="text-2xl font-black uppercase italic text-white mb-6">About Our Data</h2>
         <p className="text-zinc-400 font-medium leading-relaxed max-w-3xl">
           Our match data is sourced directly from official sports APIs to ensure 100% accuracy. 
           Live scores refresh automatically every 45 seconds. For broadcasting rights, please 
           refer to our <a href="/watch-free-legally" className="text-green-500 underline">Legal Guide</a>.
         </p>
      </div>
    </div>
  );
}
