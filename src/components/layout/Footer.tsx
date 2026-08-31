import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Mail, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060608] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Studio Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-syne text-2xl font-bold tracking-wider text-white uppercase">
                  AI FILM STUDIO
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                  DIRECTORS
                </span>
              </div>
              <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed font-hebrew max-w-md">
                לא מייצרים סרטוני AI. <br />
                <strong className="text-white font-medium">בונים עולמות קולנועיים.</strong>
              </p>
              <p className="text-sm text-zinc-500 mt-4 leading-relaxed max-w-sm">
                סטודיו לקריאייטיב, סטוריטלינג ובימוי הפקות סרטי AI ברמה בינלאומית עבור מותגים, סוכנויות ופרויקטים עלילתיים.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://wa.me/972500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-300 hover:text-emerald-400 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 px-4 py-2 rounded-full transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp ישיר</span>
              </a>
              <a
                href="mailto:amigosy@gmail.com"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-300 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 px-4 py-2 rounded-full transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
              / ניווט מהיר
            </h4>
            <Link
              to="/work"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center justify-between group"
            >
              <span>תיק עבודות (Work)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/about"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center justify-between group"
            >
              <span>אודות ומניפסט (About)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/contact"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center justify-between group"
            >
              <span>בריף והצעת מחיר (Contact)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
              / יכולות והפקה
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
              <span className="p-2 rounded bg-white/[0.02] border border-white/5">Creative Direction</span>
              <span className="p-2 rounded bg-white/[0.02] border border-white/5">AI Film Production</span>
              <span className="p-2 rounded bg-white/[0.02] border border-white/5">Visual Development</span>
              <span className="p-2 rounded bg-white/[0.02] border border-white/5">Narrative Storytelling</span>
              <span className="p-2 rounded bg-white/[0.02] border border-white/5">Commercials & Ads</span>
              <span className="p-2 rounded bg-white/[0.02] border border-white/5">Character LoRA Consistency</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Discrete Studio Login */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-mono">
          <div>
            © {new Date().getFullYear()} AI FILM STUDIO. כל הזכויות שמורות.
          </div>

          <div className="flex items-center gap-6">
            <span>AI Film · Creative · Storytelling</span>
            {/* Discrete Studio Director Access */}
            <Link
              to="/admin"
              className="text-zinc-700 hover:text-zinc-400 transition-colors flex items-center gap-1.5 p-1"
              title="Studio Director Portal"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[10px]">Studio Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
