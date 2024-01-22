// my-app/app/ArtworksServer.tsx
import Artworks from "../app/artworks";

export default async function ArtworksServer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/datafetcher`);
  const artworks = await res.json();
  return <Artworks artworks={artworks} />;
}