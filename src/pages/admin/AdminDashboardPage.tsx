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
  Play
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { projects, createProject, deleteProject } = useProjects();
  const navigate = useNavigate();

  // Simple 2-field state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    // Direct URL
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

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`האם למחוק את הסרטון "${title}"?`)) {
      await deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-24 film-grain">
      {/* Top Header */}
      <header className="bg-[#121216] border-b border-white/10 px-6 md:px-12 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-syne font-bold text-white text-lg uppercase tracking-wider">
              AmitAI · העלאת סרטונים
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              ({user?.email})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-white/10 transition-colors"
            >
              <span>לאתר</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/admin');
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 bg-red-500/10 px-3.5 py-2 rounded-lg border border-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>יציאה</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 pt-10 space-y-10">
        {/* ULTRA SIMPLE UPLOAD BOX */}
        <div className="bg-[#121216] border-2 border-amber-500/40 rounded-2xl p-6 md:p-8 shadow-2xl text-right relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-syne text-xl font-bold uppercase text-white">
                העלאת סרטון חדש לאתר
              </h2>
              <p className="text-xs text-zinc-400 font-hebrew">
                רק כותבים שם, מדביקים קישור (Vimeo / YouTube) — והסרטון באוויר מיד.
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
                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 2. Video Link */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">
                2. קישור לסרטון (Vimeo / YouTube / קישור ישיר) *
              </label>
              <input
                type="text"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="הדבק כאן את הקישור מ-Vimeo או YouTube (למשל: https://vimeo.com/1222907638)"
                className="w-full bg-[#09090b] border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* 3. Big Upload Button */}
            <button
              type="submit"
              disabled={loading || !videoTitle.trim() || !videoUrl.trim()}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-base transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              <Upload className="w-5 h-5" />
              <span>{loading ? 'מעלה לאתר...' : 'העלה סרטון לאתר עכשיו'}</span>
            </button>
          </form>
        </div>

        {/* LIST OF CURRENT VIDEOS */}
        <div className="space-y-4 text-right">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-zinc-500">
              סה"כ {projects.length} סרטונים
            </span>
            <h3 className="font-syne text-lg font-bold uppercase text-white">
              הסרטונים שמוצגים באתר
            </h3>
          </div>

          <div className="space-y-3">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="bg-[#121216] border border-white/10 rounded-xl p-4 md:p-5 flex items-center justify-between gap-4 hover:border-white/20 transition-all"
              >
                {/* Delete / View Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors"
                    title="מחק סרטון"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/work/${project.slug}`}
                    target="_blank"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    title="צפה באתר"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>

                {/* Video Info */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <h4 className="font-syne font-bold text-white text-base">
                      {project.title}
                    </h4>
                    <span className="text-xs font-mono text-amber-400/80">
                      {project.video.provider.toUpperCase()} · ID: {project.video.videoId || 'Direct'}
                    </span>
                  </div>

                  <div className="relative aspect-video w-20 sm:w-28 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                    <img
                      src={project.video.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-current opacity-80" />
                    </div>
                  </div>

                  <span className="font-mono text-xs text-zinc-600">
                    #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
