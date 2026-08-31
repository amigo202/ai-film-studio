import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/project';

interface VideoPreviewCardProps {
  project: Project;
  layout?: 'editorial' | 'grid';
  reversed?: boolean;
  projectIndex?: number;
}

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
  project,
  layout = 'grid',
  reversed = false,
  projectIndex
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver for mobile viewports
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.45 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const shouldPlayPreview = (isHovered || isInViewport) && Boolean(project.video.previewUrl);

  useEffect(() => {
    if (videoRef.current) {
      if (shouldPlayPreview) {
        videoRef.current.play().catch(() => {
          // Autoplay blocked fallback
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [shouldPlayPreview]);

  const workTypeBadge = () => {
    if (project.workType === 'client_work') {
      return (
        <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
          Client Work · {project.client}
        </span>
      );
    }
    if (project.workType === 'concept_work') {
      return (
        <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
          Original / Concept Film
        </span>
      );
    }
    return (
      <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300">
        Experimental R&D
      </span>
    );
  };

  const projectNumberStr = projectIndex !== undefined ? `PROJECT / ${projectIndex < 10 ? '0' : ''}${projectIndex}` : '';

  if (layout === 'editorial') {
    return (
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative py-12 md:py-20 border-b border-white/10 last:border-0"
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Column (5 cols) */}
          <div className={`lg:col-span-5 flex flex-col justify-between ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
            <div>
              {projectNumberStr && (
                <div className="font-mono text-xs text-amber-400/80 tracking-widest uppercase mb-3">
                  {projectNumberStr}
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {workTypeBadge()}
                <span className="text-xs text-zinc-500 font-mono">/ {project.year}</span>
                <span className="text-xs text-zinc-500 font-mono">/ {project.category}</span>
              </div>

              <Link to={`/work/${project.slug}`} className="block group-hover:text-amber-400 transition-colors">
                <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white font-syne mb-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-base text-zinc-400 font-light mb-4">{project.subtitle}</p>
                )}
              </Link>

              <p className="text-sm md:text-base text-zinc-400 leading-relaxed line-clamp-3 mb-6 font-hebrew">
                {project.shortDescription || project.challenge}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <Link
                to={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              {project.video.duration && (
                <span className="text-xs font-mono text-zinc-500">
                  DURATION: {project.video.duration}
                </span>
              )}
            </div>
          </div>

          {/* Large Video / Frame Column (7 cols) */}
          <div className={`lg:col-span-7 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
            <Link
              to={`/work/${project.slug}`}
              className="block relative overflow-hidden rounded-lg aspect-cinemascope bg-zinc-950 border border-white/10 group-hover:border-amber-500/40 transition-all duration-500 shadow-2xl"
            >
              {/* Tier 1: Static Poster (Loaded Immediately) */}
              <img
                src={project.video.posterUrl}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isVideoLoaded && shouldPlayPreview ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
              />

              {/* Tier 2: Lightweight 5-8s Preview Loop */}
              {project.video.previewUrl && (
                <video
                  ref={videoRef}
                  src={project.video.previewUrl}
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isVideoLoaded && shouldPlayPreview ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Film Grain & Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Floating Watch CTA */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-mono uppercase tracking-wider group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 transition-all">
                <Play className="w-3 h-3 fill-current" />
                <span>CASE STUDY</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col"
    >
      <Link
        to={`/work/${project.slug}`}
        className="block relative overflow-hidden rounded-lg aspect-widescreen bg-zinc-950 border border-white/10 group-hover:border-amber-500/40 transition-all duration-500 shadow-xl mb-4"
      >
        {/* Tier 1: Static Poster */}
        <img
          src={project.video.posterUrl}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isVideoLoaded && shouldPlayPreview ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Tier 2: Video Preview Loop */}
        {project.video.previewUrl && (
          <video
            ref={videoRef}
            src={project.video.previewUrl}
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoLoaded && shouldPlayPreview ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-20 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {workTypeBadge()}
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-300">
          <span>{project.category}</span>
          <span>{project.video.duration}</span>
        </div>
      </Link>

      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono text-zinc-500 uppercase">{project.client} · {project.year}</span>
        </div>

        <Link to={`/work/${project.slug}`}>
          <h4 className="font-syne text-lg font-bold uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors">
            {project.title}
          </h4>
        </Link>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 font-hebrew">
          {project.shortDescription}
        </p>
      </div>
    </div>
  );
};
