import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { VideoGalleryGrid } from '../components/video/VideoGalleryGrid';
import { StudioLayout } from '../components/layout/StudioLayout';

export const HomePage: React.FC = () => {
  const { projects } = useProjects();
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const publishedProjects = projects.filter((p) => p.status === 'published');

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  const toggleSound = () => {
    if (heroVideoRef.current) {
      const nextMuted = !isMuted;
      heroVideoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlayPause = () => {
    if (heroVideoRef.current) {
      if (isPlaying) {
        heroVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        heroVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('film-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StudioLayout>
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-6 md:px-12 pt-8 pb-16 overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src="/thumbnails/cbc-power-train.jpg"
            alt="AmitAI Film Studio Showreel Hero"
            className="w-full h-full object-cover brightness-40"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2000&q=85';
            }}
          />

          <video
            ref={heroVideoRef}
            src="/videos/cbc-power-train.mp4"
            muted={isMuted}
            loop
            playsInline
            onLoadedData={() => setHeroVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover brightness-40 transition-opacity duration-1000 ${
              heroVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-[#09090b]/70" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#09090b]/80" />
        </div>

        {/* Top Floating Showreel Controls */}
        <div className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-2">
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 hover:border-amber-400/50 text-white text-xs backdrop-blur-md transition-all shadow-lg"
            title={isPlaying ? 'השהה סרטון' : 'נגן סרטון'}
          >
            {isPlaying ? (
              <span className="flex items-center gap-0.5">
                <span className="w-1 h-3 bg-white rounded-xs" />
                <span className="w-1 h-3 bg-white rounded-xs" />
              </span>
            ) : (
              <span className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-amber-400 ml-0.5" />
            )}
          </button>

          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 hover:border-amber-400/50 text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all shadow-lg group"
            title={isMuted ? 'הפעל סאונד' : 'השתק סאונד'}
          >
            {isMuted ? (
              <>
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span>הפעל סאונד</span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-amber-400 animate-pulse" />
                  <span className="w-0.5 h-2 bg-amber-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-pulse delay-150" />
                </span>
                <span className="text-amber-400 font-bold">סאונד פועל</span>
              </>
            )}
          </button>
        </div>

        {/* Top Studio Micro-Tag */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-zinc-300 text-xs font-hebrew tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>AmitAI · אמיתי כהן · בימוי והפקת סרטי AI ברמה קולנועית</span>
          </div>
        </div>

        {/* Hero Central Headline */}
        <div className="relative z-10 max-w-7xl mx-auto w-full py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white font-syne leading-[1.05] mb-6">
              לא מייצרים <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-white via-zinc-200 to-zinc-500">
                סרטוני AI.
              </span>
              <br />
              <span className="text-amber-400">בונים עולמות.</span>
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-300 font-light max-w-2xl font-hebrew leading-relaxed mb-8">
              סטודיו הפקה ובימוי של אמיתי כהן (AmitAI) — שילוב של קריאייטיב עמוק, סטוריטלינג וטכנולוגיות Generative Cinema ליצירת סרטים ופרסומות באיכות קולנועית.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 font-hebrew">
              <button
                onClick={scrollToWork}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold tracking-wider text-sm transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105"
              >
                <span>צפו בגלריית הסרטים</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>

              <Link
                to="/contact"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-amber-400/50 font-bold tracking-wider text-sm backdrop-blur-md transition-all"
              >
                <span>התחלת פרויקט</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Hero Info Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-white/10 pt-6 text-xs font-hebrew text-zinc-400">
          <div>
            <span>במאי ומפיק קולנוע AI · ישראל והעולם</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{publishedProjects.length} סרטים והפקות</span>
          </div>
        </div>
      </section>

      {/* 2. DIRECT VIDEO GALLERY */}
      <section id="film-gallery" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <VideoGalleryGrid
          projects={publishedProjects}
          title="גלריית הסרטים וההפקות"
          subtitle="צפייה ישירה ומיידית בכל הסרטים"
        />

        <div className="pt-16 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#121216] hover:bg-amber-500/10 text-white hover:text-amber-300 border border-white/10 hover:border-amber-500/40 text-sm font-hebrew font-bold tracking-wide transition-all"
          >
            <span>לצפייה בכל הסרטים והעבודות</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. STUDIO MANIFESTO & PHILOSOPHY */}
      <section className="py-28 px-6 md:px-12 bg-[#060608] border-y border-white/10 relative overflow-hidden font-hebrew">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>מניפסט הסטודיו</span>
          </div>

          <blockquote className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8 font-hebrew">
            "ה-AI שינתה את הכלים. <br />
            <span className="text-amber-400">היא לא שינתה את הצורך</span> ברעיון מעולה ובבימוי חכם."
          </blockquote>

          <p className="text-lg md:text-xl text-zinc-400 font-light font-hebrew max-w-3xl mx-auto leading-relaxed mb-12">
            הטכנולוגיה מאפשרת לנו להפיק סצנות מורכבות ללא צילומי שטח ממושכים — אבל הלב של כל סרט נשאר בימוי מדויק, כתיבה חכמה וראייה קולנועית חסרת פשרות.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right font-hebrew">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-sm font-bold block mb-2">01</span>
              <h4 className="font-bold text-white text-base mb-1">תסריט וקריאייטיב</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">פיתוח קונספטים מקוריים המותאמים למותג או לנרטיב.</p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-sm font-bold block mb-2">02</span>
              <h4 className="font-bold text-white text-base mb-1">בימוי ועקביות דמויות</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">שליטה מלאה בדמויות, תאורה ושפה חזותית אחידה (LoRA).</p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-sm font-bold block mb-2">03</span>
              <h4 className="font-bold text-white text-base mb-1">תנועה ואנימציה קולנועית</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">שליטה מתקדמת בתנועות מצלמה, זרימת חומרים וסנכרון.</p>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-mono text-amber-400 text-sm font-bold block mb-2">04</span>
              <h4 className="font-bold text-white text-base mb-1">עריכה, סאונד ומאסטרינג</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">עריכה מקצועית ב-DaVinci, עיצוב סאונד מותאם ורינדור 4K סופי.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAST CONTACT CTA BANNER */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center font-hebrew">
        <div className="p-12 md:p-20 rounded-2xl bg-gradient-to-b from-[#121216] to-[#09090b] border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
              בואו נדבר
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              יש לכם רעיון לסרט? <br />
              <span className="text-amber-400">בואו נבנה אותו.</span>
            </h2>
            <p className="text-base text-zinc-400 font-hebrew mb-10 leading-relaxed">
              פרסומת למותג, סרט קונספט, קמפיין דיגיטלי או פרויקט עלילתי שלם — אנחנו כאן כדי להפוך את החזון להפקה קולנועית.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/972526016115?text=היי%20אמיתי,%20יש%20לי%20רעיון%20לפרויקט%20סרט%20AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 052-6016115</span>
              </a>

              <Link
                to="/contact"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-amber-400/50 font-bold tracking-wider text-sm backdrop-blur-md transition-all"
              >
                <span>השארת פרטים להצעת מחיר</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </StudioLayout>
  );
};
