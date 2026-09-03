import React from 'react';
import { Link } from 'react-router-dom';
import { StudioLayout } from '../components/layout/StudioLayout';
import { Film, ArrowUpRight, MessageCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const capabilities = [
    {
      title: 'קריאייטיב ופיתוח קונספט',
      desc: 'פיתוח קונספט תסריטאי וויזואלי מאפס, בניית שפה מותגית ייחודית ופיצוח תובנות צרכניות ורגשיות.'
    },
    {
      title: 'הפקת סרטי AI מקצה לקצה',
      desc: 'הפקת סרטים מלאה — החל מיצירת שוטים מרהיבים, שליטה במצלמות, ועד לרינדור תנועה קולנועי מורכב.'
    },
    {
      title: 'עקביות שחקנים ודמויות (LoRA)',
      desc: 'אימון מודלים מותאמים אישית (LoRA) לשמירה על תווי פנים, הבעות, לבוש וגיל של שחקנים לאורך כל הסרט.'
    },
    {
      title: 'בניית עולמות ולוקיישנים',
      desc: 'בניית עולמות היסטוריים, עתידניים ואבסטרקטיים בדיוק ארכיטקטוני ואווירתי ללא צורך בלוקיישנים פיזיים.'
    },
    {
      title: 'פרסומות וקמפיינים למותגים',
      desc: 'פרסומות טלוויזיה ודיגיטל באיכות פרימיום עבור חברות מובילות, רשתות קמעונאות, מוסדות ומשרדי ממשלה.'
    },
    {
      title: 'עריכה וסאונד באיכות 4K',
      desc: 'עריכה קצבית ב-DaVinci Resolve, עיצוב סאונד סינמטי מותאם, אפקטים קוליים ואיכות שידור 4K סופית.'
    }
  ];

  return (
    <StudioLayout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-right font-hebrew">
        {/* Top Header */}
        <div className="max-w-4xl pb-16 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 justify-end">
            <span>מניפסט הסטודיו</span>
            <Film className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-syne leading-tight mb-8">
            ה-AI שינתה את הכלים. <br />
            <span className="text-amber-400">היא לא שינתה את הצורך</span> <br />
            ברעיון מעולה ובבימוי חכם.
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-300 font-light font-hebrew leading-relaxed">
            אנחנו סטודיו הפקה ובימוי המוקדש ליצירת סרטים ופרסומות מבוססי AI. אנחנו לא מתייחסים ל-AI כאל קיצור דרך, אלא כאל מצלמה חדשה לחלוטין — שמאפשרת לבנות עולמות שלמים שלא היו ניתנים להפקה בעבר.
          </p>
        </div>

        {/* Philosophy Grid */}
        <section className="py-20 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
              הפילוסופיה שלנו
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              הרבה מעבר לכתיבת פרומפט
            </h2>
            <div className="space-y-4 text-base text-zinc-300 font-hebrew leading-relaxed">
              <p>
                כל אחד יכול לכתוב פרומפט ולקבל תמונה יפה. אבל יצירת סרט קולנועי אמיתי דורשת הרבה מעבר לכך: עקביות של שחקנים לאורך עשרות שוטים, שליטה בדינמיקת תאורה, עריכת קצב מדויקת, עיצוב סאונד שמרעיד את החזה ובימוי שנוגע בלב.
              </p>
              <p>
                הסטודיו פועל לפי מתודולוגיית הפקה קולנועית שלמה שמבטיחה שכל פרויקט יעמוד בסטנדרטים הגבוהים ביותר של הטלוויזיה, הקולנוע ועולם הפרסום.
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8 text-right">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    במאי ומייסד הסטודיו
                  </span>
                  <h4 className="text-xl font-syne font-bold uppercase text-white">
                    AmitAI · אמיתי כהן
                  </h4>
                  <p className="text-xs text-zinc-300 font-hebrew mt-2 leading-relaxed">
                    במאי, סטוריטלר ויוצר קולנוע מבוסס AI. מתמחה בבניית עולמות, בימוי מדויק ואימוני עקביות שחקנים (LoRA) להפקות מסחריות, מוסדיות ועלילתיות.
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
              שירותים ויכולות
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              מה אנחנו עושים
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
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-amber-300 transition-colors">
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
        <section className="py-16 p-10 md:p-16 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#121216] to-[#121216] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8 text-right">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              בואו נשתף פעולה
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
              יש לכם פרויקט שרוצה לבלוט?
            </h3>
            <p className="text-sm text-zinc-400 font-hebrew max-w-lg leading-relaxed">
              דברו ישירות עם אמיתי לקבלת ייעוץ, כיוון קריאייטיבי והצעת מחיר מותאמת.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/972526016115?text=היי%20אמיתי,%20אשמח%20לשמוע%20על%20הפקת%20סרט%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold tracking-wider text-xs uppercase transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>שיחה מהירה בוואטסאפ</span>
            </a>

            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold tracking-wider text-xs uppercase transition-all shadow-lg"
            >
              <span>צור קשר</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
};
