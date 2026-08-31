import React, { useState } from 'react';
import { StudioLayout } from '../components/layout/StudioLayout';
import { useProjects } from '../context/ProjectContext';
import { MessageCircle, Mail, Phone, Send, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitInquiry } = useProjects();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Commercial',
    budgetRange: '$5,000 - $15,000',
    timeline: '1-2 חודשים',
    brief: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.brief) return;

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
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Top Header */}
        <div className="max-w-3xl pb-12 border-b border-white/10 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>/ בואו נדבר קולנוע</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white font-syne mb-6">
            יש לכם רעיון לסרט? <br />
            <span className="text-amber-400">בואו נבנה אותו.</span>
          </h1>
          <p className="text-lg text-zinc-300 font-light font-hebrew">
            שלחו לנו בריף ראשוני, רעיון או בקשה להצעת מחיר. אנחנו חוזרים לרוב תוך פחות מ-24 שעות עם כיוון קריאייטיבי ראשוני.
          </p>
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
                href="https://wa.me/972500000000?text=היי,%20יש%20לי%20רעיון%20לפרויקט%20סרט%20AI"
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
                    <h4 className="font-syne font-bold text-white text-lg">WhatsApp ישיר</h4>
                    <p className="text-xs text-zinc-400 font-hebrew">שיחה מיידית עם הבמאי</p>
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
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
                      EMAIL
                    </span>
                    <h4 className="font-syne font-bold text-white text-base">amigosy@gmail.com</h4>
                    <p className="text-xs text-zinc-400 font-hebrew">לשליחת מסמכי בריף ו-PDF</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              {/* Phone */}
              <a
                href="tel:+972500000000"
                className="group flex items-center justify-between p-6 rounded-xl bg-[#121216] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-right"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 text-amber-400 flex items-center justify-center border border-white/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
                      PHONE
                    </span>
                    <h4 className="font-syne font-bold text-white text-base">+972-50-000-0000</h4>
                    <p className="text-xs text-zinc-400 font-hebrew">ימים א'-ה' 09:00 - 19:00</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-400 font-mono">
              <span className="text-amber-400 block mb-1">STUDIO LOCATION</span>
              <span>TEL AVIV · REMOTE CLIENTS WORLDWIDE</span>
            </div>
          </div>

          {/* Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#121216] p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="py-16 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-syne uppercase text-white mb-2">
                  הבריף נשלח בהצלחה!
                </h3>
                <p className="text-zinc-400 font-hebrew max-w-md mx-auto mb-8">
                  תודה שפנית אלינו. קיבלנו את פרטי הפרויקט וצוות הסטודיו יחזור אליך בהקדם עם כיוון הפקה והצעה מותאמת.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider"
                >
                  שליחת בריף נוסף
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-right">
                <div>
                  <h3 className="font-syne text-xl font-bold uppercase text-white tracking-wider mb-2">
                    טופס אפיון ובריף פרויקט
                  </h3>
                  <p className="text-xs text-zinc-400 font-hebrew">
                    ספרו לנו על הסרט שתרצו להפיק כדי שנוכל לחזור עם הערכת תקציב ולוח זמנים מדויק.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ישראל ישראלי"
                      className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      אימייל לחזרה *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      חברה / מותג / סוכנות
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="שם המותג או הסוכנות"
                      className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      טלפון
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="050-0000000"
                      className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      סוג הפרויקט
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Commercial">פרסומת מותג (Commercial)</option>
                      <option value="Storytelling">סרט עלילתי / קצר (Storytelling)</option>
                      <option value="Product">סרטון מוצר / יוקרה (Product)</option>
                      <option value="Social">קמפיין סושיאל (Social)</option>
                      <option value="Digital Humans">שחקנים ודמויות דיגיטליות</option>
                      <option value="Experimental">פרויקט קונספט / R&D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      מסגרת תקציב משוערת
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Up to $5,000">עד $5,000 (פיילוט / טיזר קצר)</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000 (סרטון פרסומת מלא)</option>
                      <option value="$15,000 - $40,000">$15,000 - $40,000 (קמפיין מרובה שוטים/עלילתי)</option>
                      <option value="$40,000+">$40,000+ (הפקה בינלאומית מקיפה)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    תיאור הבריף / הרעיון *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    placeholder="מה הסיפור? מיהו קהל היעד? איזה סגנון ויזואלי אתם מדמיינים? יש לכם רפרנסים או לוח זמנים מוגדר?"
                    className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
                >
                  {loading ? (
                    <span>שולח בריף...</span>
                  ) : (
                    <>
                      <span>שליחת בריף לפרויקט</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </StudioLayout>
  );
};
