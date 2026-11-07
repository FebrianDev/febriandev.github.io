// Konfigurasi Supabase untuk Web Portfolio & Web Admin
// Salin data ini dari Supabase Dashboard:
// Masuk ke supabase.com -> Pilih Project -> Buka Settings (ikon gerigi) -> Menu API

export const SUPABASE_URL = "https://foddrlxnlpavfrqaglgf.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_rS0q5nGyJQXoUVRoONd-rQ_nq0IFs6I";

// Cek apakah konfigurasi sudah diisi oleh pengguna
export function isSupabaseConfigured() {
  return (
    Boolean(SUPABASE_URL) &&
    !SUPABASE_URL.includes("PASTE_YOUR") &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_ANON_KEY.includes("PASTE_YOUR")
  );
}

