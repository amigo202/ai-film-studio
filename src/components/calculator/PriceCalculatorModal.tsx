import React, { useState } from 'react';
import { X, Calculator, CheckCircle2, MessageCircle } from 'lucide-react';

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectTypeOption {
  id: string;
  title: string;
  desc: string;
  basePriceMin: number;
  basePriceMax: number;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'commercial',
    title: 'סרט פרסומת ומסחרי',
    desc: 'הפקה קולנועית ממוקדת קמפיין מותג, דיגיטל וטלוויזיה.',
    basePriceMin: 15000,
    basePriceMax: 25000
  },
  {
    id: 'corporate',
    title: 'סרטון תדמית והסברה',
    desc: 'הצגת חזון, מערכת, מוצר טכנולוגי או פעילות ארגונית.',
    basePriceMin: 12000,
    basePriceMax: 20000
  },
  {
    id: 'social-bundle',
    title: 'חבילת רילס וטיקטוק (3-5 סרטונים)',
    desc: 'סדרת סרטונים אנכיים מותאמים לרשתות החברתיות בקצב מהיר.',
    basePriceMin: 14000,
    basePriceMax: 22000
  },
  {
    id: 'narrative',
    title: 'סרט עלילתי / קונספט מורכב',
    desc: 'עולם שלם, דמויות מרובות, נרטיב עמוק ו-VFX מתקדם.',
    basePriceMin: 25000,
    basePriceMax: 45000
  }
];

const DURATIONS = [
  { id: 'short', label: 'עד 30 שניות', multiplier: 0.9, turnaround: '4-6 ימי עבודה' },
  { id: 'medium', label: '60–90 שניות (סטנדרטי)', multiplier: 1.0, turnaround: '7-10 ימי עבודה' },
  { id: 'long', label: '2–3 דקות (מורחב)', multiplier: 1.35, turnaround: '10-14 ימי עבודה' }
];

const ADDONS = [
  { id: 'lora', label: 'אימון עקביות דמויות ושחקנים (LoRA)', price: 3500 },
  { id: 'voice', label: 'קריינות מקצועית ומוזיקה מקורית (AI Score)', price: 2500 },
  { id: 'rush', label: 'אספקה מהירה (עדיפות עריכה ראשונה)', price: 4000 }
];

export const PriceCalculatorModal: React.FC<PriceCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<string>('commercial');
  const [selectedDuration, setSelectedDuration] = useState<string>('medium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['lora']);

  if (!isOpen) return null;

  const currentType = PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
  const currentDuration = DURATIONS.find((d) => d.id === selectedDuration) || DURATIONS[1];

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const calculatedMin = Math.round((currentType.basePriceMin * currentDuration.multiplier + addonsTotal) / 500) * 500;
  const calculatedMax = Math.round((currentType.basePriceMax * currentDuration.multiplier + addonsTotal) / 500) * 500;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const selectedAddonsLabels = selectedAddons
    .map((id) => ADDONS.find((a) => a.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  const whatsappMessage = `היי אמיתי, חישבתי הערכת מחיר באתר עבור:
🎬 סוג פרויקט: ${currentType.title}
⏱️ אורך רצוי: ${currentDuration.label}
✨ תוספות: ${selectedAddonsLabels || 'ללא תוספות'}
💰 הערכת תקציב: ₪${calculatedMin.toLocaleString()} – ₪${calculatedMax.toLocaleString()}
⏱️ זמן אספקה משוער: ${currentDuration.turnaround}

אשמח לתאם שיחה קצרה ולהתקדם!`;

  const whatsappUrl = `https://wa.me/972526016115?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in text-right font-hebrew">
      <div className="w-full max-w-2xl bg-[#121216] border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#16161c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-syne text-xl font-bold text-white uppercase">
                מחשבון עלויות והצעת מחיר
              </h2>
              <span className="text-xs text-zinc-400">
                קבלו הערכת תקציב מדויקת להפקת סרט AI ב-3 צעדים
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              1. בחרו את סוג ההפקה
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400 text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-[#09090b] border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white">{type.title}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{type.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Duration */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              2. אורך הסרטון הרצוי
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DURATIONS.map((dur) => {
                const isSelected = selectedDuration === dur.id;
                return (
                  <button
                    key={dur.id}
                    type="button"
                    onClick={() => setSelectedDuration(dur.id)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-black font-bold border-amber-400'
                        : 'bg-[#09090b] border-white/10 text-zinc-300 hover:border-white/20 text-xs'
                    }`}
                  >
                    <div className="font-bold">{dur.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-ons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              3. תוספות מומלצות
            </label>
            <div className="space-y-2">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-[#09090b] border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-amber-400 border-amber-400 text-black'
                            : 'border-white/20'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                      </div>
                      <span className="text-xs font-bold text-white">{addon.label}</span>
                    </div>
                    <span className="text-xs font-mono text-amber-300/90">+₪{addon.price.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculation Result & WhatsApp CTA Footer */}
        <div className="p-6 bg-[#16161c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-[11px] font-mono text-zinc-400 block">
              הערכת תקציב משוערת · {currentDuration.turnaround}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-syne">
              ₪{calculatedMin.toLocaleString()} – ₪{calculatedMax.toLocaleString()}
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>שליחת הבריף לוואטסאפ של אמיתי</span>
          </a>
        </div>
      </div>
    </div>
  );
};
