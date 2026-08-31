import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Share2, Check, Image as ImageIcon } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { StudioLayout } from '../components/layout/StudioLayout';
import { CinemaPlayer } from '../components/video/CinemaPlayer';
import { BehindTheFilm } from '../components/project/BehindTheFilm';
import { FrameBreakdown } from '../components/project/FrameBreakdown';
import { ProductionStats } from '../components/project/ProductionStats';
import { CreditsSection } from '../components/project/CreditsSection';
import { Lightbox } from '../components/project/Lightbox';
import { NextProjectBanner } from '../components/project/NextProjectBanner';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProjectBySlug, getAdjacentProjects } = useProjects();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!slug) return <Navigate to="/work" replace />;

  const project = getProjectBySlug(slug);
  if (!project) {
    return (
      <StudioLayout>
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold font-syne text-white uppercase mb-4">פרויקט לא נמצא</h1>
          <p className="text-zinc-400 font-hebrew mb-8">הפרויקט המבוקש אינו קיים או הוסר מהארכיון.</p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-bold font-syne text-xs uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>חזרה לכל העבודות</span>
          </Link>
        </div>
      </StudioLayout>
    );
  }

  const { next } = getAdjacentProjects(slug);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const openLightbox = (index: number) => {
    setActiveFrameIndex(index);
    setLightboxOpen(true);
  };

  return (
    <StudioLayout>
      {/* Dynamic SEO / OpenGraph Metadata for WhatsApp, LinkedIn, Google */}
      <Helmet>
        <title>{project.seoTitle || `${project.title} | AI Film Studio`}</title>
        <meta name="description" content={project.seoDescription || project.shortDescription} />
        
        {/* OpenGraph */}
        <meta property="og:type" content="video.movie" />
        <meta property="og:title" content={project.seoTitle || project.title} />
        <meta property="og:description" content={project.seoDescription || project.shortDescription} />
        <meta property="og:image" content={project.ogImageUrl || project.video.posterUrl} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.shortDescription} />
        <meta name="twitter:image" content={project.video.posterUrl} />
      </Helmet>

      <article className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-24">
        {/* Breadcrumb & Share */}
        <div className="flex items-center justify-between py-6 text-xs font-mono text-zinc-400">
          <Link
            to="/work"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>WORK / {project.category}</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-all"
              title="העתקת קישור לשיתוף"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
              <span>{copiedLink ? 'הקישור הועתק!' : 'שיתוף קישור'}</span>
            </button>
          </div>
        </div>

        {/* 1. GIANT MASTER VIDEO PLAYER */}
        <section className="mb-12 shadow-2xl">
          <CinemaPlayer video={project.video} title={project.title} />
        </section>

        {/* 2. PROJECT HEADER */}
        <header className="pb-12 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.workType === 'client_work' ? (
              <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                Client Work · {project.client}
              </span>
            ) : project.workType === 'concept_work' ? (
              <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                Original Studio / Concept Film
              </span>
            ) : (
              <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300">
                Experimental R&D
              </span>
            )}
            <span className="text-xs text-zinc-500 font-mono">/ {project.year}</span>
            <span className="text-xs text-zinc-500 font-mono">/ {project.category.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white font-syne mb-4">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-xl sm:text-2xl text-zinc-400 font-light font-hebrew">
              {project.subtitle}
            </p>
          )}
        </header>

        {/* 3. PROJECT OVERVIEW TABLE */}
        <section className="py-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#121216]/40 p-6 md:p-8 rounded-xl my-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">CLIENT</span>
            <span className="font-syne text-base font-semibold text-white">{project.client}</span>
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">TYPE</span>
            <span className="font-syne text-base font-semibold text-white">{project.projectType}</span>
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">DURATION</span>
            <span className="font-mono text-base font-semibold text-amber-400">{project.video.duration || 'N/A'}</span>
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">ROLE / DIRECTION</span>
            <span className="font-syne text-xs font-medium text-zinc-300 leading-snug block">{project.role}</span>
          </div>
        </section>

        {/* 4. THE CHALLENGE & THE IDEA */}
        <section className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* The Challenge (6 cols) */}
          <div className="lg:col-span-6 p-8 rounded-xl bg-[#121216] border border-white/5">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
              04 — THE CHALLENGE
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-syne mb-4">
              THE BRIEF & GOAL
            </h3>
            <p className="text-base text-zinc-300 leading-relaxed font-hebrew">
              {project.challenge}
            </p>
          </div>

          {/* The Idea (6 cols) */}
          <div className="lg:col-span-6 p-8 rounded-xl bg-[#121216] border border-white/5">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
              05 — THE IDEA
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-syne mb-4">
              CREATIVE CONCEPT
            </h3>
            <p className="text-base text-zinc-300 leading-relaxed font-hebrew">
              {project.idea}
            </p>
          </div>
        </section>

        {/* Concept Art Hero (if available) */}
        {project.conceptArtUrl && (
          <section className="py-8">
            <div className="relative aspect-cinemascope w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={project.conceptArtUrl}
                alt={`${project.title} Concept Art`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                HERO CONCEPT ART
              </div>
            </div>
          </section>
        )}

        {/* 5. BEHIND THE FILM (8-Stage Interactive Timeline) */}
        {project.processSteps && project.processSteps.length > 0 && (
          <BehindTheFilm steps={project.processSteps} />
        )}

        {/* 6. FRAME BREAKDOWN (Shot Evolution) */}
        {project.frameBreakdown && (
          <FrameBreakdown breakdown={project.frameBreakdown} />
        )}

        {/* 7. PRODUCTION DATA & TECH STACK */}
        <ProductionStats stats={project.productionStats} techStack={project.techStack} />

        {/* 8. FRAMES GALLERY */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-20 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>10 — CINEMA FRAMES GALLERY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne mb-10">
              HIGH-RESOLUTION FRAMES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => openLightbox(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-black border border-white/10 aspect-cinemascope"
                >
                  <img
                    src={item.url}
                    alt={item.caption || `Frame ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <span className="text-xs font-mono text-amber-400">FRAME 0{idx + 1}</span>
                    {item.caption && (
                      <p className="text-sm font-hebrew text-white mt-1">{item.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. CREDITS SECTION */}
        {project.credits && <CreditsSection credits={project.credits} />}
      </article>

      {/* 10. NEXT FILM BANNER */}
      <NextProjectBanner nextProject={next} />

      {/* Lightbox Modal */}
      {project.gallery && project.gallery.length > 0 && (
        <Lightbox
          items={project.gallery}
          currentIndex={activeFrameIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setActiveFrameIndex(newIdx)}
        />
      )}
    </StudioLayout>
  );
};
