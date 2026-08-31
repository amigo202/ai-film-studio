import React from 'react';
import type { ProductionStats as StatsType } from '../../types/project';
import { BarChart3 } from 'lucide-react';

interface ProductionStatsProps {
  stats: StatsType;
  techStack?: string[];
}

export const ProductionStats: React.FC<ProductionStatsProps> = ({ stats, techStack }) => {
  const statItems = [
    stats.shotsCount !== undefined && {
      value: `${stats.shotsCount}`,
      label: 'AI Shots',
      subtext: 'שוטים קולנועיים שנוצרו'
    },
    stats.locationsCount !== undefined && {
      value: `${stats.locationsCount}`,
      label: 'Locations',
      subtext: 'עולמות ולוקיישנים'
    },
    stats.charactersCount !== undefined && {
      value: `${stats.charactersCount}`,
      label: 'Characters',
      subtext: 'דמויות עקביות'
    },
    stats.filmingDays !== undefined && {
      value: `${stats.filmingDays}`,
      label: 'Filming Days',
      subtext: 'ימי צילום פיזיים',
      highlight: true
    },
    stats.finalDuration && {
      value: stats.finalDuration,
      label: 'Final Film',
      subtext: 'אורך הסרט המוגמר'
    }
  ].filter(Boolean) as { value: string; label: string; subtext: string; highlight?: boolean }[];

  return (
    <section className="py-20 border-t border-white/10 relative">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
        <BarChart3 className="w-3.5 h-3.5" />
        <span>08 — PRODUCTION DATA & METRICS</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne mb-12">
        PRODUCTION BY THE NUMBERS
      </h2>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16">
        {statItems.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
              item.highlight
                ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                : 'bg-[#121216] border-white/5 hover:border-white/15'
            }`}
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-1">
                {item.label}
              </span>
              <div className={`font-syne text-3xl md:text-5xl font-bold tracking-tight mb-2 ${
                item.highlight ? 'text-amber-400' : 'text-white'
              }`}>
                {item.value}
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-hebrew">
              {item.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Technology Stack (Understated & Subdued) */}
      {techStack && techStack.length > 0 && (
        <div className="p-8 rounded-xl bg-black/40 border border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                09 — TECHNOLOGY STACK
              </span>
              <h3 className="text-lg font-syne font-bold uppercase text-zinc-300">
                AI ENGINES & POST INFRASTRUCTURE
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 hover:border-amber-500/30 hover:text-amber-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
