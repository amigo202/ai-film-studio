import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Mail, Phone, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060608] border-t border-white/10 pt-16 pb-12 overflow-hidden text-right font-hebrew">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5">
          {/* Studio Brand & Director Details */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-syne text-xl sm:text-2xl font-black tracking-wider text-white uppercase flex items-center gap-2">
                  <span>AmitAI</span>
                  <span className="text-amber-400">/</span>
                  <span className="text-zinc-300">אמיתי כהן</span>
                </span>
              </div>
              <div className="text-xs sm:text-sm text-amber-400 font-semibold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>בימוי, קריאייטיב והפקת סרטי AI ברמה קולנועית</span>
              </div>
              <p className="text-lg sm:text-2xl font-light text-zinc-300 leading-relaxed max-w-md">
                לא מייצרים סרטוני AI. <br />
                <strong className="text-white font-medium">בונים עולמות קולנועיים.</strong>
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed max-w-md">
                סטודיו לקריאייטיב, סטוריטלינג ובימוי הפקות סרטי AI עבור מותגים, מוסדות וקמפיינים בינלאומיים.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="https://wa.me/972526016115?text=היי%20אמיתי,%20יש%20לי%20רעיון%20לפרויקט%20סרט%20AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-200 hover:text-emerald-400 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 px-3.5 py-2 rounded-full transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:0526016115"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-200 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 px-3.5 py-2 rounded-full transition-all font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>052-6016115</span>
              </a>

              <a
                href="mailto:amigosy@gmail.com"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-200 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 px-3.5 py-2 rounded-full transition-all font-mono"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>amigosy@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-1">
              ניווט באתר
            </h4>
            <Link
              to="/work"
              className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm flex items-center justify-between group py-1"
            >
              <span>גלריית עבודות וסרטים</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/about"
              className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm flex items-center justify-between group py-1"
            >
              <span>אודות הסטודיו והמניפסט</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/contact"
              className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm flex items-center justify-between group py-1"
            >
              <span>יצירת קשר והצעת מחיר</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-1">
              שירותי הסטודיו
            </h4>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-400">
              <span className="p-2 rounded-lg bg-white/[0.02] border border-white/5">בימוי והפקת סרטי AI</span>
              <span className="p-2 rounded-lg bg-white/[0.02] border border-white/5">עקביות דמויות ושחקנים (LoRA)</span>
              <span className="p-2 rounded-lg bg-white/[0.02] border border-white/5">פרסומות וקמפיינים מותגיים</span>
              <span className="p-2 rounded-lg bg-white/[0.02] border border-white/5">עריכה וסאונד קולנועי 4K</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            <span>© {new Date().getFullYear()} AmitAI — אמיתי כהן. כל הזכויות שמורות.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-zinc-300 transition-colors">
              כניסת מנהל (Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
