import React from 'react';
import type { Credits } from '../../types/project';
import { Award } from 'lucide-react';

interface CreditsSectionProps {
  credits: Credits;
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({ credits }) => {
  const creditEntries = [
    { label: 'Creative Direction', value: credits.creativeDirection },
    { label: 'Director', value: credits.director },
    { label: 'AI Film & Generation', value: credits.aiFilm },
    { label: 'Visual Development', value: credits.visualDevelopment },
    { label: 'Editing & Post', value: credits.editing },
    { label: 'Sound Design', value: credits.soundDesign },
    { label: 'Original Score', value: credits.music },
    { label: 'Client', value: credits.client },
    { label: 'Agency', value: credits.agency },
    { label: 'VFX & Compositing', value: credits.vfxCompositing },
  ].filter((c) => Boolean(c.value));

  if (creditEntries.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/10">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
        <Award className="w-3.5 h-3.5" />
        <span>FILMOGRAPHY & CREDITS</span>
      </div>
      <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-syne mb-8">
        PRODUCTION CREDITS
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-8 rounded-xl bg-[#121216]/60 border border-white/5">
        {creditEntries.map((credit, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
              {credit.label}
            </span>
            <span className="font-syne text-sm font-semibold text-zinc-200">
              {credit.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
