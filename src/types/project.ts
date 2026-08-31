export type ProjectCategory = 
  | 'Commercial' 
  | 'Storytelling' 
  | 'Product' 
  | 'Social' 
  | 'Education' 
  | 'Experimental' 
  | 'Digital Humans';

export type WorkType = 
  | 'client_work' 
  | 'concept_work' 
  | 'experimental';

export type ProjectStatus = 'published' | 'draft';

export type VideoProvider = 'vimeo' | 'youtube' | 'bunny' | 'direct';

export interface VideoMedia {
  provider: VideoProvider;
  videoId?: string;         // e.g. Vimeo ID '1058294821' or YouTube 'dQw4w9WgXcQ'
  masterUrl?: string;       // Full high-res stream / embed URL
  previewUrl?: string;      // 5-8s lightweight muted web-optimized video loop
  posterUrl: string;        // High-res static image loaded immediately
  aspectRatio?: '16:9' | '2.39:1' | '9:16' | '4:3' | '1:1';
  duration?: string;        // e.g. '00:40' or '03:15'
  captionsUrl?: string;
}

export interface BehindTheFilmStep {
  id: string;
  stepNumber: string;       // '01', '02', ..., '08'
  title: string;            // 'Concept', 'Visual Development', 'Characters / Locations', etc.
  subtitle?: string;
  description: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  active: boolean;
}

export interface FrameBreakdownStage {
  id: string;
  title: string;            // 'INITIAL IDEA', 'GENERATED FRAME', 'MOTION', 'FINAL FILM'
  type: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
}

export interface FrameBreakdownItem {
  shotName: string;         // e.g. 'Shot 04 - Desert Train Arrival'
  description?: string;
  stages: FrameBreakdownStage[];
}

export interface ProductionStats {
  shotsCount?: number;      // e.g. 18
  locationsCount?: number;  // e.g. 4
  charactersCount?: number; // e.g. 3
  filmingDays?: number;     // e.g. 0
  finalDuration?: string;   // e.g. '40 sec'
  renderTime?: string;      // e.g. '48 hours'
  customMetrics?: { label: string; value: string }[];
}

export interface Credits {
  creativeDirection?: string;
  director?: string;
  aiFilm?: string;
  visualDevelopment?: string;
  editing?: string;
  soundDesign?: string;
  music?: string;
  client?: string;
  agency?: string;
  vfxCompositing?: string;
  customCredits?: { role: string; name: string }[];
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
  aspectRatio?: '16:9' | '2.39:1' | '1:1' | '4:5';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  client: string;
  year: string;
  category: ProjectCategory;
  workType: WorkType;
  status: ProjectStatus;
  featured: boolean;
  homepageOrder: number;
  
  // Media (3-Tier)
  video: VideoMedia;
  
  // Story & Overview
  projectType: string;      // e.g. 'AI Commercial Film', 'Narrative Short Film'
  role: string;             // e.g. 'Concept / Creative Direction / AI Film / Sound'
  challenge: string;        // The client's need / challenge
  idea: string;             // The creative core idea
  conceptArtUrl?: string;
  shortDescription: string;
  fullDescription?: string;

  // Pipeline & Breakdown
  processSteps: BehindTheFilmStep[];
  frameBreakdown?: FrameBreakdownItem;
  
  // Stats & Credits
  productionStats: ProductionStats;
  credits: Credits;
  techStack: string[];      // ['Midjourney v6.1', 'Runway Gen-3 Alpha', 'Kling AI', 'ElevenLabs', 'DaVinci Resolve']
  
  // Gallery
  gallery: GalleryItem[];
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budgetRange?: string;
  timeline?: string;
  brief: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'archived';
}
