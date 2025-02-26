
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcymwqhvkbgttmhvdkfe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeW13cWh2a2JndHRtaHZka2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMjI4MjIsImV4cCI6MjA1NTc5ODgyMn0.w0Hhny0YuT_zzRgaupEaxoVQB5pYVuPnKzrQu2DL2DY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
