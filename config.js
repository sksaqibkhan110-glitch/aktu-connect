// AKTU Connect Global Config
window.CHAT_API_ENDPOINT = "/api/chat";

// Supabase Configuration
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
if (window.supabase) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}