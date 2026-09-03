import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import {
  CheckCircle2,
  MessageCircle,
  Lock,
  ArrowRight,
  Share2,
  Clock,
  Sparkles
} from 'lucide-react';
import { CinemaPlayer } from '../components/video/CinemaPlayer';

export const ClientReviewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useProjects();
  const [copied, setCopied] = useState(false);

  const project = projects.find((p) => p.slug === slug || p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-[#121216] border border-white/10 p-8 rounded-2xl">
          <Lock className="w-12 h-12 text-amber-400 mx-auto mb-4 opacity-80" />
          <h2 className="font-syne text-2xl font-bold text-white mb-2">
            סרטון לא נמצא
          </h2>
          <p className="text-sm text-zinc-400 font-hebrew mb-6">
            הקישור שקיבלת אינו פעיל או שהסרטון הוסר.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-syne font-bold uppercase text-xs"
          >
            <span>חזרה לאתר הראשי</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const approveWhatsappUrl = `https://wa.me/972526016115?text=${encodeURIComponent(
    `היי אמיתי, צפיתי בסרטון "${project.title}" (${project.client}) ואני מאשר את הגרסה הזו לפרסום! ✅`
  )}`;

  const feedbackWhatsappUrl = `https://wa.me/972526016115?text=${encodeURIComponent(
    `היי אמיתי, צפיתי בסרטון "${project.title}" (${project.client}). הנה כמה דגשים והערות לדיוק: `
  )}`;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-24 film-grain selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Review Room Header */}
      <header className="bg-[#121216] border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-syne font-black text-white text-lg tracking-wider">
                AmitAI
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest hidden sm:inline">
                PRIVATE SCREENING ROOM
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-white/10 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'הקישור הועתק!' : 'שתף קישור'}</span>
            </button>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>גרסה לבדיקת לקוח</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Screening Content */}
      <main className="max-w-5xl mx-auto px-6 pt-8 space-y-8">
        {/* Project Header Info */}
        <div className="text-right space-y-2">
          <div className="flex items-center justify-end gap-3 text-xs font-mono text-amber-400">
            {project.video.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{project.video.duration}</span>
              </span>
            )}
            <span>·</span>
            <span>{project.client || 'AmitAI Studio'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-syne">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="text-base text-zinc-400 font-hebrew max-w-3xl ml-auto">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Cinematic Video Player */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-black">
          <CinemaPlayer video={project.video} title={project.title} autoPlayOnMount={true} />
        </div>

        {/* Client Decision & Action Card */}
        <div className="bg-[#121216] border-2 border-amber-500/30 rounded-2xl p-6 md:p-8 text-right space-y-6">
          <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-syne text-xl font-bold uppercase text-white flex items-center justify-end gap-2">
                <span>אישור גרסה ומשוב להפקה</span>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                הסרטון מוכן לעיונך. אנא בחר האם לאשר את הגרסה או לשלוח הערות לדיוק ישירות לאמיתי.
              </p>
            </div>

            {/* Director Badge */}
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="text-right">
                <div className="text-xs font-bold text-white font-syne">אמיתי כהן (AmitAI)</div>
                <div className="text-[11px] font-mono text-amber-400/80">בימוי והפקה קולנועית</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-black font-syne">
                AC
              </div>
            </div>
          </div>

          {/* 2 Big Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={approveWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>אשר גרסה זו (מעבר לוואטסאפ)</span>
            </a>

            <a
              href={feedbackWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-amber-400/50 font-syne font-bold uppercase tracking-wider text-sm transition-all"
            >
              <MessageCircle className="w-5 h-5 text-amber-400" />
              <span>שלח הערות לדיוק</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
