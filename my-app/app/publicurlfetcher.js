
import { createClient } from '@supabase/supabase-js'

export default async function PublicUrl(artwork) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data } = supabase
    .storage
    .from('images')
    .getPublicUrl(`/${artwork}`)

    return data
}


