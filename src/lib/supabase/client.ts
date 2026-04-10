import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          if (typeof document === 'undefined') return [];
          return document.cookie.split(';').map((cookie) => {
            const [name, ...rest] = cookie.trim().split('=');
            return { name, value: rest.join('=') };
          });
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          if (typeof document === 'undefined') return;
          cookiesToSet.forEach(({ name, value, options }) => {
            let cookieString = `${name}=${value}`;
            
            if (options?.path) {
              cookieString += `; path=${options.path}`;
            } else {
              cookieString += `; path=/`;
            }
            
            if (options?.maxAge) {
              cookieString += `; max-age=${options.maxAge}`;
            }
            
            if (options?.domain) {
              cookieString += `; domain=${options.domain}`;
            }
            
            if (options?.sameSite) {
              cookieString += `; samesite=${options.sameSite}`;
            }
            
            if (options?.secure) {
              cookieString += `; secure`;
            }
            
            document.cookie = cookieString;
          });
        },
      },
    }
  );
}