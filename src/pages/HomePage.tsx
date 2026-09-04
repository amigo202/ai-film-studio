import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Play, X, Clock } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { VideoGalleryGrid } from '../components/video/VideoGalleryGrid';
import { StudioLayout } from '../components/layout/StudioLayout';
import type { Project } from '../types/project';

export const HomePage: React.FC = () => {
  const { projects } = useProjects();
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);

  const publishedProjects = projects.filter((p) => p.status === 'published');
  // Top featured premiere film
  const featuredProject = publishedProjects[0] || null;

  const scrollToWork = () => {
    const el = document.getElementById('film-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StudioLayout>
      {/* 1. CINEMA SHOWCASE HERO */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between px-4 sm:px-6 md:px-12 pt-8 pb-12 overflow-hidden text-right font-hebrew">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 z-0 bg-[#09090b]">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        </div>

        {/* Top Tag */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>AmitAI · סטודיו להפקת סרטי AI ופרסומות</span>
          </div>
        </div>

        {/* Central Split Grid: Left = Video Premiere Card, Right = Big Cinematic Headline */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Right Column: High-Impact Typography (7 Cols) */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-syne leading-[1.1] mb-4">
              לא מייצרים סרטונים. <br />
              <span className="text-amber-400">בונים עולמות קולנועיים.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-xl leading-relaxed mb-8">
              סטודיו הבימוי והקריאייטיב של <strong>אמיתי כהן (AmitAI)</strong> — יצירת סרטים, פרסומות וקמפיינים מבוססי Generative AI ברמה קולנועית 4K.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToWork}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all hover:scale-105"
              >
                <span>צפו ב-18 הסרטים</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-bold transition-all"
              >
                <span>שיחת ייעוץ והצעת מחיר</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Left Column: Featured Film Showcase Card (5 Cols) */}
          {featuredProject && (
            <div className="lg:col-span-5">
              <div
                onClick={() => setFeaturedModalOpen(true)}
                className="group relative rounded-2xl overflow-hidden bg-[#121216] border border-amber-500/30 hover:border-amber-400 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                {/* Poster Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={featuredProject.video.posterUrl || '/thumbnails/cbc-power-train.jpg'}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Big Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.7)] group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Premiere Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-500/90 text-black text-[11px] font-bold uppercase tracking-wider">
                    הקרנת בכורה
                  </div>

                  {featuredProject.video.duration && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/80 text-[11px] font-mono text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{featuredProject.video.duration}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 bg-[#14141a]">
                  <span className="text-[11px] font-mono text-amber-400 block mb-1">
                    {featuredProject.client}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clients & Social Proof Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 border-t border-white/10 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <span className="font-mono text-amber-400/80">הפקות וקמפיינים מובילים:</span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-medium text-zinc-300">
              <span>CBC ישראל</span>
              <span className="text-white/20">•</span>
              <span>משרד המשפטים</span>
              <span className="text-white/20">•</span>
              <span>רכבת ישראל</span>
              <span className="text-white/20">•</span>
              <span>WIN CAMP</span>
              <span className="text-white/20">•</span>
              <span>אורט אדיבי</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Modal */}
      {featuredModalOpen && featuredProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={() => setFeaturedModalOpen(false)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-5xl bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video w-full bg-black">
              <video
                src={featuredProject.video.masterUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 text-right font-hebrew">
              <span className="text-xs font-mono text-amber-400 block mb-1">
                {featuredProject.client}
              </span>
              <h3 className="text-lg font-bold text-white">
                {featuredProject.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIRECT VIDEO GALLERY */}
      <section id="film-gallery" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <VideoGalleryGrid
          projects={publishedProjects}
          title="גלריית הסרטים וההפקות"
          subtitle="צפייה ישירה ומיידית בכל הסרטים"
        />

        <div className="pt-10 sm:pt-14 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#121216] hover:bg-amber-500/10 text-white hover:text-amber-300 border border-white/10 hover:border-amber-500/40 text-xs sm:text-sm font-hebrew font-bold tracking-wide transition-all"
          >
            <span>לצפייה בכל 18 הסרטים</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. STUDIO MANIFESTO (Clean & Short) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#060608] border-y border-white/10 text-right font-hebrew">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
            מניפסט הסטודיו
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            ה-AI שינתה את הכלים. <br />
            <span className="text-amber-400">היא לא שינתה את הצורך ברעיון מעולה ובבימוי חכם.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-8 max-w-2xl">
            הטכנולוגיה מאפשרת להפיק סצנות מורכבות ללא ימי צילום ארוכים — אבל הלב של כל סרט נשאר בימוי מדויק, כתיבה חכמה ושפה חזותית אחידה.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-xs font-bold block mb-1">01</span>
              <h3 className="font-bold text-white text-sm mb-1">תסריט ובימוי מלא</h3>
              <p className="text-xs text-zinc-400">פיתוח קונספט, כתיבה ושפה ויזואלית מותאמת.</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-xs font-bold block mb-1">02</span>
              <h3 className="font-bold text-white text-sm mb-1">עקביות דמויות ושחקנים</h3>
              <p className="text-xs text-zinc-400">שליטה מלאה בדמויות ותאורה לאורך כל הסרט (LoRA).</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-xs font-bold block mb-1">03</span>
              <h3 className="font-bold text-white text-sm mb-1">איכות שידור 4K וסאונד</h3>
              <p className="text-xs text-zinc-400">עריכה מקצועית, עיצוב סאונד קולנועי ומאסטרינג.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAST CONTACT CTA BANNER */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 max-w-3xl mx-auto text-center font-hebrew">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#121216] to-[#09090b] border border-white/10 shadow-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
            בואו נדבר
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-tight">
            יש לכם רעיון לסרט? <br />
            <span className="text-amber-400">בואו נבנה אותו.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
            פרסומת למותג, סרט קונספט או סרטון תדמית — מוזמנים ליצור קשר ישיר לשיחת ייעוץ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/972526016115?text=היי%20אמיתי,%20יש%20לי%20רעיון%20לפרויקט%20סרט%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg transition-all"
            >
              <span>WhatsApp: 052-6016115</span>
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-bold transition-all"
            >
              <span>השארת פרטים</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </StudioLayout>
  );
};
