import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface ComparisonScene {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

const COMPARISON_SCENES: ComparisonScene[] = [
  {
    id: 'train',
    title: 'רכבת העוצמה במדבר — CBC',
    category: 'פרסומת ומסחרי',
    beforeImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/thumbnails/cbc-power-train.jpg',
    beforeLabel: 'פרומפט בסיסי ללא עיבוד',
    afterLabel: 'תוצאה קולנועית סופית (AmitAI)',
    description: 'הפיכת פריים מדברי סטטי לשוט קולנועי דינמי עם תאורת שקיעה, תנועת מצלמה מהירה וסאונד עוצמתי.'
  },
  {
    id: 'cyber',
    title: 'אגף הסייבר — משרד המשפטים',
    category: 'סרטי תדמית ועלילה',
    beforeImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/thumbnails/cyber-methodica.jpg',
    beforeLabel: 'סקיצת קונספט ראשונית',
    afterLabel: 'שוט מבצעי מלוטש ב-4K',
    description: 'בניית אווירת מתח לילית, תאורת סייבר ממוחשבת ושליטה מלאה בעקביות הדמויות ללא צורך בצילומים מסווגים.'
  },
  {
    id: 'venue',
    title: 'היכל האירועים — CBC Israel',
    category: 'פרסומות מותג',
    beforeImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    afterImage: '/thumbnails/cbc-venue.jpg',
    beforeLabel: 'הדמיה גנרית',
    afterLabel: 'שטיח אדום ותאורת ערב גרנדיוזית',
    description: 'ארכיטקטורה יוקרתית, אפקטי תאורה מדויקים ועיצוב שוט שמעניק תחושת עוצמה ויוקרה בינלאומית.'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scene = COMPARISON_SCENES[activeSceneIndex];

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto font-hebrew text-right">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 justify-end">
            <span>מאחורי הקלעים</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-syne">
            מהפרומפט לשוט הקולנועי המושלם
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-md mt-4 md:mt-0 font-hebrew leading-relaxed">
          גררו את קו הזהב ימינה ושמאלה כדי לראות את ההבדל בין חומר גלם בסיסי לבין התוצאה המלוטשת לאחר בימוי ועיבוד.
        </p>
      </div>

      {/* Scene Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start">
        {COMPARISON_SCENES.map((s, idx) => {
          const isSelected = activeSceneIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => {
                setActiveSceneIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Interactive Split-Screen Slider Box */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-white/15 select-none cursor-ew-resize shadow-2xl bg-black"
      >
        {/* After Image (Full background) */}
        <img
          src={scene.afterImage}
          alt={scene.afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={scene.beforeImage}
            alt={scene.beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 grayscale-[30%]"
          />
        </div>

        {/* Divider Golden Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.6)] font-bold">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-bold text-zinc-300">
          {scene.beforeLabel}
        </div>

        <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-amber-400/95 backdrop-blur-md text-xs font-bold text-black shadow-lg">
          {scene.afterLabel}
        </div>
      </div>

      {/* Scene Description Card */}
      <div className="mt-6 p-6 rounded-xl bg-[#121216] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 block mb-1">
            {scene.category}
          </span>
          <h4 className="font-bold text-white text-base">
            {scene.title}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-2xl">
            {scene.description}
          </p>
        </div>
      </div>
    </section>
  );
};
