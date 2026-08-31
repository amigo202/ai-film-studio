import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
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
  Layers
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const {
    projects,
    deleteProject,
    toggleFeatured,
    inquiries,
    resetToDefaultProjects
  } = useProjects();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries'>('projects');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

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
                STUDIO CMS
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
              <span>פרויקטים ({projects.length})</span>
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
              <span>פניות לידים ({inquiries.length})</span>
            </button>
          </div>

          {/* New Project & Reset Actions */}
          <div className="flex items-center gap-3">
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

            <Link
              to="/admin/builder/new"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-syne font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ NEW PROJECT (הוספת סרט)</span>
            </Link>
          </div>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div>
            {/* Status Filter */}
            <div className="flex items-center gap-2 mb-6 text-xs font-mono">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                כל הסטטוסים ({projects.length})
              </button>
              <button
                onClick={() => setFilterStatus('published')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'published' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                פורסמו ({projects.filter((p) => p.status === 'published').length})
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterStatus === 'draft' ? 'bg-zinc-800 text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                טיוטות ({projects.filter((p) => p.status === 'draft').length})
              </button>
            </div>

            {/* Projects Table / Card List */}
            <div className="space-y-4">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="p-5 md:p-6 rounded-2xl bg-[#121216] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  {/* Left: Thumbnail & Meta */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-28 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <img
                        src={project.video.posterUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-mono text-zinc-300">
                        {project.video.duration || '00:00'}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs text-amber-400">
                          #{idx + 1}
                        </span>
                        {project.workType === 'client_work' ? (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            Client Work
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                            Concept / Original
                          </span>
                        )}
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                          {project.video.provider.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-syne text-lg font-bold text-white uppercase group-hover:text-amber-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-mono">
                        Client: {project.client} · Year: {project.year} · Slug: <code className="text-zinc-300">/work/{project.slug}</code>
                      </p>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    {/* Featured Toggle */}
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={`p-2.5 rounded-lg border transition-colors ${
                        project.featured
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                          : 'bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                      title={project.featured ? 'מוצג בדף הבית' : 'סמן לתצוגה בדף הבית'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    {/* View Live */}
                    <Link
                      to={`/work/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      title="צפייה בעמוד ה-Case Study"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Edit Project in Builder */}
                    <Link
                      to={`/admin/builder/${project.id}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>עריכה ב-Builder</span>
                    </Link>

                    {/* Delete Project */}
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                      title="מחק פרויקט"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div>
            <h3 className="font-syne text-xl font-bold uppercase text-white mb-6">
              פניות ובריפים מלקוחות באתר
            </h3>

            {inquiries.length === 0 ? (
              <div className="p-16 text-center bg-[#121216] border border-white/10 rounded-2xl">
                <Inbox className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h4 className="font-syne text-lg font-bold uppercase text-white mb-1">
                  אין פניות חדשות כרגע
                </h4>
                <p className="text-xs text-zinc-400 font-hebrew">
                  פניות שיישלחו דרך טופס יצירת הקשר באתר יופיעו כאן בזמן אמת.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-6 rounded-2xl bg-[#121216] border border-white/10 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                      <div>
                        <h4 className="font-syne text-base font-bold text-white">
                          {inq.name} {inq.company ? `(${inq.company})` : ''}
                        </h4>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">
                          {inq.email} · {inq.phone || 'אין טלפון'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {inq.projectType}
                        </span>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">
                          {inq.budgetRange}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">
                          {new Date(inq.createdAt).toLocaleDateString('he-IL')}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">בריף הפרויקט:</span>
                      <p className="text-sm text-zinc-300 font-hebrew leading-relaxed bg-[#09090b] p-4 rounded-lg border border-white/5">
                        {inq.brief}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
