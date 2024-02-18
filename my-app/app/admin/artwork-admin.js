import { createClient } from "@/utils/supabase/server";
import DataFetcher from "./DataFetcher";
import FetchImage from "./fetchImage";
import Delete from "./deletebtn";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Artworksadmin() {
  let artworks = {};

  artworks = await DataFetcher();

  return (
    <div
      id="artworkbody"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        width: "50vw",
        left: "50vw",
        top: "0",
        height: "100svh",
        overflowY: "scroll",
      }}
    >
      {artworks
        ?.sort((a, b) => b.year - a.year)
        .map((artwork) => (
          <div
            className="imagebody"
            id={artwork.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "50px",
              borderBottom: "1px solid black",
            }}
          >
            <FetchImage imageName={artwork.filename} />
            <div className="title" style={{ visibility: "visible" }}>
              <i>{artwork.title}</i>, {artwork.material}, {artwork.width}×
              {artwork.height} cm, {artwork.year}
            </div>
            <Delete
              artworkid={artwork.id}
              imageName={artwork.filename}
            ></Delete>
          </div>
        ))}
    </div>
  );
}
