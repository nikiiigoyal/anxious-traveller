import { createClient } from '@supabase/supabase-js';

// Browser Supabase client. Configure in `.env.local` (and in Vercel):
//   VITE_SUPABASE_URL=https://<project>.supabase.co
//   VITE_SUPABASE_ANON_KEY=<public anon key>
// Accept a pasted endpoint like https://x.supabase.co/rest/v1/ — keep the origin.
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const url = (() => { try { return rawUrl ? new URL(rawUrl).origin : ''; } catch { return ''; } })();
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const supabaseConfigured = Boolean(url && anonKey);

// PKCE puts confirmation / reset-link results in `?code=` instead of the URL
// hash, so they don't clash with the app's hash routing (#landing, #brief, …).
export const supabase = supabaseConfigured
  ? createClient(url, anonKey, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true } })
  : null;

// Where Supabase sends the user back after email confirmation or a
// password-reset link. Must be listed under Auth → URL Configuration.
export const authRedirectUrl = () => `${window.location.origin}/`;
