import React, { useState } from 'react';
import type { Project } from '../../types/project';
import { Play, X, Film, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoGalleryGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export const VideoGalleryGrid: React.FC<VideoGalleryGridProps> = ({
  projects,
  title = 'גלריית סרטים מלאה',
  subtitle = 'צפייה ישירה בכל הסרטים והפקות ה-AI'
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
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>{subtitle}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne">
            {title}
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-500 mt-2 md:mt-0">
          סה"כ {projects.length} סרטים
        </span>
      </div>

      {/* Grid of Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-[#121216] rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-lg"
          >
            {/* Video Thumbnail & Play Trigger */}
            <div
              onClick={() => setActiveModalProject(project)}
              className="relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
            >
              <img
                src={project.video.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Dark Overlay with Play Icon */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              {project.video.duration && (
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{project.video.duration}</span>
                </div>
              )}

              {/* Work Type Badge */}
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black/75 border border-white/15 text-zinc-300 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Video Info Card */}
            <div className="p-5 flex-1 flex flex-col justify-between text-right">
              <div>
                <span className="text-xs font-mono text-amber-400/80 block mb-1">
                  {project.client}
                </span>
                <h3 className="font-syne text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {project.title}
                </h3>
                {project.shortDescription && (
                  <p className="text-xs text-zinc-400 font-hebrew mt-2 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>צפייה בסרט</span>
                </button>

                <Link
                  to={`/work/${project.slug}`}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors font-hebrew"
                >
                  <span>Case Study</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Cinema Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setActiveModalProject(null)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="סגור נגן"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-5xl bg-[#121216] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              {activeModalProject.video.provider === 'direct' ? (
                <video
                  src={activeModalProject.video.masterUrl || activeModalProject.video.previewUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeModalProject)}
                  title={activeModalProject.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Modal Info Bar */}
            <div className="p-6 bg-[#09090b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-right">
              <div>
                <span className="text-xs font-mono text-amber-400">
                  {activeModalProject.client} · {activeModalProject.category}
                </span>
                <h3 className="text-xl font-syne font-bold text-white mt-1">
                  {activeModalProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/work/${activeModalProject.slug}`}
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-syne font-bold uppercase tracking-wider transition-colors"
                >
                  צפה ב-Case Study המלא
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-syne font-bold uppercase tracking-wider transition-colors"
                >
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
