import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import type { Project } from '../../types/project';
import {
  Trash2,
  ExternalLink,
  Eye,
  LogOut,
  Upload,
  CheckCircle2,
  Play,
  Edit2,
  X,
  Save,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Share2,
  RefreshCw
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { projects, createProject, updateProject, deleteProject, reorderProjects, resetToDefaultProjects } = useProjects();
  const navigate = useNavigate();

  // Simple 2-field add state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Edit modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editPosterUrl, setEditPosterUrl] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  // Drag & drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const parseVideo = (input: string) => {
    const trimmed = input.trim();
    // Vimeo link or ID
    if (trimmed.includes('vimeo.com')) {
      const parts = trimmed.split('?')[0].split('/');
      const id = parts.pop() || parts.pop();
      return { provider: 'vimeo' as const, videoId: id, masterUrl: `https://player.vimeo.com/video/${id}` };
    }
    if (/^\d+$/.test(trimmed)) {
      return { provider: 'vimeo' as const, videoId: trimmed, masterUrl: `https://player.vimeo.com/video/${trimmed}` };
    }
    // YouTube link
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      let id = '';
      if (trimmed.includes('v=')) {
        id = trimmed.split('v=')[1]?.split('&')[0];
      } else if (trimmed.includes('youtu.be/')) {
        id = trimmed.split('youtu.be/')[1]?.split('?')[0];
      }
      return { provider: 'youtube' as const, videoId: id, masterUrl: `https://www.youtube.com/embed/${id}` };
    }
    // Direct URL (MP4 / WebM / Cloud / Facebook / Instagram / etc.)
    return { provider: 'direct' as const, videoId: '', masterUrl: trimmed };
  };

  const handleSimpleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;

    setLoading(true);
    setSuccessMessage('');

    try {
      const parsed = parseVideo(videoUrl);
      const generatedSlug = videoTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || `film-${Date.now()}`;

      // Cinema default poster
      const poster = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=85';

      const newProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
        title: videoTitle.trim(),
        slug: generatedSlug,
        subtitle: 'AI Film Production',
        client: 'AmitAI Studio',
        year: '2026',
        category: 'Commercial',
        workType: 'client_work',
        status: 'published',
        featured: true,
        homepageOrder: 1,
        projectType: 'AI Film',
        role: 'בימוי והפקה',
        video: {
          provider: parsed.provider,
          videoId: parsed.videoId,
          masterUrl: parsed.masterUrl,
          posterUrl: poster,
          aspectRatio: '16:9'
        },
        challenge: '',
        idea: '',
        shortDescription: videoTitle.trim(),
        processSteps: [],
        productionStats: {},
        credits: {
          director: 'אמיתי כהן'
        },
        techStack: ['AI Film'],
        gallery: []
      };

      await createProject(newProject);
      setSuccessMessage(`הסרטון "${videoTitle}" הועלה בהצלחה לאתר!`);
      setVideoTitle('');
      setVideoUrl('');

      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setEditTitle(project.title);
    setEditVideoUrl(
      project.video.provider === 'vimeo' && project.video.videoId
        ? `https://vimeo.com/${project.video.videoId}`
        : project.video.masterUrl || project.video.previewUrl || ''
    );
    setEditPosterUrl(project.video.posterUrl || '');
    setEditDuration(project.video.duration || '');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editTitle.trim()) return;

    setEditSaving(true);
    try {
      const parsed = parseVideo(editVideoUrl);
      const updatedVideo = {
        ...editingProject.video,
        provider: parsed.provider,
        videoId: parsed.videoId,
        masterUrl: parsed.masterUrl,
        posterUrl: editPosterUrl.trim() || editingProject.video.posterUrl,
        duration: editDuration.trim() || editingProject.video.duration
      };

      await updateProject(editingProject.id, {
        title: editTitle.trim(),
        shortDescription: editTitle.trim(),
        video: updatedVideo
      });

      setSuccessMessage(`הסרטון "${editTitle}" עודכן בהצלחה!`);
      setEditingProject(null);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Failed to update project:', err);
    } finally {
      setEditSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`האם למחוק את הסרטון "${title}"?`)) {
      await deleteProject(id);
    }
  };

  // Reordering Logic
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    const [movedItem] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, movedItem);

    const ids = reordered.map((p) => p.id);
    await reorderProjects(ids);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const reordered = [...projects];
    const [movedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(dropIndex, 0, movedItem);

    setDraggedIndex(null);
    const ids = reordered.map((p) => p.id);
    await reorderProjects(ids);
  };

  const copyClientReviewLink = (slug: string, title: string) => {
    const reviewUrl = `${window.location.origin}/review/${slug}`;
    navigator.clipboard.writeText(reviewUrl);
    setSuccessMessage(`🔗 קישור צפייה פרטי ללקוח הועתק ללוח: "${title}"`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-24 film-grain">
      {/* Top Header */}
      <header className="bg-[#121216] border-b border-white/10 px-4 sm:px-6 md:px-12 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-syne font-bold text-white text-sm sm:text-lg uppercase tracking-wider">
              AmitAI · ניהול
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden md:inline">
              ({user?.email})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('האם לרענן ולסנכרן את כל הסרטונים והשמות המקוריים?')) {
                  resetToDefaultProjects();
                  setSuccessMessage('כל הסרטונים סונכרנו בהצלחה!');
                  setTimeout(() => setSuccessMessage(''), 3000);
                }
              }}
              className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 sm:px-3.5 py-2 rounded-lg border border-amber-500/30 transition-colors"
              title="סנכרן מחדש את כל הסרטונים"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">סנכרון</span>
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 sm:px-3.5 py-2 rounded-lg border border-white/10 transition-colors"
            >
              <span>לאתר</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/admin');
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 bg-red-500/10 px-2.5 sm:px-3.5 py-2 rounded-lg border border-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>יציאה</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-8 sm:space-y-10">
        {/* ULTRA SIMPLE UPLOAD BOX */}
        <div className="bg-[#121216] border-2 border-amber-500/40 rounded-2xl p-5 sm:p-8 shadow-2xl text-right relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-syne text-lg sm:text-xl font-bold uppercase text-white">
                העלאת סרטון חדש לאתר
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew">
                רק כותבים שם, מדביקים קישור (Vimeo / YouTube / Instagram / Facebook / MP4) — והסרטון באוויר מיד.
              </p>
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-hebrew flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSimpleUpload} className="space-y-5">
            {/* 1. Video Title */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">
                1. שם הסרטון *
              </label>
              <input
                type="text"
                required
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="למשל: אגף הסייבר של משרד המשפטים"
                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 2. Video Link */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">
                2. קישור לסרטון (VIMEO / YOUTUBE / INSTAGRAM / FACEBOOK / MP4) *
              </label>
              <input
                type="text"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="הדבק כאן את הקישור מכל פלטפורמה (למשל: https://vimeo.com/... או /videos/...)"
                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 3. Big Upload Button */}
            <button
              type="submit"
              disabled={loading || !videoTitle.trim() || !videoUrl.trim()}
              className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-sm sm:text-base transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              <Upload className="w-5 h-5" />
              <span>{loading ? 'מעלה לאתר...' : 'העלה סרטון לאתר עכשיו'}</span>
            </button>
          </form>
        </div>

        {/* LIST OF CURRENT VIDEOS WITH DRAG & DROP AND REORDER */}
        <div className="space-y-4 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <h3 className="font-syne text-base sm:text-lg font-bold uppercase text-white">
              הסרטונים המוצגים באתר ({projects.length})
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">
              💡 טיפ: ניתן להשתמש בחצים ⬆️/⬇️ או לגרור סרטונים לשינוי הסדר
            </span>
          </div>

          <div className="space-y-3">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                className={`bg-[#121216] border border-white/10 rounded-xl p-4 md:p-5 flex items-center justify-between gap-4 hover:border-amber-500/40 transition-all ${
                  draggedIndex === idx ? 'opacity-50 border-amber-400' : ''
                }`}
              >
                {/* Actions: Reorder, Client Link, Edit, View, Delete */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Reorder Arrows */}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                      title="הזז למעלה"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === projects.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                      title="הזז למטה"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Copy Client Review Room Link */}
                  <button
                    type="button"
                    onClick={() => copyClientReviewLink(project.slug, project.title)}
                    className="p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 transition-colors"
                    title="העתק קישור חדר הקרנה ללקוח"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => openEditModal(project)}
                    className="p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-colors"
                    title="ערוך סרטון"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* View on Site */}
                  <Link
                    to={`/work/${project.slug}`}
                    target="_blank"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    title="צפה באתר"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors"
                    title="מחק סרטון לצמיתות"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Video Info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-right">
                    <h4 className="font-syne font-bold text-white text-sm sm:text-base">
                      {project.title}
                    </h4>
                    <span className="text-xs font-mono text-amber-400/80">
                      {project.video.provider.toUpperCase()} · #{idx + 1}
                    </span>
                  </div>

                  <div className="relative aspect-video w-16 sm:w-24 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                    <img
                      src={project.video.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-current opacity-80" />
                    </div>
                  </div>

                  <div className="cursor-grab text-zinc-600 hover:text-zinc-300 hidden sm:block" title="גרור לשינוי סדר">
                    <GripVertical className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* EDIT VIDEO MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-[#121216] border-2 border-amber-500/40 rounded-2xl p-6 md:p-8 shadow-2xl relative text-right">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase text-white">
                    עריכת סרטון
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    שינוי שם, קישור וידאו או פוסטר
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono uppercase text-amber-300 font-bold mb-1.5">
                  שם הסרטון *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-mono uppercase text-amber-300 font-bold mb-1.5">
                  קישור לסרטון (Vimeo / YouTube / Instagram / Facebook / קישור ישיר) *
                </label>
                <input
                  type="text"
                  required
                  value={editVideoUrl}
                  onChange={(e) => setEditVideoUrl(e.target.value)}
                  placeholder="https://vimeo.com/... או /videos/..."
                  className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Poster URL */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  תמונת פוסטר (Image URL - אופציונלי)
                </label>
                <input
                  type="text"
                  value={editPosterUrl}
                  onChange={(e) => setEditPosterUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... או /thumbnails/..."
                  className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  אורך הסרטון (למשל 03:13 - אופציונלי)
                </label>
                <input
                  type="text"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  placeholder="03:13"
                  className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-mono uppercase"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  disabled={editSaving || !editTitle.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase text-xs transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editSaving ? 'שומר...' : 'שמור שינויים'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
