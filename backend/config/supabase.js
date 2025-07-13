import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Warning: Supabase environment variables not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file.');
  console.log('To get these values:');
  console.log('1. Go to your Supabase project dashboard');
  console.log('2. Click on Settings > API');
  console.log('3. Copy the Project URL and anon/public key');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);