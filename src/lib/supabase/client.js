import { createClient } from '@supabase/supabase-js';

import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY } from '../constants';

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseAnonKey = REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)