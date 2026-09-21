import { createClient } from "@supabase/supabase-js";

// Ensure the URL doesn't accidentally contain /rest/v1 since supabase-js appends it automatically
const rawSupabaseUrl = (import.meta as any).env['VITE_SUPABASE_URL'] || "";
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
const supabaseAnonKey = (import.meta as any).env['VITE_SUPABASE_ANON_KEY'] || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
