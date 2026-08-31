import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import type { Project, ProjectCategory, VideoProvider, BehindTheFilmStep, GalleryItem } from '../../types/project';
import {
  ArrowRight,
  ArrowLeft,
  Save,
  Eye,
  CheckCircle2,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { CinemaPlayer } from '../../components/video/CinemaPlayer';

const BUILDER_STEPS = [
  { id: '01', title: '01 — Basics', label: 'פרטי בסיס' },
  { id: '02', title: '02 — Film & Media', label: 'נגן ומדיה' },
  { id: '03', title: '03 — Story', label: 'קונספט ואתגר' },
  { id: '04', title: '04 — Process', label: '8 שלבי ההפקה' },
  { id: '05', title: '05 — Frames & Gallery', label: 'פריימים וגלריה' },
  { id: '06', title: '06 — Data & Credits', label: 'נתונים וקרדיטים' },
  { id: '07', title: '07 — Publish & SEO', label: 'פרסום ו-SEO' },
];

const DEFAULT_PROCESS_STEPS: BehindTheFilmStep[] = [
  { id: 'step-1', stepNumber: '01', title: 'Concept & Storyboard', subtitle: 'פיצוח השפה והנרטיב', description: '', active: true },
  { id: 'step-2', stepNumber: '02', title: 'Visual Development', subtitle: 'עיצוב השפה החזותית', description: '', active: true },
  { id: 'step-3', stepNumber: '03', title: 'Characters / Locations', subtitle: 'נעילת דמויות ולוקיישנים', description: '', active: true },
  { id: 'step-4', stepNumber: '04', title: 'AI Generated Frames', subtitle: 'יצירת פריימים בסיסיים', description: '', active: true },
  { id: 'step-5', stepNumber: '05', title: 'Motion & Generation', subtitle: 'הזרקת תנועה מבוקרת', description: '', active: true },
  { id: 'step-6', stepNumber: '06', title: 'Editing & Pace', subtitle: 'עריכה וזרימה רגשית', description: '', active: true },
  { id: 'step-7', stepNumber: '07', title: 'Sound & Score', subtitle: 'עיצוב סאונד ומיקס', description: '', active: true },
  { id: 'step-8', stepNumber: '08', title: 'Final Master', subtitle: 'Color Grading & 4K', description: '', active: true },
];

export const ProjectBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id && id !== 'new');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { projects, createProject, updateProject, saveDraft, getDraft } = useProjects();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    subtitle: '',
    client: '',
    year: '2026',
    category: 'Commercial',
    workType: 'client_work',
    status: 'published',
    featured: false,
    homepageOrder: 99,
    projectType: 'AI Commercial Film',
    role: 'Concept / Creative Direction / AI Film / Sound',
    video: {
      provider: 'vimeo',
      videoId: '',
      masterUrl: '',
      previewUrl: '',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85',
      aspectRatio: '2.39:1',
      duration: '00:45'
    },
    challenge: '',
    idea: '',
    conceptArtUrl: '',
    shortDescription: '',
    fullDescription: '',
    processSteps: DEFAULT_PROCESS_STEPS,
    productionStats: {
      shotsCount: 16,
      locationsCount: 3,
      charactersCount: 2,
      filmingDays: 0,
      finalDuration: '45 sec',
      renderTime: '60 hours'
    },
    credits: {
      creativeDirection: 'Studio Director',
      director: 'Studio Director',
      aiFilm: 'AI Creative Team',
      editing: 'Studio Post',
      soundDesign: 'Cinematic Soundscapes',
      music: 'Original Score',
      client: '',
      agency: ''
    },
    techStack: ['Midjourney v6.1', 'Runway Gen-3', 'Kling AI', 'DaVinci Resolve Studio'],
    gallery: [
      {
        id: 'g-1',
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
        caption: 'פריים מרכזי מתוך הסרט',
        aspectRatio: '2.39:1'
      }
    ],
    seoTitle: '',
    seoDescription: '',
    ogImageUrl: ''
  });

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    if (isEditing && id) {
      const existing = projects.find((p) => p.id === id);
      if (existing) {
        setFormData(existing);
      }
    } else {
      // Check local draft autosave
      const draft = getDraft();
      if (draft && !isEditing) {
        setFormData((prev) => ({ ...prev, ...draft }));
      }
    }
  }, [id, isEditing, isAuthenticated, projects]);

  // Autosave draft on every change
  useEffect(() => {
    if (!isEditing) {
      saveDraft(formData);
    }
  }, [formData, isEditing]);

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : generateSlugFromTitle(val)
    }));
  };

  const handleSave = async (publishStatus?: 'published' | 'draft') => {
    const finalData = {
      ...formData,
      status: publishStatus || formData.status || 'published',
      slug: formData.slug || generateSlugFromTitle(formData.title || 'untitled-film'),
      title: formData.title || 'ללא כותרת',
      client: formData.client || 'Studio Client',
      year: formData.year || '2026',
      category: formData.category || 'Commercial',
      workType: formData.workType || 'client_work',
      featured: formData.featured || false,
      homepageOrder: formData.homepageOrder || 99,
      projectType: formData.projectType || 'AI Film',
      role: formData.role || 'Concept / Direction',
      challenge: formData.challenge || '',
      idea: formData.idea || '',
      shortDescription: formData.shortDescription || '',
      video: formData.video || {
        provider: 'vimeo',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85',
        aspectRatio: '2.39:1'
      },
      processSteps: formData.processSteps || [],
      productionStats: formData.productionStats || {},
      credits: formData.credits || {},
      techStack: formData.techStack || [],
      gallery: formData.gallery || []
    } as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

    if (isEditing && id) {
      await updateProject(id, finalData);
    } else {
      await createProject(finalData);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-32 film-grain">
      {/* Top Builder Navigation */}
      <header className="sticky top-0 z-40 bg-[#121216]/95 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="חזרה ללוח הניהול"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div>
              <span className="font-syne font-bold text-white uppercase text-sm block">
                {isEditing ? `עריכת פרויקט: ${formData.title}` : 'PROJECT BUILDER (הפקת סרט חדש)'}
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                שלב {currentStepIndex + 1} מתוך {BUILDER_STEPS.length} · {BUILDER_STEPS[currentStepIndex].label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>תצוגה מקדימה</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave(formData.status)}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? 'שמור שינויים' : 'פרסם סרט'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Step Tracker Tabs Bar */}
      <div className="bg-[#0e0e11] border-b border-white/5 px-6 md:px-12 py-3 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {BUILDER_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : isCompleted
                    ? 'text-zinc-300 bg-white/[0.02] border border-white/5 hover:border-white/15'
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {saveSuccess && (
        <div className="max-w-3xl mx-auto my-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-hebrew text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>הפרויקט נשמר בהצלחה במסד הנתונים! מעביר ללוח הניהול...</span>
        </div>
      )}

      {/* Main Builder Step Workspace */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        {/* STEP 01: BASICS */}
        {currentStepIndex === 0 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                STEP 01
              </span>
              <h2 className="font-syne text-2xl font-bold uppercase text-white">
                פרטי בסיס וסיווג הפקה
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                הגדר את שם הפרויקט, הלקוח, השנה וסיווג העבודה (Client Work מול Concept Film).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  שם הסרט / הפרויקט (Project Title) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="לדוגמה: CBC — Ramadan Campaign"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Slug (מזהה URL) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="cbc-ramadan"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                כותרת משנה / Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="A Cinematic Journey Across Desert & Heritage"
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  לקוח (Client) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="CBC / Heritage / Studio IP"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  שנה (Year)
                </label>
                <input
                  type="text"
                  value={formData.year || '2026'}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2026"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  קטגוריה ראשית (Category)
                </label>
                <select
                  value={formData.category || 'Commercial'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Commercial">Commercial (פרסומות)</option>
                  <option value="Storytelling">Storytelling (סרטים עלילתיים)</option>
                  <option value="Product">Product (מוצרים ויוקרה)</option>
                  <option value="Social">Social (סושיאל)</option>
                  <option value="Education">Education (חינוכי)</option>
                  <option value="Experimental">Experimental (ניסיוני)</option>
                  <option value="Digital Humans">Digital Humans (דמויות דיגיטליות)</option>
                </select>
              </div>
            </div>

            {/* Work Nature Distinction (Client Work vs Concept Film) */}
            <div className="p-6 rounded-xl bg-[#09090b] border border-white/5">
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
                אופי הפרויקט (Work Nature Classification)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, workType: 'client_work' })}
                  className={`p-4 rounded-xl border text-right transition-all ${
                    formData.workType === 'client_work'
                      ? 'bg-amber-500/10 border-amber-500/50 text-white'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="font-syne font-bold block text-sm mb-1">CLIENT WORK</span>
                  <span className="text-xs text-zinc-400 font-hebrew">הפקה מסחרית רשמית עבור לקוח / מותג</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, workType: 'concept_work' })}
                  className={`p-4 rounded-xl border text-right transition-all ${
                    formData.workType === 'concept_work'
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-white'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="font-syne font-bold block text-sm mb-1">CONCEPT / ORIGINAL</span>
                  <span className="text-xs text-zinc-400 font-hebrew">סרט קונספט, Spec Ad או מחקר R&D של הסטודיו</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, workType: 'experimental' })}
                  className={`p-4 rounded-xl border text-right transition-all ${
                    formData.workType === 'experimental'
                      ? 'bg-teal-500/10 border-teal-500/50 text-white'
                      : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="font-syne font-bold block text-sm mb-1">EXPERIMENTAL</span>
                  <span className="text-xs text-zinc-400 font-hebrew">פרויקט ניסיוני לבדיקת טכנולוגיה חדשה</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 02: FILM & 3-TIER MEDIA */}
        {currentStepIndex === 1 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                STEP 02
              </span>
              <h2 className="font-syne text-2xl font-bold uppercase text-white">
                ארכיטקטורת וידאו ומדיה (3-Tier Media)
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                הגדרת ספק הווידאו (Vimeo/YouTube/Bunny), קישור ל-Master, לופ Preview קל, ופוסטר סטטי מהיר.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  ספק וידאו (Video Provider) *
                </label>
                <select
                  value={formData.video?.provider || 'vimeo'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video: { ...(formData.video as any), provider: e.target.value as VideoProvider }
                    })
                  }
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="vimeo">Vimeo (מומלץ לפורטפוליו מקצועי)</option>
                  <option value="youtube">YouTube (Unlisted / Public)</option>
                  <option value="bunny">Bunny Stream</option>
                  <option value="direct">Direct MP4 / CDN URL</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Video ID / Embed ID
                </label>
                <input
                  type="text"
                  value={formData.video?.videoId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video: { ...(formData.video as any), videoId: e.target.value }
                    })
                  }
                  placeholder="e.g. 76979871 או dQw4w9WgXcQ"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                קישור ישיר לסרט המלא (Master Film URL)
              </label>
              <input
                type="text"
                value={formData.video?.masterUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    video: { ...(formData.video as any), masterUrl: e.target.value }
                  })
                }
                placeholder="https://player.vimeo.com/video/76979871"
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                סרטון Preview קל (5-8s Loop Muted)
              </label>
              <input
                type="text"
                value={formData.video?.previewUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    video: { ...(formData.video as any), previewUrl: e.target.value }
                  })
                }
                placeholder="https://cdn.studio.ai/previews/cbc-ramadan-preview.mp4"
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  תמונת פוסטר סטטית (Poster URL) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.video?.posterUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video: { ...(formData.video as any), posterUrl: e.target.value }
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  אורך הסרט (Duration)
                </label>
                <input
                  type="text"
                  value={formData.video?.duration || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video: { ...(formData.video as any), duration: e.target.value }
                    })
                  }
                  placeholder="00:40"
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 03: STORY & CHALLENGE */}
        {currentStepIndex === 2 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                STEP 03
              </span>
              <h2 className="font-syne text-2xl font-bold uppercase text-white">
                האתגר, הרעיון והקונספט
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                פסקה המסבירה מה הלקוח היה צריך, מה היה הרעיון היצירתי, ותמונת Concept Art מרכזית.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                האתגר (The Challenge) *
              </label>
              <textarea
                rows={3}
                required
                value={formData.challenge || ''}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="מה הלקוח היה צריך? למשל: יצירת סרט פרסומי המשלב את עולם הקמעונאות, רמדאן ורכבת ממותגת ללא צילום פיזי..."
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                הרעיון (The Idea) — 3-5 שורות *
              </label>
              <textarea
                rows={3}
                required
                value={formData.idea || ''}
                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                placeholder="הרעיון המרכזי והשפה הקולנועית..."
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                תמונת Concept Art מרכזית (Concept Art URL)
              </label>
              <input
                type="text"
                value={formData.conceptArtUrl || ''}
                onChange={(e) => setFormData({ ...formData, conceptArtUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                תיאור קצר לכרטיס (Short Description) *
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription || ''}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="תקציר של שתי שורות המוצג בדף הבית ובעמוד העבודות..."
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* STEP 04: 8-STAGE PROCESS */}
        {currentStepIndex === 3 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                STEP 04
              </span>
              <h2 className="font-syne text-2xl font-bold uppercase text-white">
                8 שלבי ההפקה (Behind the Film)
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                בחר אילו שלבים להציג בפרויקט זה והזן את תוכן השלב וקובץ המדיה שלו.
              </p>
            </div>

            <div className="space-y-4">
              {(formData.processSteps || DEFAULT_PROCESS_STEPS).map((step, idx) => (
                <div
                  key={step.id || idx}
                  className={`p-6 rounded-xl border transition-all ${
                    step.active ? 'bg-[#09090b] border-white/10' : 'bg-white/[0.02] border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-amber-400 font-bold text-sm">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-syne font-bold text-white text-base">
                        {step.title}
                      </h4>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                      <input
                        type="checkbox"
                        checked={step.active}
                        onChange={(e) => {
                          const updated = [...(formData.processSteps || DEFAULT_PROCESS_STEPS)];
                          updated[idx] = { ...updated[idx], active: e.target.checked };
                          setFormData({ ...formData, processSteps: updated });
                        }}
                        className="rounded accent-amber-400"
                      />
                      <span>{step.active ? 'שלב פעיל' : 'הסתר שלב'}</span>
                    </label>
                  </div>

                  {step.active && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">תיאור השלב</label>
                        <textarea
                          rows={2}
                          value={step.description}
                          onChange={(e) => {
                            const updated = [...(formData.processSteps || DEFAULT_PROCESS_STEPS)];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            setFormData({ ...formData, processSteps: updated });
                          }}
                          placeholder="פירוט תהליך העבודה בשלב זה..."
                          className="w-full bg-[#121216] border border-white/10 rounded px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">קישור תמונה/וידאו (Media URL)</label>
                        <input
                          type="text"
                          value={step.mediaUrl || ''}
                          onChange={(e) => {
                            const updated = [...(formData.processSteps || DEFAULT_PROCESS_STEPS)];
                            updated[idx] = { ...updated[idx], mediaUrl: e.target.value };
                            setFormData({ ...formData, processSteps: updated });
                          }}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-[#121216] border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 05: FRAMES GALLERY */}
        {currentStepIndex === 4 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 text-right">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  STEP 05
                </span>
                <h2 className="font-syne text-2xl font-bold uppercase text-white">
                  גלריית פריימים (High-Res Frames)
                </h2>
                <p className="text-xs text-zinc-400 font-hebrew mt-1">
                  הוסף 4–8 פריימים נבחרים באיכות מקסימלית להצגה בגלריית הסרט.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newFrame: GalleryItem = {
                    id: `g-${Date.now()}`,
                    url: '',
                    caption: '',
                    aspectRatio: '2.39:1'
                  };
                  setFormData({
                    ...formData,
                    gallery: [...(formData.gallery || []), newFrame]
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 text-xs font-mono"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>הוספת פריים</span>
              </button>
            </div>

            <div className="space-y-4">
              {(formData.gallery || []).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-5 rounded-xl bg-[#09090b] border border-white/10 flex flex-col md:flex-row items-center gap-4"
                >
                  <span className="font-mono text-xs text-amber-400 flex-shrink-0">
                    FRAME 0{idx + 1}
                  </span>

                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const updated = [...(formData.gallery || [])];
                      updated[idx] = { ...updated[idx], url: e.target.value };
                      setFormData({ ...formData, gallery: updated });
                    }}
                    placeholder="Image URL (https://...)"
                    className="flex-1 bg-[#121216] border border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                  />

                  <input
                    type="text"
                    value={item.caption || ''}
                    onChange={(e) => {
                      const updated = [...(formData.gallery || [])];
                      updated[idx] = { ...updated[idx], caption: e.target.value };
                      setFormData({ ...formData, gallery: updated });
                    }}
                    placeholder="תיאור הפריים (Caption)"
                    className="flex-1 bg-[#121216] border border-white/10 rounded px-3 py-2 text-xs text-white font-hebrew"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated = (formData.gallery || []).filter((_, i) => i !== idx);
                      setFormData({ ...formData, gallery: updated });
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                    title="הסר פריים"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 06: PRODUCTION DATA & CREDITS */}
        {currentStepIndex === 5 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-8 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                STEP 06
              </span>
              <h2 className="font-syne text-2xl font-bold uppercase text-white">
                נתוני הפקה וקרדיטים (Production & Credits)
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                מדדים ויזואליים של ההפקה ופילמוגרפיה מלאה של היוצרים.
              </p>
            </div>

            {/* Production Stats Counters */}
            <div>
              <h4 className="font-syne text-sm font-bold uppercase text-amber-400 mb-4">
                נתוני הפקה (Production Metrics)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">AI Shots (שוטים)</label>
                  <input
                    type="number"
                    value={formData.productionStats?.shotsCount || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productionStats: {
                          ...formData.productionStats,
                          shotsCount: parseInt(e.target.value) || 0
                        }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Locations (לוקיישנים)</label>
                  <input
                    type="number"
                    value={formData.productionStats?.locationsCount || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productionStats: {
                          ...formData.productionStats,
                          locationsCount: parseInt(e.target.value) || 0
                        }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Characters (דמויות)</label>
                  <input
                    type="number"
                    value={formData.productionStats?.charactersCount || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productionStats: {
                          ...formData.productionStats,
                          charactersCount: parseInt(e.target.value) || 0
                        }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Filming Days (ימי צילום)</label>
                  <input
                    type="number"
                    value={formData.productionStats?.filmingDays || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productionStats: {
                          ...formData.productionStats,
                          filmingDays: parseInt(e.target.value) || 0
                        }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-sm text-amber-400 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Credits Roster */}
            <div className="pt-6 border-t border-white/5">
              <h4 className="font-syne text-sm font-bold uppercase text-amber-400 mb-4">
                קרדיטים (Filmography Credits)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Creative Direction</label>
                  <input
                    type="text"
                    value={formData.credits?.creativeDirection || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: { ...formData.credits, creativeDirection: e.target.value }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Director</label>
                  <input
                    type="text"
                    value={formData.credits?.director || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: { ...formData.credits, director: e.target.value }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">AI Film & Generation</label>
                  <input
                    type="text"
                    value={formData.credits?.aiFilm || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: { ...formData.credits, aiFilm: e.target.value }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Editing & Post</label>
                  <input
                    type="text"
                    value={formData.credits?.editing || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: { ...formData.credits, editing: e.target.value }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Sound Design</label>
                  <input
                    type="text"
                    value={formData.credits?.soundDesign || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: { ...formData.credits, soundDesign: e.target.value }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Agency</label>
                  <input
                    type="text"
                    value={formData.credits?.agency || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: { ...formData.credits, agency: e.target.value }
                      })
                    }
                    className="w-full bg-[#09090b] border border-white/10 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 07: PUBLISH & SEO */}
        {currentStepIndex === 6 && (
          <div className="bg-[#121216] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                STEP 07
              </span>
              <h2 className="font-syne text-2xl font-bold uppercase text-white">
                הגדרות שיתוף, SEO ופרסום
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew mt-1">
                הגדרות OpenGraph לתצוגה מקדימה עשירה ב-WhatsApp, LinkedIn וגוגל, סימון Featured וסטטוס.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  SEO Title (כותרת לשיתוף)
                </label>
                <input
                  type="text"
                  value={formData.seoTitle || ''}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder={`${formData.title || 'Title'} | Case Study`}
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  סדר תצוגה בדף הבית (Order)
                </label>
                <input
                  type="number"
                  value={formData.homepageOrder || 1}
                  onChange={(e) => setFormData({ ...formData, homepageOrder: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                SEO Description (תיאור לשיתוף ב-WhatsApp ו-Google)
              </label>
              <textarea
                rows={3}
                value={formData.seoDescription || ''}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Case Study מלא של הסרט שנוצר ב-AI..."
                className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-3 text-sm text-white"
              />
            </div>

            <div className="p-6 rounded-xl bg-[#09090b] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded accent-amber-400"
                />
                <div>
                  <span className="font-syne font-bold text-white text-sm block">
                    הצג כפרויקט נבחר בדף הבית (Featured)
                  </span>
                  <span className="text-xs text-zinc-400 font-hebrew">
                    הפרויקט יופיע באזור Selected Work בדף הבית
                  </span>
                </div>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSave('draft')}
                  className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono uppercase"
                >
                  שמור כטיוטה (Draft)
                </button>

                <button
                  type="button"
                  onClick={() => handleSave('published')}
                  className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase text-xs shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  פרסם סרט לאתר (Publish Live)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono uppercase tracking-wider disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowRight className="w-4 h-4" />
            <span>שלב קודם</span>
          </button>

          <span className="text-xs font-mono text-zinc-500">
            שלב {currentStepIndex + 1} מתוך {BUILDER_STEPS.length}
          </span>

          {currentStepIndex < BUILDER_STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStepIndex((prev) => Math.min(BUILDER_STEPS.length - 1, prev + 1))}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-xs transition-all"
            >
              <span>לשלב הבא</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSave('published')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-syne font-bold uppercase tracking-wider text-xs transition-all"
            >
              <span>סיום ופרסום</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="font-mono text-xs text-amber-400">
              LIVE PREVIEW DRAFT · {formData.title || 'Untitled'}
            </span>
            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto py-8 w-full">
            {formData.video && (
              <CinemaPlayer
                video={formData.video as any}
                title={formData.title || 'Untitled'}
                className="mb-8"
              />
            )}
            <h1 className="text-3xl font-syne font-bold uppercase text-white mb-2">
              {formData.title || 'ללא כותרת'}
            </h1>
            <p className="text-zinc-400 font-hebrew mb-6">{formData.subtitle}</p>
            <div className="p-6 bg-[#121216] rounded-xl border border-white/10 space-y-3 text-right">
              <h4 className="font-syne text-xs uppercase text-amber-400">The Challenge</h4>
              <p className="text-xs text-zinc-300 font-hebrew">{formData.challenge || 'טרם הוזן אתגר'}</p>
              <h4 className="font-syne text-xs uppercase text-amber-400 pt-2">The Idea</h4>
              <p className="text-xs text-zinc-300 font-hebrew">{formData.idea || 'טרם הוזן רעיון'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
