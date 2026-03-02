"use client";

import { Trophy, CircleDot, Disc, Activity, HelpCircle, Award } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const sports = [
  { id: "all", name: "All Sports", icon: Activity },
  { id: "cricket", name: "Cricket", icon: CircleDot },
  { id: "football", name: "Football", icon: Trophy },
  { id: "basketball", name: "Basketball", icon: Award }, // Basketball replaced with Award (exists in lucide-react)
  { id: "tennis", name: "Tennis", icon: Disc },
  { name: "Highlights", icon: Disc, href: "/highlights" },
  { name: "Guide", icon: HelpCircle, href: "/watch-free-legally" },
];

export default function SportTabs({ active }: { active?: string }) {
  const searchParams = useSearchParams();
  const currentSport = searchParams.get("sport") || "all";

  return (
    <div className="flex flex-wrap gap-2 pb-6 border-b">
      {sports.map((sport) => {
        const isActive = sport.id === currentSport;
        const Icon = sport.icon;

        if (sport.href) {
          return (
            <Link
              key={sport.name}
              href={sport.href}
              className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-accent transition-colors"
            >
              <Icon className="w-4 h-4" />
              {sport.name}
            </Link>
          );
        }

        return (
          <Link
            key={sport.id}
            href={`/?sport=${sport.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent"
            }`}
          >
            <Icon className="w-4 h-4" />
            {sport.name}
          </Link>
        );
      })}
    </div>
  );
}
