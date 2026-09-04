import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react';
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
      {/* 1. CLEAN CINEMATIC HERO (Muted Background Video, No Clutter) */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center px-5 sm:px-8 md:px-12 py-16 overflow-hidden text-right font-hebrew">
        {/* Silent Atmospheric Ambient Video */}
        <div className="absolute inset-0 z-0">
          <img
            src="/thumbnails/cbc-power-train.jpg"
            alt="AmitAI Film Studio"
            className="w-full h-full object-cover brightness-[0.35]"
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
            className={`absolute inset-0 w-full h-full object-cover brightness-[0.35] transition-opacity duration-1000 ${
              heroVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-[#09090b]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
            סטודיו הפקה ובימוי סרטי AI
          </span>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white font-syne leading-tight mb-4">
            לא מייצרים סרטונים. <br />
            <span className="text-amber-400">בונים עולמות קולנועיים.</span>
          </h1>

          <p className="text-sm sm:text-lg text-zinc-300 font-light max-w-xl leading-relaxed mb-8">
            אמיתי כהן (AmitAI) — יצירת סרטים, פרסומות ותוכן קולנועי מבוסס AI ברמה הגבוהה ביותר.
          </p>

          {/* Single Clean CTA Button */}
          <div>
            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all hover:scale-105"
            >
              <span>צפו בגלריית הסרטים</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. DIRECT VIDEO GALLERY */}
      <section id="film-gallery" className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
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
              <MessageCircle className="w-4 h-4 fill-current" />
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
