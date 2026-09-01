import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import type { ProjectCategory, WorkType } from '../types/project';
import { VideoPreviewCard } from '../components/video/VideoPreviewCard';
import { VideoGalleryGrid } from '../components/video/VideoGalleryGrid';
import { StudioLayout } from '../components/layout/StudioLayout';
import { Film, LayoutGrid, List, PlaySquare } from 'lucide-react';

const CATEGORIES: { label: string; value: 'All' | ProjectCategory }[] = [
  { label: 'הכל', value: 'All' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Storytelling', value: 'Storytelling' },
  { label: 'Product', value: 'Product' },
  { label: 'Social', value: 'Social' },
  { label: 'Education', value: 'Education' },
  { label: 'Experimental', value: 'Experimental' },
];

export const WorkPage: React.FC = () => {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedWorkType, setSelectedWorkType] = useState<'all' | WorkType>('all');
  const [viewMode, setViewMode] = useState<'gallery' | 'grid' | 'editorial'>('gallery');

  const published = projects.filter((p) => p.status === 'published');

  const filteredProjects = published.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchWorkType = selectedWorkType === 'all' || p.workType === selectedWorkType;
    return matchCategory && matchWorkType;
  });

  return (
    <StudioLayout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/10 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>/ FILMS & VIDEO VAULT</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tight text-white font-syne">
              ALL FILMS & WORKS
            </h1>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm mt-4 md:mt-0 font-hebrew">
            מאגר הסרטים והפקות ה-AI של AmitAI. לחיצה על כל סרטון מפעילה צפייה ישירה באיכות מלאה.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter (Client Work vs Concept) & View Mode */}
          <div className="flex items-center gap-4 self-end lg:self-auto">
            {/* Work Nature Toggle */}
            <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setSelectedWorkType('all')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedWorkType === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                הכל
              </button>
              <button
                onClick={() => setSelectedWorkType('client_work')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedWorkType === 'client_work' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Client Work
              </button>
              <button
                onClick={() => setSelectedWorkType('concept_work')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedWorkType === 'concept_work' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Concept / Original
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10 text-zinc-400">
              <button
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono transition-colors ${
                  viewMode === 'gallery' ? 'bg-amber-400 text-black font-bold' : 'hover:text-white'
                }`}
                title="גלריית וידאו (צפייה ישירה)"
              >
                <PlaySquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">גלריה</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'hover:text-white'}`}
                title="תצוגת גריד"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('editorial')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'editorial' ? 'bg-zinc-800 text-white' : 'hover:text-white'}`}
                title="תצוגת אדיטוריאל"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-zinc-400 font-hebrew text-base mb-4">
              לא נמצאו פרויקטים בסינון שנבחר.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedWorkType('all');
              }}
              className="text-xs font-mono text-amber-400 underline uppercase tracking-wider"
            >
              איפוס סינונים
            </button>
          </div>
        ) : viewMode === 'gallery' ? (
          <VideoGalleryGrid
            projects={filteredProjects}
            title="סרטים והפקות"
            subtitle="לחץ על כל סרט לצפייה מלאה עם סאונד"
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.map((project) => (
              <VideoPreviewCard key={project.id} project={project} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredProjects.map((project, idx) => (
              <VideoPreviewCard
                key={project.id}
                project={project}
                layout="editorial"
                reversed={idx % 2 === 1}
                projectIndex={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </StudioLayout>
  );
};
