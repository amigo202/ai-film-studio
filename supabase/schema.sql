-- Schema for AI Film Studio Portfolio & CMS (Supabase)

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  client TEXT NOT NULL,
  year TEXT NOT NULL,
  category TEXT NOT NULL,
  work_type TEXT NOT NULL DEFAULT 'client_work', -- 'client_work' | 'concept_work' | 'experimental'
  status TEXT NOT NULL DEFAULT 'published', -- 'published' | 'draft'
  featured BOOLEAN NOT NULL DEFAULT false,
  homepage_order INTEGER NOT NULL DEFAULT 999,
  video_data JSONB NOT NULL,
  project_type TEXT NOT NULL,
  role TEXT NOT NULL,
  challenge TEXT NOT NULL,
  idea TEXT NOT NULL,
  concept_art_url TEXT,
  short_description TEXT NOT NULL,
  full_description TEXT,
  process_steps JSONB DEFAULT '[]'::jsonb,
  frame_breakdown JSONB,
  production_stats JSONB DEFAULT '{}'::jsonb,
  credits JSONB DEFAULT '{}'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  gallery JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contact Inquiries Table (Client Briefs)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  brief TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can read published projects
CREATE POLICY "Allow public read published projects" 
ON public.projects FOR SELECT 
USING (status = 'published' OR auth.role() = 'authenticated');

-- Authenticated admins have full access to projects
CREATE POLICY "Allow authenticated full access to projects" 
ON public.projects FOR ALL 
USING (auth.role() = 'authenticated');

-- Public can insert contact inquiries
CREATE POLICY "Allow public insert inquiries" 
ON public.contact_inquiries FOR INSERT 
WITH CHECK (true);

-- Authenticated admins can read inquiries
CREATE POLICY "Allow authenticated read inquiries" 
ON public.contact_inquiries FOR SELECT 
USING (auth.role() = 'authenticated');
