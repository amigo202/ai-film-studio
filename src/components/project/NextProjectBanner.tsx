import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import type { Project } from '../../types/project';

interface NextProjectBannerProps {
  nextProject?: Project;
}

export const NextProjectBanner: React.FC<NextProjectBannerProps> = ({ nextProject }) => {
  if (!nextProject) return null;

  return (
    <section className="relative border-t border-white/10 overflow-hidden group">
      <Link
        to={`/work/${nextProject.slug}`}
        className="block relative py-24 md:py-36 px-6 md:px-12 transition-all duration-700"
      >
        {/* Giant Background Frame */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={nextProject.video.posterUrl}
            alt={nextProject.title}
            className="w-full h-full object-cover brightness-40 group-hover:brightness-50 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
              <span>NEXT FILM</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            </div>

            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight text-white font-syne group-hover:text-amber-300 transition-colors">
              {nextProject.title}
            </h2>

            <div className="flex items-center gap-3 mt-4 text-xs font-mono text-zinc-400">
              <span className="uppercase">{nextProject.category}</span>
              <span>/</span>
              <span>{nextProject.client}</span>
              <span>/</span>
              <span>{nextProject.year}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-black text-white border border-white/20 group-hover:border-amber-400 backdrop-blur-md transition-all">
            <Play className="w-4 h-4 fill-current" />
            <span className="text-xs font-syne font-bold uppercase tracking-wider">
              VIEW CASE STUDY
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
};
