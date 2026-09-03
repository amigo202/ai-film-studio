import React, { useState } from 'react';
import { StudioLayout } from '../components/layout/StudioLayout';
import { useProjects } from '../context/ProjectContext';
import { MessageCircle, Mail, Phone, Send, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { PriceCalculatorModal } from '../components/calculator/PriceCalculatorModal';

export const ContactPage: React.FC = () => {
  const { submitInquiry } = useProjects();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'סרט פרסומת ומסחרי',
    budgetRange: '₪15,000 – ₪30,000',
    timeline: '1-2 שבועות',
    brief: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.brief) return;

    setLoading(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        brief: formData.brief
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudioLayout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-right font-hebrew">
        {/* Top Header */}
        <div className="max-w-3xl pb-12 border-b border-white/10 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3 justify-end">
            <span>בואו נדבר קולנוע</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-syne mb-6">
            יש לכם רעיון לסרט? <br />
            <span className="text-amber-400">בואו נבנה אותו.</span>
          </h1>
          <p className="text-lg text-zinc-300 font-light font-hebrew leading-relaxed">
            שלחו לנו בריף ראשוני, רעיון או בקשה להצעת מחיר. אנחנו חוזרים לרוב תוך פחות מ-24 שעות עם כיוון קריאייטיבי ראשוני.
          </p>
        </div>

        {/* Quick Pricing Packages Callout Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#121216] to-[#121216] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                רוצים לראות חבילות הפקה ומחירים?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                צפו ב-3 חבילות ההפקה הפופולריות שלנו לקבלת הצעת מחיר ישירה.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCalculatorOpen(true)}
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>צפייה בחבילות ומחירים</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Quick Direct Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-syne text-xl font-bold uppercase text-white tracking-wider">
                ערוצים ישירים
              </h3>

              {/* WhatsApp Fast CTA */}
              <a
                href="https://wa.me/972526016115?text=היי%20אמיתי,%20יש%20לי%20רעיון%20לפרויקט%20סרט%20AI"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-right"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                      הכי מהיר
                    </span>
                    <h4 className="font-bold text-white text-lg">WhatsApp ישיר</h4>
                    <p className="text-xs text-zinc-400 font-hebrew">שיחה ישירה עם אמיתי כהן (052-6016115)</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Email */}
              <a
                href="mailto:amigosy@gmail.com"
                className="group flex items-center justify-between p-6 rounded-xl bg-[#121216] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-right"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 text-amber-400 flex items-center justify-center border border-white/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                      דוא"ל
                    </span>
                    <h4 className="font-bold text-white text-lg font-mono">amigosy@gmail.com</h4>
                    <p className="text-xs text-zinc-400 font-hebrew">לשליחת בריפים ומסמכים</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Phone */}
              <a
                href="tel:0526016115"
                className="group flex items-center justify-between p-6 rounded-xl bg-[#121216] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-right"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 text-amber-400 flex items-center justify-center border border-white/10">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
                      טלפון
                    </span>
                    <h4 className="font-bold text-white text-lg font-mono">052-6016115</h4>
                    <p className="text-xs text-zinc-400 font-hebrew">מענה בימים א'-ה'</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">הבריף נשלח בהצלחה!</h3>
                  <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    תודה רבה. אמיתי יבחן את הפרטים ויחזור אליכם בהקדם האפשרי.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block mt-4 text-xs font-bold text-amber-400 hover:underline"
                  >
                    שליחת בריף נוסף
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        שם מלא *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ישראל ישראלי"
                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        טלפון נייד *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="050-0000000"
                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        חברה / ארגון / מותג
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="שם החברה"
                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        כתובת דוא"ל
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        סוג ההפקה
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="סרט פרסומת ומסחרי">סרט פרסומת ומסחרי</option>
                        <option value="סרטון תדמית והסברה">סרטון תדמית והסברה</option>
                        <option value="סרט עלילתי / מודעות חברתית">סרט עלילתי / מודעות חברתית</option>
                        <option value="פודקאסט וידאו / אחר">פודקאסט וידאו / אחר</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-2">
                        תקציב משוער
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="₪10,000 – ₪25,000">₪10,000 – ₪25,000</option>
                        <option value="₪25,000 – ₪50,000">₪25,000 – ₪50,000</option>
                        <option value="₪50,000+">₪50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-2">
                      ספרו לנו על הפרויקט והחזון *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      placeholder="מה מטרת הסרטון? מה האורך הרצוי? האם יש תסריט או רעיון ראשוני?"
                      className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.name || !formData.phone || !formData.brief}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'שולח...' : 'שליחת פרטים והצעת מחיר'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global Calculator Modal */}
      <PriceCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />
    </StudioLayout>
  );
};
