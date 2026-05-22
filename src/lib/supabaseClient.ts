import { createClient } from '@supabase/supabase-js';

// 1. Grab the raw variables
let rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
let cleanKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// 2. Sanitize the URL (Strip quotes, trim spaces, and ensure https://)
rawUrl = rawUrl.replace(/['"]/g, '').trim();
if (!rawUrl.startsWith('http')) {
  rawUrl = `https://${rawUrl}`;
}

// 3. Sanitize the Key (Strip quotes and spaces)
cleanKey = cleanKey.replace(/['"]/g, '').trim();

if (rawUrl === 'https://placeholder.supabase.co') {
  console.warn("⚠️ Warning: Supabase keys are missing. Using placeholders.");
}

// 4. Initialize safely
export const supabase = createClient(rawUrl, cleanKey);