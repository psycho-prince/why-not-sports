import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Trophy, ShieldCheck, PlayCircle, Calendar, Heart } from "lucide-react";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: "WhyNot Sports | 100% Legal Live Scores",
  description: "Sports should be free... where legally possible.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <nav className="border-b border-gray-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-2xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-green-600 p-2 rounded-xl group-hover:rotate-6 transition-transform">
                  <Trophy className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-black tracking-tighter italic uppercase">WhyNot<span className="text-green-500">Sports</span></span>
              </Link>
              <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
                <Link href="/matches" className="hover:text-green-500 dark:hover:text-white transition flex items-center gap-2"><Calendar size={14}/> Matches</Link>
                <Link href="/highlights" className="hover:text-green-500 dark:hover:text-white transition flex items-center gap-2"><PlayCircle size={14}/> Highlights</Link>
                <Link href="/watch-free-legally" className="hover:text-green-500 dark:hover:text-white transition flex items-center gap-2"><ShieldCheck size={14}/> Legal Guide</Link>
              </div>
              <Link href="/watch-free-legally" className="bg-green-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-all shadow-lg shadow-green-500/20">
                Free Access Guide
              </Link>
            </div>
          </nav>
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-50 dark:bg-zinc-950 py-16 border-t border-gray-100 dark:border-zinc-900 mt-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex flex-col items-center gap-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
                    Developed with <Heart size={14} className="inline text-red-500 mx-1 fill-current" /> by <span className="text-green-600 dark:text-green-500">Prince T Philip</span>
                  </p>
                  <p className="text-[10px] font-black text-gray-300 dark:text-zinc-700 uppercase tracking-[0.3em]">Vaikom, Kerala | 100% Legal Sports</p>
                </div>
                
                <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
                   <Link href="/matches" className="hover:text-green-500 transition">Scores</Link>
                   <Link href="/highlights" className="hover:text-green-500 transition">Replays</Link>
                   <Link href="/watch-free-legally" className="hover:text-green-500 transition">Legal</Link>
                </div>

                <a 
                  href="https://buymeacoffee.com/Princephilip" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl shadow-yellow-400/20 hover:scale-105 active:scale-95"
                >
                  <span className="text-xl">☕</span> Buy me a coffee
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
