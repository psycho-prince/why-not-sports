import { ShieldCheck, Tv, Globe, Youtube, Info } from "lucide-react";

export default function WatchFreeLegally() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-40">
      <h1 className="text-7xl font-black mb-8 italic tracking-tighter uppercase text-center text-white">Legal <span className="text-green-500">Access.</span></h1>
      <p className="text-zinc-500 text-xl text-center mb-24 max-w-2xl mx-auto font-medium">Watch major sports for free, legally. Official broadcasters only.</p>
      <div className="grid gap-12">
        <section className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12">
          <div className="flex items-center space-x-4 mb-8 text-white"><Tv size={32}/><h2 className="text-3xl font-black uppercase italic">Public TV</h2></div>
          <div className="grid md:grid-cols-2 gap-8 text-zinc-400">
            <div className="bg-black/40 p-8 rounded-3xl border border-zinc-800/50">
              <h4 className="text-green-500 font-black uppercase text-sm mb-4">India (DD Free Dish)</h4>
              <p className="text-sm">DD Sports is free for millions. Covers all major India cricket events & Olympics.</p>
            </div>
            <div className="bg-black/40 p-8 rounded-3xl border border-zinc-800/50">
              <h4 className="text-green-500 font-black uppercase text-sm mb-4">Global Broadcasters</h4>
              <p className="text-sm">BBC/ITV (UK), SBS (Aus), and local OTA channels are protected free-to-air rights holders.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
