import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function UrlImageFetcherImg({
  artworkId,
  alt,
  className,
  onClick,
  onLoad,
  style,
}) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const { data, error } = await supabase.storage
        .from("images")
        .getPublicUrl(`${artworkId}`);
      if (error) {
        console.error("Error fetching image URL:", error.message);
        console.log("artworkId");
        console.log(artworkId);
        return;
      }
      setImageUrl(data.publicUrl);
    };

    fetchImageUrl();
  }, [artworkId]);

  return imageUrl ? (
    <img
      id={artworkId}
      className={className}
      src={imageUrl}
      alt={alt}
      style={style}
      onClick={onClick}
      onLoad={onLoad}
    />
  ) : null;
}

export default UrlImageFetcherImg;
