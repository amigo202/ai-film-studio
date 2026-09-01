import React from 'react';
import { Link } from 'react-router-dom';
import { StudioLayout } from '../components/layout/StudioLayout';
import { Film, ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const capabilities = [
    {
      title: 'Creative Direction & Concept',
      enTitle: 'CREATIVE DIRECTION',
      desc: 'פיתוח קונספט תסריטאי וויזואלי מאפס, בניית שפה מותגית ייחודית ופיצוח תובנות צרכניות/רגשיות.'
    },
    {
      title: 'AI Film Production',
      enTitle: 'GENERATIVE CINEMA',
      desc: 'הפקת סרטי AI מקצה לקצה — החל מיצירת פריימים בסיסיים, שליטה במצלמות, ועד לרינדור תנועה מורכב.'
    },
    {
      title: 'Character LoRA Consistency',
      enTitle: 'CHARACTER CONSISTENCY',
      desc: 'אימון מודלים מותאמים אישית (LoRA) לשמירה על תווי פנים, הבעות, לבוש וגיל של שחקנים לאורך כל הסרט.'
    },
    {
      title: 'Cinematic Worldbuilding',
      enTitle: 'WORLDBUILDING & ENVIRONMENTS',
      desc: 'בניית עולמות היסטוריים, עתידניים ואבסטרקטיים בדיוק ארכיטקטוני ואווירתי ללא צורך בלוקיישנים פיזיים.'
    },
    {
      title: 'Commercials & Spec Ads',
      enTitle: 'HIGH-END COMMERCIALS',
      desc: 'פרסומות טלוויזיה ודיגיטל באיכות פרימיום עבור רשתות קמעונאות, מותגי יוקרה, טכנולוגיה ורכב.'
    },
    {
      title: '4K Post & Sound Design',
      enTitle: 'POST & SOUND ENGINEERING',
      desc: 'עריכה קצבית ב-DaVinci Resolve, עיצוב סאונד סינמטי מותאם, אפקטים קוליים ו-Upscale באיכות DCI 4K.'
    }
  ];

  return (
    <StudioLayout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Top Header */}
        <div className="max-w-4xl pb-16 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>/ STUDIO MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white font-syne leading-tight mb-8">
            AI CHANGED THE TOOLS. <br />
            <span className="text-amber-400">IT DIDN'T CHANGE</span> <br />
            THE NEED FOR A GOOD IDEA.
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-300 font-light font-hebrew leading-relaxed">
            אנחנו סטודיו הפקה ובימוי המוקדש ליצירת סרטים ופרסומות מבוססי AI. אנחנו לא מתייחסים ל-AI כאל קיצור דרך, אלא כאל מצלמה חדשה לחלוטין — שמאפשרת לבנות עולמות שלמים שלא היו ניתנים להפקה בעבר.
          </p>
        </div>

        {/* Philosophy Grid */}
        <section className="py-20 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
              THE PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne mb-6">
              BEYOND PROMPT GENERATION
            </h2>
            <div className="space-y-4 text-base text-zinc-300 font-hebrew leading-relaxed">
              <p>
                כל אחד יכול לכתוב פרומפט ולקבל תמונה יפה. אבל יצירת סרט קולנועי אמיתי דורשת הרבה מעבר לכך: עקביות של שחקנים לאורך עשרות שוטים, שליטה בדינמיקת תאורה, עריכת קצב מדויקת, עיצוב סאונד שמרעיד את החזה ובימוי שנוגע בלב.
              </p>
              <p>
                הסטודיו פועל לפי מתודולוגיית הפקה קולנועית שלמה (8-Stage Generative Pipeline) שמבטיחה שכל פרויקט יעמוד בסטנדרטים הגבוהים ביותר של הטלוויזיה, הקולנוע ועולם הפרסום הבינלאומי.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-widescreen rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
                alt="AmitAI Visual Development"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    DIRECTOR & FOUNDER
                  </span>
                  <h4 className="text-xl font-syne font-bold uppercase text-white">
                    AmitAI · אמיתי כהן
                  </h4>
                  <p className="text-xs text-zinc-300 font-hebrew mt-2 leading-relaxed">
                    במאי, סטוריטלר ויוצר קולנוע מבוסס AI. מתמחה בבניית עולמות, בימוי מדויק ואימוני עקביות (LoRA) להפקות מסחריות ועלילתיות.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-20">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              SERVICES & CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white font-syne">
              WHAT WE DO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-[#121216] border border-white/5 hover:border-amber-500/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-amber-400 block mb-2">
                    0{idx + 1} / {cap.enTitle}
                  </span>
                  <h3 className="font-syne text-xl font-bold uppercase text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-hebrew leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-16 p-10 md:p-16 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#121216] to-[#121216] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              START A PROJECT
            </span>
            <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white font-syne">
              מוכנים ליצור את הסרט הבא שלכם?
            </h3>
            <p className="text-sm text-zinc-400 font-hebrew mt-2">
              צרו איתנו קשר לשיחת היכרות, בריף או הצעת הפקה מלאה.
            </p>
          </div>

          <Link
            to="/contact"
            className="flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-sm transition-all"
          >
            <span>דברו איתנו</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </StudioLayout>
  );
};
