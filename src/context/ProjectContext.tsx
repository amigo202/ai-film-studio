import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project, ContactInquiry } from '../types/project';
import { SHOWCASE_PROJECTS } from '../data/showcaseProjects';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  getProjectBySlug: (slug: string) => Project | undefined;
  getAdjacentProjects: (currentSlug: string) => { prev?: Project; next?: Project };
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Project>;
  updateProject: (id: string, project: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  reorderProjects: (orderedIds: string[]) => Promise<void>;
  
  // Autosave Draft in CMS Builder
  saveDraft: (draft: Partial<Project>) => void;
  getDraft: () => Partial<Project> | null;
  clearDraft: () => void;
  
  // Inquiries
  submitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  inquiries: ContactInquiry[];
  
  // Reset / Resync
  resetToDefaultProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const DRAFT_KEY = 'ai_film_studio_builder_draft';
const ACTIVE_STORAGE_KEY = 'ai_film_studio_persistent_projects_v3';
const DELETED_STORAGE_KEY = 'ai_film_studio_deleted_projects_v3';
const INQUIRIES_KEY = 'ai_film_studio_inquiries';

// Old mock template slugs and old storage keys to purge
const OLD_LEGACY_KEYS = [
  'ai_film_studio_projects_db',
  'ai_film_studio_projects_v2',
  'ai_film_studio_projects_v3',
  'ai_film_studio_projects_v4',
  'ai_film_studio_projects_v5',
  'ai_film_studio_projects_v6',
  'ai_film_studio_projects_v7',
  'ai_film_studio_persistent_projects_v1',
  'ai_film_studio_persistent_projects_v2'
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(SHOWCASE_PROJECTS);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load and merge Projects on startup
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('homepage_order', { ascending: true });
            
          if (!error && data && data.length > 0) {
            const formatted: Project[] = data.map((row: any) => ({
              id: row.id,
              slug: row.slug,
              title: row.title,
              subtitle: row.subtitle,
              client: row.client,
              year: row.year,
              category: row.category,
              workType: row.work_type,
              status: row.status,
              featured: row.featured,
              homepageOrder: row.homepage_order,
              video: row.video_data,
              projectType: row.project_type,
              role: row.role,
              challenge: row.challenge,
              idea: row.idea,
              conceptArtUrl: row.concept_art_url,
              shortDescription: row.short_description,
              fullDescription: row.full_description,
              processSteps: row.process_steps || [],
              frameBreakdown: row.frame_breakdown,
              productionStats: row.production_stats || {},
              credits: row.credits || {},
              techStack: row.tech_stack || [],
              gallery: row.gallery || [],
              seoTitle: row.seo_title,
              seoDescription: row.seo_description,
              ogImageUrl: row.og_image_url,
              createdAt: row.created_at,
              updatedAt: row.updated_at
            }));
            setProjects(formatted);
          } else {
            setProjects(SHOWCASE_PROJECTS);
          }
        } else {
          // 1. Purge old stale legacy keys that may pollute mobile devices
          OLD_LEGACY_KEYS.forEach((key) => {
            try {
              localStorage.removeItem(key);
            } catch (e) {}
          });

          // 2. Read deleted project IDs
          let deletedIds = new Set<string>();
          try {
            const rawDeleted = localStorage.getItem(DELETED_STORAGE_KEY);
            if (rawDeleted) {
              const parsed = JSON.parse(rawDeleted);
              if (Array.isArray(parsed)) {
                parsed.forEach((id: string) => deletedIds.add(id));
              }
            }
          } catch (e) {}

          // 3. Read active user edits from ACTIVE_STORAGE_KEY
          const activeSaved = localStorage.getItem(ACTIVE_STORAGE_KEY);
          let userSavedProjects: Project[] = [];
          if (activeSaved) {
            try {
              const parsed = JSON.parse(activeSaved);
              if (Array.isArray(parsed)) {
                userSavedProjects = parsed;
              }
            } catch (e) {}
          }

          if (userSavedProjects.length > 0) {
            // Apply deleted filter
            const filtered = userSavedProjects.filter(
              (p) => !deletedIds.has(p.id) && !deletedIds.has(p.slug)
            );
            setProjects(filtered);
          } else {
            // Fresh authoritative list from code
            const fresh = SHOWCASE_PROJECTS.filter(
              (p) => !deletedIds.has(p.id) && !deletedIds.has(p.slug)
            );
            setProjects(fresh);
            localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(fresh));
          }

          const localInquiries = localStorage.getItem(INQUIRIES_KEY);
          if (localInquiries) {
            setInquiries(JSON.parse(localInquiries));
          }
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(SHOWCASE_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const saveToPersistence = (updated: Project[]) => {
    setProjects(updated);
    if (!isSupabaseConfigured) {
      localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const getProjectBySlug = (slug: string) => {
    return projects.find((p) => p.slug === slug);
  };

  const getAdjacentProjects = (currentSlug: string) => {
    const published = projects.filter((p) => p.status === 'published');
    const index = published.findIndex((p) => p.slug === currentSlug);
    if (index === -1) return {};

    const prev = index > 0 ? published[index - 1] : published[published.length - 1];
    const next = index < published.length - 1 ? published[index + 1] : published[0];

    return { prev, next };
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('projects').insert({
        title: newProject.title,
        slug: newProject.slug,
        subtitle: newProject.subtitle,
        client: newProject.client,
        year: newProject.year,
        category: newProject.category,
        work_type: newProject.workType,
        status: newProject.status,
        featured: newProject.featured,
        homepage_order: newProject.homepageOrder,
        video_data: newProject.video,
        project_type: newProject.projectType,
        role: newProject.role,
        challenge: newProject.challenge,
        idea: newProject.idea,
        conceptArtUrl: newProject.conceptArtUrl,
        short_description: newProject.shortDescription,
        full_description: newProject.fullDescription,
        process_steps: newProject.processSteps,
        frame_breakdown: newProject.frameBreakdown,
        productionStats: newProject.productionStats,
        credits: newProject.credits,
        tech_stack: newProject.techStack,
        gallery: newProject.gallery,
        seo_title: newProject.seoTitle,
        seo_description: newProject.seoDescription,
        og_image_url: newProject.ogImageUrl
      }).select().single();

      if (!error && data) {
        newProject.id = data.id;
      }
    }

    const updated = [newProject, ...projects];
    saveToPersistence(updated);
    clearDraft();
    return newProject;
  };

  const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const existingIndex = projects.findIndex((p) => p.id === id);
    if (existingIndex === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    const updatedProject: Project = {
      ...projects[existingIndex],
      ...projectData,
      updatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      await supabase.from('projects').update({
        title: updatedProject.title,
        slug: updatedProject.slug,
        subtitle: updatedProject.subtitle,
        client: updatedProject.client,
        year: updatedProject.year,
        category: updatedProject.category,
        work_type: updatedProject.workType,
        status: updatedProject.status,
        featured: updatedProject.featured,
        homepage_order: updatedProject.homepageOrder,
        video_data: updatedProject.video,
        project_type: updatedProject.projectType,
        role: updatedProject.role,
        challenge: updatedProject.challenge,
        idea: updatedProject.idea,
        conceptArtUrl: updatedProject.conceptArtUrl,
        short_description: updatedProject.shortDescription,
        full_description: updatedProject.fullDescription,
        process_steps: updatedProject.processSteps,
        frame_breakdown: updatedProject.frameBreakdown,
        productionStats: updatedProject.productionStats,
        credits: updatedProject.credits,
        tech_stack: updatedProject.techStack,
        gallery: updatedProject.gallery,
        seo_title: updatedProject.seoTitle,
        seo_description: updatedProject.seoDescription,
        og_image_url: updatedProject.ogImageUrl
      }).eq('id', id);
    }

    const updated = [...projects];
    updated[existingIndex] = updatedProject;
    saveToPersistence(updated);
    return updatedProject;
  };

  const deleteProject = async (id: string): Promise<void> => {
    const projectToDelete = projects.find((p) => p.id === id);
    
    // Add to deleted IDs in localStorage
    try {
      let deletedIds: string[] = [];
      const raw = localStorage.getItem(DELETED_STORAGE_KEY);
      if (raw) {
        deletedIds = JSON.parse(raw);
      }
      deletedIds.push(id);
      if (projectToDelete?.slug) deletedIds.push(projectToDelete.slug);
      if (projectToDelete?.video?.masterUrl) deletedIds.push(projectToDelete.video.masterUrl);
      localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedIds));
    } catch (e) {}

    if (isSupabaseConfigured) {
      await supabase.from('projects').delete().eq('id', id);
    }

    const updated = projects.filter((p) => p.id !== id);
    saveToPersistence(updated);
  };

  const toggleFeatured = async (id: string): Promise<void> => {
    const p = projects.find((item) => item.id === id);
    if (p) {
      await updateProject(id, { featured: !p.featured });
    }
  };

  const reorderProjects = async (orderedIds: string[]): Promise<void> => {
    const updated = [...projects].sort((a, b) => {
      const indexA = orderedIds.indexOf(a.id);
      const indexB = orderedIds.indexOf(b.id);
      return indexA - indexB;
    }).map((item, index) => ({
      ...item,
      homepageOrder: index + 1
    }));

    saveToPersistence(updated);
  };

  const saveDraft = (draft: Partial<Project>) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  };

  const getDraft = (): Partial<Project> | null => {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  const submitInquiry = async (inquiryData: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    if (isSupabaseConfigured) {
      await supabase.from('contact_inquiries').insert({
        name: newInquiry.name,
        email: newInquiry.email,
        company: newInquiry.company,
        phone: newInquiry.phone,
        project_type: newInquiry.projectType,
        budget_range: newInquiry.budgetRange,
        timeline: newInquiry.timeline,
        brief: newInquiry.brief
      });
    }

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    if (!isSupabaseConfigured) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    }
  };

  const resetToDefaultProjects = () => {
    localStorage.removeItem(ACTIVE_STORAGE_KEY);
    localStorage.removeItem(DELETED_STORAGE_KEY);
    setProjects(SHOWCASE_PROJECTS);
    localStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(SHOWCASE_PROJECTS));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        getProjectBySlug,
        getAdjacentProjects,
        createProject,
        updateProject,
        deleteProject,
        toggleFeatured,
        reorderProjects,
        saveDraft,
        getDraft,
        clearDraft,
        submitInquiry,
        inquiries,
        resetToDefaultProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
