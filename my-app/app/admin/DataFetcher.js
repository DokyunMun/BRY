import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function DataFetcher() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: artworks } = await supabase.from("artwork").select();

  return artworks;
}
