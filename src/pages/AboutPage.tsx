import React from 'react';
import { StudioLayout } from '../components/layout/StudioLayout';
import { Sparkles, MessageCircle, Phone } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <StudioLayout>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 text-right font-hebrew">
        {/* Top Header */}
        <div className="pb-12 border-b border-white/10 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 justify-end">
            <span>אודות הסטודיו</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-syne leading-tight mb-6">
            לא מייצרים סרטוני AI. <br />
            <span className="text-amber-400">בונים עולמות קולנועיים.</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl">
            סטודיו ההפקה והבימוי של <strong>אמיתי כהן (AmitAI)</strong> מתמחה ביצירת סרטים, פרסומות וסרטוני תדמית מבוססי בינה מלאכותית (Generative AI Cinema) ברמה הגבוהה ביותר — מפיצוח הקונספט ועד למאסטר הסופי.
          </p>
        </div>

        {/* Studio Philosophy & Narrative */}
        <section className="space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed pb-16 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">
            מי אנחנו ומה החזון שלנו?
          </h2>
          <p>
            בעולם שבו כולם יכולים להקליד פרומפט ולקבל תמונה, ההבדל בין סרטון חובבני לבין <strong>סרט קולנועי שמרגש ומוכר</strong> הוא בבימוי, בכתיבה ובהבנת השפה הקולנועית.
          </p>
          <p>
            אנחנו משלבים את הכלים המתקדמים בעולם (Midjourney, Runway, Kling, Veo, DaVinci Resolve) עם עקרונות בימוי מסורתיים: פיתוח תסריט מהודק, עקביות של שחקנים ודמויות לאורך כל הסרט, שליטה מלאה בתאורה ועיצוב סאונד עוצמתי.
          </p>
        </section>

        {/* 3 Core Values (Clean & Simple) */}
        <section className="py-16 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">
            למה מותגים וארגונים בוחרים לעבוד איתנו?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10">
              <span className="text-2xl font-bold text-amber-400 block mb-3">01</span>
              <h3 className="text-lg font-bold text-white mb-2">בימוי וקריאייטיב מלא</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                אנחנו לא רק מפעילים תוכנה — אנחנו בונים את הרעיון, כותבים את התסריט ומובילים את החזון הוויזואלי.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10">
              <span className="text-2xl font-bold text-amber-400 block mb-3">02</span>
              <h3 className="text-lg font-bold text-white mb-2">חיסכון עצום בזמן ותקציב</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                בלי ימי צילום מורכבים, בלי השכרת לוקיישנים יקרים — אספקת סרט מלוטש תוך ימים בודדים.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121216] border border-white/10">
              <span className="text-2xl font-bold text-white mb-2">03</span>
              <h3 className="text-lg font-bold text-white mb-2">איכות שידור 4K ללא פשרות</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                אימון עקביות דמויות (LoRA), עריכה קצבית ועיצוב סאונד מותאם ברמה הגבוהה ביותר.
              </p>
            </div>
          </div>
        </section>

        {/* Direct Contact Card */}
        <section className="pt-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#121216] to-[#121216] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
                בואו נדבר
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                רוצים להפיק סרט עם אמיתי?
              </h3>
              <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                מוזמנים ליצור קשר ישיר לשיחת ייעוץ, פיצוח רעיון או קבלת הצעת מחיר.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/972526016115?text=היי%20אמיתי,%20אשמח%20לשמוע%20על%20הפקת%20סרט%20AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-lg hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 052-6016115</span>
              </a>

              <a
                href="tel:0526016115"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>052-6016115</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
};
