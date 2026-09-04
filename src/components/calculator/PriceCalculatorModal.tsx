import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PackageOption {
  id: string;
  badge?: string;
  title: string;
  duration: string;
  price: string;
  turnaround: string;
  features: string[];
}

const PACKAGES: PackageOption[] = [
  {
    id: 'social',
    title: 'סרטון קצר / רילס',
    duration: 'עד 30 שניות',
    price: 'החל מ-9,500 ₪',
    turnaround: '3-5 ימי עבודה',
    features: [
      'מותאם לטיקטוק, אינסטגרם וקמפיינים ממומנים',
      'קונספט קריאייטיבי מהיר וממיר',
      'תנועה קולנועית וסאונד מותאם'
    ]
  },
  {
    id: 'commercial',
    badge: 'הכי מבוקש',
    title: 'סרט פרסומת / תדמית',
    duration: 'דקה עד דקה וחצי',
    price: 'החל מ-16,500 ₪',
    turnaround: '5-7 ימי עבודה',
    features: [
      'תסריט מלא ובימוי קולנועי מוקפד',
      'שחקנים ודמויות עקביות ב-AI',
      'עריכה ועיצוב סאונד ברמת מאסטר קולנועית'
    ]
  },
  {
    id: 'premium',
    title: 'הפקה קולנועית מלאה',
    duration: 'סרט עלילתי / קמפיין שלם',
    price: 'החל מ-28,000 ₪',
    turnaround: '10-14 ימי עבודה',
    features: [
      'בניית עולמות, לוקיישנים וסצנות מורכבות',
      'אימון מודלי LoRA ייעודיים לשחקנים',
      'הפקה רחבה למותגים, מוסדות וגופים ממשלתיים'
    ]
  }
];

export const PriceCalculatorModal: React.FC<PriceCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('commercial');

  if (!isOpen) return null;

  const currentPackage = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[1];

  const whatsappMessage = `היי אמיתי, ראיתי באתר את חבילת ההפקה:
🎬 ${currentPackage.title} (${currentPackage.duration})
💰 מחיר משוער: ${currentPackage.price}
⏱️ זמן אספקה: ${currentPackage.turnaround}

אשמח לתאם שיחה קצרה ולקבל הצעה מותאמת לפרויקט שלי!`;

  const whatsappUrl = `https://wa.me/972526016115?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in text-right font-hebrew">
      <div className="w-full max-w-2xl bg-[#121216] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#16161c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                חבילות הפקה והערכת מחיר
              </h2>
              <span className="text-xs text-zinc-400">
                בחרו את סוג ההפקה המתאים וקבלו הצעת מחיר ישירה בוואטסאפ
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Simple Package Cards */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`cursor-pointer p-5 sm:p-6 rounded-2xl border-2 transition-all relative ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-[#09090b] border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-amber-400 text-black text-[11px] font-bold shadow-md">
                    {pkg.badge}
                  </span>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-black'
                          : 'border-white/30 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{pkg.title}</h3>
                      <span className="text-xs text-zinc-400">{pkg.duration} · אספקה תוך {pkg.turnaround}</span>
                    </div>
                  </div>

                  <div className="text-left font-sans">
                    <span className="text-xl font-black text-amber-400">{pkg.price}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-1.5 pt-3 border-t border-white/5 text-xs text-zinc-300">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Single Big Clean WhatsApp Button Footer */}
        <div className="p-6 bg-[#16161c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-xs text-zinc-400 block">חבילה נבחרת:</span>
            <span className="text-base font-bold text-white">
              {currentPackage.title} ({currentPackage.price})
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>תיאום שיחה וקבלת הצעה בוואטסאפ</span>
          </a>
        </div>
      </div>
    </div>
  );
};
