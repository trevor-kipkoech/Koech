import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wwojpfhtqmfalbhbwncg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3b2pwZmh0cW1mYWxiaGJ3bmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0OTY2MTUsImV4cCI6MjA4NzA3MjYxNX0.8rZapOwFROQGwTGr7D-3mi-t_RXs7eXNFhRqSdAcrBE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
