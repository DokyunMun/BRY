import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  let year = "2023";
  if (req.query.year) {
    year = req.query.year; // URL query parameter에서 'year'를 가져옵니다.
  }
  const { data: artworks } = await supabase
    .from("artworks")
    .select()
    .eq("year", year);

  res.status(200).json(artworks); // 결과를 JSON 형식으로 반환합니다.
}
