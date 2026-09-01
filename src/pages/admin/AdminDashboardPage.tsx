import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import type { Project, ProjectCategory } from '../../types/project';
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Star,
  Film,
  LogOut,
  Inbox,
  RefreshCw,
  Layers,
  Zap,
  X,
  Play
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const {
    projects,
    createProject,
    deleteProject,
    toggleFeatured,
    inquiries,
    resetToDefaultProjects
  } = useProjects();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Quick Video Add Modal State
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickVideoUrl, setQuickVideoUrl] = useState('');
  const [quickClient, setQuickClient] = useState('');
  const [quickDuration, setQuickDuration] = useState('');
  const [quickCategory, setQuickCategory] = useState<ProjectCategory>('Commercial');
  const [quickPosterUrl, setQuickPosterUrl] = useState('');
  const [quickSaving, setQuickSaving] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const filteredProjects = projects.filter((p) => {
    if (filterStatus === 'published') return p.status === 'published';
    if (filterStatus === 'draft') return p.status === 'draft';
    return true;
  });

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את הפרויקט "${title}"?`)) {
      await deleteProject(id);
    }
  };

  const parseVideoInput = (input: string) => {
    const trimmed = input.trim();
    // Check if Vimeo URL or Vimeo ID
    if (trimmed.includes('vimeo.com')) {
      const parts = trimmed.split('?')[0].split('/');
      const id = parts.pop() || parts.pop();
      return { provider: 'vimeo' as const, videoId: id, masterUrl: `https://player.vimeo.com/video/${id}` };
    }
    // Check if pure numbers (Vimeo ID)
    if (/^\d+$/.test(trimmed)) {
      return { provider: 'vimeo' as const, videoId: trimmed, masterUrl: `https://player.vimeo.com/video/${trimmed}` };
    }
    // Check if YouTube
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      let id = '';
      if (trimmed.includes('v=')) {
        id = trimmed.split('v=')[1]?.split('&')[0];
      } else if (trimmed.includes('youtu.be/')) {
        id = trimmed.split('youtu.be/')[1]?.split('?')[0];
      }
      return { provider: 'youtube' as const, videoId: id, masterUrl: `https://www.youtube.com/embed/${id}` };
    }
    // Default direct
    return { provider: 'direct' as const, videoId: '', masterUrl: trimmed };
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickVideoUrl.trim()) return;

    setQuickSaving(true);
    try {
      const parsed = parseVideoInput(quickVideoUrl);
      const generatedSlug = quickTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || `film-${Date.now()}`;

      const defaultPoster = quickPosterUrl.trim() || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85';

      const newProjectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
        title: quickTitle.trim(),
        slug: generatedSlug,
        subtitle: quickClient ? `הפקה עבור ${quickClient}` : 'AI Film Production',
        client: quickClient.trim() || 'Studio Production',
        year: '2026',
        category: quickCategory,
        workType: 'client_work',
        status: 'published',
        featured: true,
        homepageOrder: 1,
        projectType: 'AI Film Production',
        role: 'בימוי והפקת סרטי AI מלאה',
        video: {
          provider: parsed.provider,
          videoId: parsed.videoId,
          masterUrl: parsed.masterUrl,
          posterUrl: defaultPoster,
          duration: quickDuration.trim() || '01:00',
          aspectRatio: '16:9'
        },
        challenge: 'הפקה קולנועית מותאמת אישית.',
        idea: 'שילוב של בימוי קפדני, טכנולוגיות Generative Cinema וסאונד מותאם.',
        shortDescription: quickClient ? `סרט AI עבור ${quickClient}` : quickTitle,
        processSteps: [],
        productionStats: {
          shotsCount: 12,
          locationsCount: 2,
          charactersCount: 1,
          filmingDays: 0,
          finalDuration: quickDuration.trim() || '01:00'
        },
        credits: {
          creativeDirection: 'אמיתי כהן (AmitAI)',
          director: 'אמיתי כהן',
          aiFilm: 'AmitAI Studio',
          client: quickClient || ''
        },
        techStack: ['Midjourney v6.1', 'Runway Gen-3', 'Kling AI', 'DaVinci Resolve Studio'],
        gallery: []
      };

      await createProject(newProjectData);
      setQuickModalOpen(false);
      setQuickTitle('');
      setQuickVideoUrl('');
      setQuickClient('');
      setQuickDuration('');
      setQuickPosterUrl('');
    } catch (err) {
      console.error('Failed to quick add video:', err);
    } finally {
      setQuickSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-20 film-grain">
      {/* Top Admin Header */}
      <header className="bg-[#121216] border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="font-syne font-bold text-white uppercase text-base block">
                AmitAI · STUDIO CMS
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                DIRECTOR: {user?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors"
            >
              <span>צפייה באתר הציבורי</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/admin');
              }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>יציאה</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-[#121216] border border-white/10 rounded-xl">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'projects'
                  ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>כל הסרטים והגלריה ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>פניות ובריפים ({inquiries.length})</span>
            </button>
          </div>

          {/* Actions: Quick Video Add (Fast!) + Full Project Builder */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('האם לשחזר את פרויקטי הדגל המקוריים?')) {
                  resetToDefaultProjects();
                }
              }}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/10 transition-colors"
              title="איפוס לפרויקטי דגל מקוריים"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* FAST QUICK ADD BUTTON */}
            <button
              type="button"
              onClick={() => setQuickModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-syne font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>העלאה מהירה (כותרת + קישור)</span>
            </button>

            {/* Detailed 7-step builder */}
            <Link
              to="/admin/builder/new"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>הפקת Case Study מלא (7 שלבים)</span>
            </Link>
          </div>
        </div>

        {/* Tab 1: Projects & Video Gallery */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    filterStatus === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  הכל ({projects.length})
                </button>
                <button
                  onClick={() => setFilterStatus('published')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    filterStatus === 'published' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  באוויר / Published ({projects.filter((p) => p.status === 'published').length})
                </button>
              </div>

              <span className="text-xs font-mono text-zinc-500">
                סה"כ {filteredProjects.length} פרויקטים בגלריה
              </span>
            </div>

            {/* Video Items Cards List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#121216] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition-all"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="relative aspect-video w-32 md:w-40 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <img
                        src={project.video.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-current opacity-80" />
                      </div>
                      {project.video.duration && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-400">
                          {project.video.duration}
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                          {project.client}
                        </span>
                        <span className="text-zinc-600 text-xs">•</span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="font-syne font-bold text-white text-base md:text-lg">
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono mt-1">
                        {project.video.provider.toUpperCase()} · ID: {project.video.videoId || 'Direct'}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Toggles */}
                  <div className="flex items-center gap-3 self-end md:self-auto">
                    {/* Featured Toggle */}
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                        project.featured
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-white/5 text-zinc-500 hover:text-zinc-300 border border-white/5'
                      }`}
                      title={project.featured ? 'מוצג בדף הבית' : 'הצג בדף הבית'}
                    >
                      <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
                      <span>{project.featured ? 'מוצג ראשי' : 'רגיל'}</span>
                    </button>

                    {/* View Live */}
                    <Link
                      to={`/work/${project.slug}`}
                      target="_blank"
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      title="צפה באתר"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Edit Builder */}
                    <Link
                      to={`/admin/builder/${project.id}`}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-400 hover:text-amber-300 border border-white/10 transition-colors"
                      title="עריכה מלאה"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors"
                      title="מחיקת סרטון"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-[#121216]/50">
                <Inbox className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <h4 className="font-syne text-lg font-bold text-white uppercase">אין פניות חדשות</h4>
                <p className="text-xs text-zinc-500 font-hebrew mt-1">
                  פניות מטופס ה-Contact יופיעו כאן בזמן אמת.
                </p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-[#121216] border border-white/10 rounded-xl p-6 text-right space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-mono text-zinc-500">
                      {new Date(inq.createdAt).toLocaleDateString('he-IL')}
                    </span>
                    <span className="font-syne font-bold text-white text-base">
                      {inq.name} {inq.company ? `(${inq.company})` : ''}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 space-y-1 font-mono">
                    <p>אימייל: <span className="text-white">{inq.email}</span></p>
                    {inq.phone && <p>טלפון: <span className="text-white">{inq.phone}</span></p>}
                    <p>סוג פרויקט: <span className="text-amber-400">{inq.projectType}</span></p>
                  </div>
                  <div className="p-4 bg-[#09090b] rounded-lg text-sm text-zinc-300 font-hebrew">
                    {inq.brief}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* QUICK VIDEO ADD MODAL (30-SECOND UPLOAD) */}
      {quickModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121216] border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative text-right animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase text-white">
                    העלאה מהירה של סרטון
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    רק כותרת + קישור — והסרטון מופיע מיד באתר
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAdd} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                  שם / כותרת הסרטון *
                </label>
                <input
                  type="text"
                  required
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="לדוגמה: אגף הסייבר — משרד המשפטים"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                  קישור לסרטון (Vimeo / YouTube / MP4 / מזהה) *
                </label>
                <input
                  type="text"
                  required
                  value={quickVideoUrl}
                  onChange={(e) => setQuickVideoUrl(e.target.value)}
                  placeholder="https://vimeo.com/1222907638 או 1222907638"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <p className="text-[11px] text-zinc-500 mt-1 font-hebrew">
                  אפשר להדביק קישור מלא של Vimeo, YouTube, או מספר ID ישיר.
                </p>
              </div>

              {/* Client & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                    שם הלקוח / מותג (אופציונלי)
                  </label>
                  <input
                    type="text"
                    value={quickClient}
                    onChange={(e) => setQuickClient(e.target.value)}
                    placeholder="משרד המשפטים"
                    className="w-full bg-[#09090b] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                    אורך הסרט (אופציונלי)
                  </label>
                  <input
                    type="text"
                    value={quickDuration}
                    onChange={(e) => setQuickDuration(e.target.value)}
                    placeholder="03:13"
                    className="w-full bg-[#09090b] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                  קטגוריה
                </label>
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value as ProjectCategory)}
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Commercial">Commercial (פרסומות ומסחרי)</option>
                  <option value="Storytelling">Storytelling (סרטים עלילתיים)</option>
                  <option value="Product">Product (מוצרים ויוקרה)</option>
                  <option value="Social">Social (סושיאל)</option>
                  <option value="Education">Education (חינוכי והדרכה)</option>
                  <option value="Experimental">Experimental (ניסיוני / R&D)</option>
                </select>
              </div>

              {/* Poster Image URL */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                  קישור לתמונת פוסטר (אופציונלי)
                </label>
                <input
                  type="text"
                  value={quickPosterUrl}
                  onChange={(e) => setQuickPosterUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... (ריק = פוסטר אוטומטי)"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setQuickModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-mono uppercase"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  disabled={quickSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase text-xs transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{quickSaving ? 'שומר...' : 'הוסף מיד לגלריה'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
