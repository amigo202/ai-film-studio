import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { StudioLayout } from '../components/layout/StudioLayout';
import { CinemaPlayer } from '../components/video/CinemaPlayer';
import { NextProjectBanner } from '../components/project/NextProjectBanner';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProjectBySlug, getAdjacentProjects } = useProjects();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!slug) return <Navigate to="/work" replace />;

  const project = getProjectBySlug(slug);
  if (!project) {
    return (
      <StudioLayout>
        <div className="max-w-7xl mx-auto px-6 py-32 text-center font-hebrew">
          <h1 className="text-3xl font-bold text-white mb-4">פרויקט לא נמצא</h1>
          <p className="text-zinc-400 mb-8">הפרויקט המבוקש אינו קיים או הוסר מהארכיון.</p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-bold text-xs uppercase"
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

  return (
    <StudioLayout>
      <Helmet>
        <title>{project.title} | AmitAI Film Studio</title>
        <meta name="description" content={project.shortDescription || project.title} />
      </Helmet>

      <article className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-24 text-right font-hebrew">
        {/* Breadcrumb & Share */}
        <div className="flex items-center justify-between py-6 text-xs text-zinc-400 border-b border-white/10 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-all text-xs"
              title="העתקת קישור לשיתוף"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'הקישור הועתק!' : 'שיתוף קישור'}</span>
            </button>
          </div>

          <Link
            to="/work"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors text-xs font-bold"
          >
            <span>חזרה לכל הסרטים והעבודות</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>

        {/* 1. MASTER VIDEO PLAYER */}
        <section className="mb-12 rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl bg-black">
          <CinemaPlayer video={project.video} title={project.title} />
        </section>

        {/* 2. PROJECT HEADER */}
        <header className="pb-10 border-b border-white/10">
          <div className="flex items-center justify-end gap-3 text-xs text-amber-400 font-mono mb-3">
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-4xl ml-auto">
              {project.shortDescription}
            </p>
          )}
        </header>

        {/* 3. PROJECT DETAILS TABLE */}
        <section className="py-8 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#121216]/50 p-6 md:p-8 rounded-2xl my-8">
          <div>
            <span className="text-xs text-zinc-500 block mb-1">לקוח / מותג</span>
            <span className="text-base font-bold text-white">{project.client || 'AmitAI'}</span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">שנת הפקה</span>
            <span className="text-base font-bold text-white">{project.year || '2026'}</span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">בימוי וקריאייטיב</span>
            <span className="text-base font-bold text-amber-400">אמיתי כהן (AmitAI)</span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">כלי AI והפקה</span>
            <span className="text-base font-bold text-white">
              {project.techStack?.join(', ') || 'Generative AI Cinema, DaVinci'}
            </span>
          </div>
        </section>

        {/* Next Project Banner */}
        {next && (
          <div className="mt-16">
            <NextProjectBanner nextProject={next} />
          </div>
        )}
      </article>
    </StudioLayout>
  );
};
