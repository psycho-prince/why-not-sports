import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Trophy, ShieldCheck, PlayCircle, Calendar } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: "WhyNot Sports | 100% Legal Live Scores",
  description: "Sports should be free... where legally possible.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <nav className="border-b border-zinc-900 bg-black/80 backdrop-blur-2xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-green-600 p-2 rounded-xl group-hover:rotate-6 transition">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter italic uppercase">WhyNot<span className="text-green-500">Sports</span></span>
            </Link>
            <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              <Link href="/matches" className="hover:text-white transition flex items-center gap-2"><Calendar size={14}/> Matches</Link>
              <Link href="/highlights" className="hover:text-white transition flex items-center gap-2"><PlayCircle size={14}/> Highlights</Link>
              <Link href="/watch-free-legally" className="hover:text-white transition flex items-center gap-2"><ShieldCheck size={14}/> Legal Guide</Link>
            </div>
            <Link href="/watch-free-legally" className="bg-green-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition">
              Free Access Guide
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
