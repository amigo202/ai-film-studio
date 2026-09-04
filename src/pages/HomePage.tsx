import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { VideoGalleryGrid } from '../components/video/VideoGalleryGrid';
import { StudioLayout } from '../components/layout/StudioLayout';

export const HomePage: React.FC = () => {
  const { projects } = useProjects();
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const publishedProjects = projects.filter((p) => p.status === 'published');

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('film-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StudioLayout>
      {/* 1. FULLSCREEN CINEMATIC HERO WITH BACKGROUND VIDEO & MASSIVE TYPOGRAPHY */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-12 pb-16 overflow-hidden text-right font-hebrew">
        {/* Full-Bleed Ambient Background Video */}
        <div className="absolute inset-0 z-0">
          <img
            src="/thumbnails/cbc-power-train.jpg"
            alt="AmitAI Film Studio"
            className="w-full h-full object-cover brightness-50"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2000&q=85';
            }}
          />

          <video
            ref={heroVideoRef}
            src="/videos/cbc-power-train.mp4"
            muted
            loop
            playsInline
            autoPlay
            onLoadedData={() => setHeroVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover brightness-50 transition-opacity duration-1000 ${
              heroVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Luxury Cinematic Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-[#09090b]/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#09090b]/70" />
        </div>

        {/* Top Studio Micro-Tag */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-zinc-300 text-xs font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>AmitAI · אמיתי כהן · סטודיו לבימוי והפקת סרטי AI</span>
          </div>
        </div>

        {/* Massive Cinema Headline & Subtitle */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white font-syne leading-[1.04] mb-6 drop-shadow-2xl">
              לא מייצרים <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-white via-zinc-100 to-zinc-400">
                סרטונים.
              </span>
              <br />
              <span className="text-amber-400">בונים עולמות.</span>
            </h1>

            <p className="text-base sm:text-2xl md:text-3xl text-zinc-200 font-light max-w-2xl leading-relaxed mb-10 font-hebrew drop-shadow">
              סטודיו הפקה ובימוי של <strong>אמיתי כהן (AmitAI)</strong> — יצירת סרטים ופרסומות מבוססי Generative AI ברמה הקולנועית הגבוהה ביותר.
            </p>

            {/* Clean CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-hebrew max-w-md sm:max-w-none">
              <button
                onClick={scrollToWork}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105"
              >
                <span>צפו ב-18 הסרטים</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 text-xs sm:text-sm font-bold backdrop-blur-md transition-all"
              >
                <span>השארת פרטים לפרויקט</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Clients Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
            <span className="font-mono text-amber-400/90">הפקות וקמפיינים מובילים:</span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-medium text-zinc-300">
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
