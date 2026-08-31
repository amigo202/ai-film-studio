import React, { useState } from 'react';
import type { BehindTheFilmStep } from '../../types/project';
import { Sparkles, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

interface BehindTheFilmProps {
  steps: BehindTheFilmStep[];
}

export const BehindTheFilm: React.FC<BehindTheFilmProps> = ({ steps }) => {
  const activeSteps = steps.filter((s) => s.active);
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  if (activeSteps.length === 0) return null;

  const currentStep = activeSteps[selectedStepIndex] || activeSteps[0];

  return (
    <section className="py-20 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>06 — BEHIND THE FILM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne">
            THE PRODUCTION PIPELINE
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-md mt-4 md:mt-0 font-hebrew">
          הצצה לתהליך ההפקה הקולנועי המלא — מהקונספט וה-Visual Development, דרך הזרקת התנועה, ועד לעריכה ולמאסטר.
        </p>
      </div>

      {/* Steps Step Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/10">
        {activeSteps.map((step, idx) => {
          const isSelected = idx === selectedStepIndex;
          return (
            <button
              key={step.id || idx}
              onClick={() => setSelectedStepIndex(idx)}
              className={`flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/15'
              }`}
            >
              <span className={`font-mono text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`}>
                {step.stepNumber}
              </span>
              <span className="text-sm font-syne font-semibold uppercase whitespace-nowrap">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#121216] border border-white/10 rounded-xl p-6 md:p-10 relative overflow-hidden">
        {/* Step Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-4xl md:text-5xl font-bold text-amber-400/40">
                {currentStep.stepNumber}
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">STAGE</span>
                <span className="text-xs text-amber-400 font-mono font-medium">{currentStep.subtitle || 'Production Phase'}</span>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold uppercase text-white font-syne mb-4">
              {currentStep.title}
            </h3>

            <p className="text-base text-zinc-300 leading-relaxed font-hebrew">
              {currentStep.description}
            </p>
          </div>

          {/* Navigation between steps */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
            <span className="text-xs font-mono text-zinc-500">
              שלב {selectedStepIndex + 1} מתוך {activeSteps.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedStepIndex((prev) => (prev > 0 ? prev - 1 : activeSteps.length - 1))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                aria-label="שלב קודם"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedStepIndex((prev) => (prev < activeSteps.length - 1 ? prev + 1 : 0))}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                aria-label="שלב הבא"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative aspect-cinemascope w-full rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl">
            {currentStep.mediaUrl ? (
              currentStep.mediaType === 'video' ? (
                <video
                  src={currentStep.mediaUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentStep.mediaUrl}
                  alt={currentStep.title}
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 font-mono text-xs">
                <Sparkles className="w-8 h-8 mb-2 opacity-40 text-amber-400" />
                <span>BTS ASSET RECORDED</span>
              </div>
            )}
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded text-[11px] font-mono text-zinc-300 border border-white/10">
              STAGE {currentStep.stepNumber} MEDIA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
