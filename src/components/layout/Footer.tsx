import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Mail, Phone, Lock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060608] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Studio Brand & Director Details */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-syne text-2xl font-black tracking-wider text-white uppercase flex items-center gap-2">
                  <span>AmitAI</span>
                  <span className="text-amber-400">/</span>
                  <span className="text-zinc-300">AMITAY COHEN</span>
                </span>
              </div>
              <div className="text-sm font-hebrew text-amber-400 font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>אמיתי כהן — במאי ויוצר סרטי AI וקריאייטיב</span>
              </div>
              <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed font-hebrew max-w-md">
                לא מייצרים סרטוני AI. <br />
                <strong className="text-white font-medium">בונים עולמות קולנועיים.</strong>
              </p>
              <p className="text-sm text-zinc-500 mt-4 leading-relaxed max-w-sm">
                סטודיו לקריאייטיב, סטוריטלינג ובימוי הפקות סרטי AI ברמה בינלאומית עבור מותגים, סוכנויות ופרויקטים עלילתיים.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/972526016115?text=היי%20אמיתי,%20יש%20לי%20רעיון%20לפרויקט%20סרט%20AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-200 hover:text-emerald-400 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 px-4 py-2 rounded-full transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: 052-6016115</span>
              </a>

              <a
                href="tel:0526016115"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-200 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 px-4 py-2 rounded-full transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>052-6016115</span>
              </a>

              <a
                href="mailto:amigosy@gmail.com"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-200 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 px-4 py-2 rounded-full transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>amigosy@gmail.com</span>
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} AmitAI — אמיתי כהן (AMITAY COHEN). כל הזכויות שמורות.
          </div>

          <div className="flex items-center gap-6">
            <span>AmitAI · Film & Creative Direction</span>
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
