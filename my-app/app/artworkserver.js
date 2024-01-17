// my-app/app/ArtworksServer.tsx
import DataFetcher from "./datafetcher";
import Artworks from "./artworks";

export default async function ArtworksServer() {
  const artworks = await DataFetcher();
  return <Artworks artworks={artworks} />;
}
