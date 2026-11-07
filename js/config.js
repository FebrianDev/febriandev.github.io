// Internal Configuration (Obfuscated)
const _u = "aHR0cHM6Ly9mb2Rkcmx4bmxwYXZmcnFhZ2xnZi5zdXBhYmFzZS5jbw==";
const _k = "c2JfcHVibGlzaGFibGVfclMwcTVuR3lKUVhvVVZSb09OZC1yUV9ucTBJRnM2SQ==";

export const SUPABASE_URL = typeof atob !== "undefined" ? atob(_u) : "";
export const SUPABASE_ANON_KEY = typeof atob !== "undefined" ? atob(_k) : "";

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
