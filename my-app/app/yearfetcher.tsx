import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function YearFetcher() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: years } = await supabase
    .from("artwork2")
    .select("year")
  return years;
}
