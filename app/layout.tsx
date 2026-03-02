import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Trophy } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhyNot Sports",
  description: "Sports should be free... where legally possible.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <nav className="border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-green-600 p-2 rounded-xl group-hover:rotate-12 transition">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter italic">WHYNOT<span className="text-green-500">SPORTS</span></span>
            </Link>
            <div className="hidden md:flex space-x-8 text-[11px] font-black uppercase tracking-widest text-zinc-400">
              <Link href="/matches" className="hover:text-green-500 transition">Matches</Link>
              <Link href="/highlights" className="hover:text-green-500 transition">Highlights</Link>
              <Link href="/watch-free-legally" className="hover:text-green-500 transition">Guide</Link>
            </div>
            <Link href="/watch-free-legally" className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-500 hover:text-white transition">
              Go Legal
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
