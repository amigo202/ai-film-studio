import React, { useState } from 'react';
import type { Project } from '../../types/project';
import { Play, X, Clock } from 'lucide-react';

interface VideoGalleryGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export const VideoGalleryGrid: React.FC<VideoGalleryGridProps> = ({
  projects,
  title,
  subtitle
}) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const getEmbedUrl = (project: Project) => {
    const { provider, videoId, masterUrl } = project.video;
    if (provider === 'vimeo') {
      const id = videoId || (masterUrl ? masterUrl.split('/').pop()?.split('?')[0] : '');
      return `https://player.vimeo.com/video/${id}?autoplay=1&color=d4af37&title=0&byline=0&portrait=0`;
    }
    if (provider === 'youtube') {
      const id = videoId || (masterUrl ? masterUrl.split('v=')[1]?.split('&')[0] : '');
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    }
    return masterUrl || '';
  };

  return (
    <div className="w-full">
      {/* Optional Gallery Header */}
      {(title || subtitle) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-white/10 text-right font-hebrew">
          <div>
            {subtitle && (
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne">
                {title}
              </h2>
            )}
          </div>
          <span className="text-xs font-mono text-zinc-400 mt-2 md:mt-0">
            סה"כ {projects.length} סרטים
          </span>
        </div>
      )}

      {/* Grid of Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((project) => {
          const hasDistinctDescription =
            project.shortDescription &&
            project.shortDescription.trim() !== project.title.trim() &&
            project.shortDescription.trim() !== project.client.trim();

          return (
            <div
              key={project.id}
              className="group relative bg-[#121216] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-lg"
            >
              {/* Video Thumbnail & Play Trigger */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
              >
                <img
                  src={project.video.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Dark Overlay with Play Icon */}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {project.video.duration && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{project.video.duration}</span>
                  </div>
                )}
              </div>

              {/* Video Info Card */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-right font-hebrew cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-mono text-amber-400 block mb-1">
                    {project.client}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {hasDistinctDescription && (
                    <p className="text-xs text-zinc-400 font-hebrew mt-1.5 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  )}
                </div>

                {/* Action Button */}
                <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>צפייה בסרט</span>
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {project.year || '2026'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Video Cinema Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setActiveModalProject(null)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="w-full max-w-5xl bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="relative aspect-video w-full bg-black">
              {activeModalProject.video.provider === 'direct' ? (
                <video
                  src={activeModalProject.video.masterUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeModalProject)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#121216] text-right font-hebrew">
              <div>
                <span className="text-xs font-mono text-amber-400 block mb-1">
                  {activeModalProject.client}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
