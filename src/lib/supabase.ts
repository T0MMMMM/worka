import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const SUPABASE_URL = "https://gocuruxfpsezhrxoxbzg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8FvqxPtwpjR-TcS1au0Fbw_PBEvtGc7";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
