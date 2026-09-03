import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { VideoGalleryGrid } from '../components/video/VideoGalleryGrid';
import { StudioLayout } from '../components/layout/StudioLayout';
import { Film } from 'lucide-react';

const CATEGORIES = [
  { label: 'הכל', value: 'All' },
  { label: 'פרסומות ומסחרי', value: 'Commercial' },
  { label: 'סרטי תדמית ועלילה', value: 'Storytelling' },
  { label: 'חינוך ומודעות', value: 'Education' },
  { label: 'סושיאל וקהילה', value: 'Social' },
  { label: 'טכנולוגיה וקונספט', value: 'Experimental' },
];

export const WorkPage: React.FC = () => {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const published = projects.filter((p) => p.status === 'published');

  const filteredProjects = published.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <StudioLayout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-right font-hebrew">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/10 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3 justify-end">
              <span>מאגר הסרטים המלא</span>
              <Film className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-syne">
              גלריית העבודות והסרטים
            </h1>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mt-4 md:mt-0 font-hebrew leading-relaxed">
            מאגר הפקות וסרטי ה-AI של אמיתי כהן (AmitAI). לחיצה על כל סרטון מפעילה צפייה ישירה באיכות מלאה.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start md:justify-start">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-105'
                    : 'bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Video Gallery Grid */}
        <VideoGalleryGrid
          projects={filteredProjects}
          title=""
          subtitle=""
        />
      </div>
    </StudioLayout>
  );
};
