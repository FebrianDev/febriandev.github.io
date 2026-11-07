-- ==============================================================================
-- SKEMA LENGKAP DATABASE SUPABASE PORTFOLIO (Termasuk Table Achievements)
-- Salin seluruh isi query ini dan jalankan di:
-- Dashboard Supabase -> SQL Editor -> New Query -> Tempel (Paste) -> Klik "Run"
-- ==============================================================================

-- 1. Buat Tabel Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  project_url TEXT DEFAULT '#',
  case_study_url TEXT DEFAULT '#',
  mockup_type TEXT DEFAULT 'stream',
  image_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat Tabel Experience
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  is_current BOOLEAN DEFAULT false,
  bullets TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Buat Tabel Achievements (Prestasi, Sertifikasi, Penghargaan)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT DEFAULT '',
  credential_url TEXT DEFAULT '#',
  image_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Buat Tabel Profile Settings
CREATE TABLE IF NOT EXISTS profile_settings (
  id INT PRIMARY KEY DEFAULT 1,
  status_text TEXT DEFAULT 'Available for new projects',
  hero_title_1 TEXT DEFAULT 'Crafting Seamless',
  hero_title_2 TEXT DEFAULT 'Android Experiences',
  hero_subtitle TEXT DEFAULT 'Passionate Android Developer specializing in Kotlin, Jetpack Compose, and creating robust, scalable mobile applications.',
  bio TEXT[] DEFAULT '{}',
  email TEXT DEFAULT 'johndoe@email.com',
  resume_url TEXT DEFAULT '#',
  github_url TEXT DEFAULT 'https://github.com/',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Aktifkan Keamanan Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;

-- 6. Hapus policy lama jika sudah pernah dibuat sebelumnya (agar idempotent)
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Public read experiences" ON experiences;
DROP POLICY IF EXISTS "Public read achievements" ON achievements;
DROP POLICY IF EXISTS "Public read profile" ON profile_settings;

DROP POLICY IF EXISTS "Admin CRUD projects" ON projects;
DROP POLICY IF EXISTS "Admin CRUD experiences" ON experiences;
DROP POLICY IF EXISTS "Admin CRUD achievements" ON achievements;
DROP POLICY IF EXISTS "Admin CRUD profile" ON profile_settings;

-- 7. Policy Izin Akses:
-- Publik (Pengunjung Web): Hanya boleh BACA (SELECT)
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read profile" ON profile_settings FOR SELECT USING (true);

-- Admin (Pengguna yang Login di admin.html): Memiliki izin penuh CRUD
CREATE POLICY "Admin CRUD projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD experiences" ON experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD achievements" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin CRUD profile" ON profile_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 8. Otomatisasi Storage Bucket 'portfolio-assets' & Izin Upload Gambar
-- ==============================================================================

-- Buat bucket portfolio-assets sebagai public bucket jika belum ada
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Hapus policy storage lama (agar idempotent)
DROP POLICY IF EXISTS "Public Read Portfolio Assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Portfolio Assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Portfolio Assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Portfolio Assets" ON storage.objects;

-- Policy: Publik bisa melihat semua gambar di bucket ini
CREATE POLICY "Public Read Portfolio Assets" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-assets');

-- Policy: Admin (user yang login) bisa upload, edit, dan hapus gambar
CREATE POLICY "Admin Upload Portfolio Assets" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Admin Update Portfolio Assets" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admin Delete Portfolio Assets" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');


