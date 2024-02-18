import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function UrlImageFetcher({
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
        return;
      }
      setImageUrl(data.publicUrl);
    };

    fetchImageUrl();
  }, [artworkId]);

  return imageUrl ? (
    <Image
      id={artworkId}
      className={className}
      src={imageUrl}
      alt={alt}
      width={0}
      height={0}
      layout="responsive"
      style={style} // 스타일 적용
      onClick={onClick}
      onLoad={onLoad} // 이미지 로드 완료 시 실행할 함수
    />
  ) : null;
}

export default UrlImageFetcher;
