// AKTU Connect Global Config & API Keys
window.GEMINI_API_KEY = "YAHAN_APNI_REAL_GEMINI_API_KEY_PASTE_KAR";

// Supabase Configuration (agar use kar raha hai)
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
if (window.supabase) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}