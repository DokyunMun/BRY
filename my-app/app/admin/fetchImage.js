import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function FetchImage(imageName) {
  let imageNameStr = imageName.imageName;
  const { data: publicURL, error } = await supabase.storage
    .from("images")
    .getPublicUrl(imageNameStr);

  if (error) {
    console.error("Error downloading image: ", error);
    console.log("di");
    return null;
  }

  return (
    <div>
      <img
        id="1"
        className="images"
        src={publicURL.publicUrl}
        alt="${artwork.title}, {artwork.material}, {artwork.width} × {artwork.height} cm, {artwork.year}"
        width={50}
        height={50}
      />
    </div>
  );
}
