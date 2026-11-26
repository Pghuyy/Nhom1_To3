import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_IMAGE_BUCKET = 'blue-trace-images';
export const SUPABASE_VIDEO_BUCKET = 'blue-trace-videos';

function normalizeSupabaseUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
      ? parsed.origin
      : '';
  } catch {
    return '';
  }
}

const envUrl = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL ?? '');
const envAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

export function hasSupabaseEnvConfig(): boolean {
  return envUrl.startsWith('https://') && envAnonKey.length > 20;
}

export function getSupabaseEnvStatus() {
  return {
    configured: hasSupabaseEnvConfig(),
    urlPresent: envUrl.length > 0,
    anonKeyPresent: envAnonKey.length > 0,
  };
}

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a singleton @supabase/supabase-js client configured strictly
 * with public VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (no service_role key).
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!hasSupabaseEnvConfig()) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(envUrl, envAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return cachedClient;
}
