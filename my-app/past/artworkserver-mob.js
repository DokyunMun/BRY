// my-app/app/ArtworksServer.tsx
import DataFetcher from "./datafetcher";
import Artworks from "./artworks-mob";

export default async function ArtworksServermob() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/datafetcher`);
  const artworks = await res.json();
  return <Artworks artworks={artworks} />;
}