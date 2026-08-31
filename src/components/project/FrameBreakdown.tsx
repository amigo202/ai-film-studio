import React, { useState } from 'react';
import type { FrameBreakdownItem } from '../../types/project';
import { Sparkles, Film, ArrowRight } from 'lucide-react';

interface FrameBreakdownProps {
  breakdown: FrameBreakdownItem;
}

export const FrameBreakdown: React.FC<FrameBreakdownProps> = ({ breakdown }) => {
  const [activeStageId, setActiveStageId] = useState<string>(breakdown.stages[0]?.id || '');

  if (!breakdown || !breakdown.stages || breakdown.stages.length === 0) return null;

  const currentStage = breakdown.stages.find((s) => s.id === activeStageId) || breakdown.stages[0];

  return (
    <section className="py-20 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>07 — FRAME BREAKDOWN</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne">
            {breakdown.shotName || 'SHOT EVOLUTION'}
          </h2>
        </div>
        {breakdown.description && (
          <p className="text-sm text-zinc-400 max-w-md mt-4 md:mt-0 font-hebrew">
            {breakdown.description}
          </p>
        )}
      </div>

      {/* 4-Stage Step Sequence Progress */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {breakdown.stages.map((stage, idx) => {
          const isSelected = stage.id === activeStageId || (!activeStageId && idx === 0);
          return (
            <button
              key={stage.id || idx}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-4 rounded-xl border text-right transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'bg-[#121216] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-xs ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`}>
                  0{idx + 1}
                </span>
                {idx < breakdown.stages.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                )}
              </div>
              <h4 className="font-syne text-sm font-bold uppercase text-white tracking-wide">
                {stage.title}
              </h4>
              <p className="text-[11px] text-zinc-400 font-hebrew mt-1 line-clamp-1">
                {stage.caption || `שלב ${idx + 1}`}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stage Visual Stage Comparison */}
      <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="relative aspect-cinemascope w-full rounded-xl overflow-hidden bg-black border border-white/10">
          {currentStage.type === 'video' ? (
            <video
              src={currentStage.mediaUrl}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentStage.mediaUrl}
              alt={currentStage.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Badge Overlay */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentStage.title}</span>
          </div>
        </div>

        {currentStage.caption && (
          <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              SHOT ANALYSIS
            </span>
            <p className="text-sm text-zinc-300 font-hebrew text-right">
              {currentStage.caption}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
