import React, { useState } from 'react';
import { Play, Maximize, X } from 'lucide-react';
import type { VideoMedia } from '../../types/project';

interface CinemaPlayerProps {
  video: VideoMedia;
  title: string;
  autoPlayOnMount?: boolean;
  className?: string;
}

export const CinemaPlayer: React.FC<CinemaPlayerProps> = ({
  video,
  title,
  autoPlayOnMount = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlayOnMount);
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState(false);

  const getEmbedUrl = (withSound: boolean = true) => {
    const { provider, videoId, masterUrl } = video;

    if (provider === 'vimeo') {
      const id = videoId || (masterUrl ? masterUrl.match(/video\/(\d+)/)?.[1] || masterUrl.split('/').pop() : '76979871');
      return `https://player.vimeo.com/video/${id}?autoplay=1&color=d4af37&title=0&byline=0&portrait=0&muted=${withSound ? '0' : '1'}`;
    }

    if (provider === 'youtube') {
      const id = videoId || (masterUrl ? masterUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/)?.[1] : 'dQw4w9WgXcQ');
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&controls=1&mute=${withSound ? '0' : '1'}`;
    }

    return masterUrl || video.previewUrl || '';
  };

  const isDirectVideo = video.provider === 'direct' || video.provider === 'bunny';

  const aspectClass = video.aspectRatio === '2.39:1' ? 'aspect-cinemascope' : 'aspect-video';

  return (
    <>
      <div className={`relative group w-full bg-black overflow-hidden rounded-md border border-white/10 ${aspectClass} ${className}`}>
        {!isPlaying ? (
          /* Poster View with Watch Film CTA */
          <div className="absolute inset-0 w-full h-full">
            <img
              src={video.posterUrl}
              alt={title}
              className="w-full h-full object-cover brightness-90 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="eager"
            />
            
            {/* Film Grain & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="group/btn flex items-center gap-4 px-8 py-4 rounded-full bg-black/60 hover:bg-amber-500/20 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 text-white hover:text-amber-300 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                aria-label={`צפה בסרט ${title}`}
              >
                <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="text-right">
                  <span className="block text-xs font-mono uppercase tracking-widest text-amber-400">
                    צפייה בסרט המלא
                  </span>
                  <span className="text-sm md:text-base font-syne font-bold uppercase tracking-wider">
                    WATCH FILM {video.duration ? `(${video.duration})` : ''}
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Active Playing State */
          <div className="absolute inset-0 w-full h-full">
            {isDirectVideo ? (
              <video
                src={video.masterUrl || video.previewUrl}
                poster={video.posterUrl}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <iframe
                src={getEmbedUrl(true)}
                title={title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            )}

            {/* Quick Actions Bar */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={() => setIsCinemaModalOpen(true)}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white hover:text-amber-300 transition-all"
                title="מצב קולנוע מוגדל"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Cinema Modal */}
      {isCinemaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12 animate-fade-in">
          <button
            onClick={() => setIsCinemaModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-6xl aspect-cinemascope max-h-[85vh] bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {isDirectVideo ? (
              <video
                src={video.masterUrl || video.previewUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={getEmbedUrl(true)}
                title={title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
          
          <div className="mt-4 text-center">
            <h3 className="font-syne text-lg font-bold text-white uppercase tracking-wider">{title}</h3>
            <p className="text-xs text-zinc-400 font-mono mt-1">CINEMA MASTER VIEW · {video.provider.toUpperCase()}</p>
          </div>
        </div>
      )}
    </>
  );
};
