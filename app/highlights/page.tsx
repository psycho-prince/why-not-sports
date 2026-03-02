import { PlayCircle } from "lucide-react";

export default function Highlights() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-40">
      <h1 className="text-7xl font-black tracking-tighter uppercase italic mb-6 text-white">Replays.</h1>
      <p className="text-zinc-500 text-xl mb-20">Official highlights from rights holders. support the sport.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[1,2,3,4].map(i => (
          <div key={i} className="group">
            <div className="aspect-video bg-zinc-900 rounded-[3rem] mb-8 overflow-hidden relative border border-zinc-800 transition group-hover:border-green-600 flex items-center justify-center">
               <PlayCircle size={80} className="text-white opacity-20 group-hover:opacity-100 transition" />
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white">Official Channel Recap</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
