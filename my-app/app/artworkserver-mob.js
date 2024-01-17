// my-app/app/ArtworksServer.tsx
import DataFetcher from "./datafetcher";
import Artworks from "./artworks-mob";

export default async function ArtworksServermob() {
    const artworks = await DataFetcher();
    return <Artworks artworks={artworks} />;
    
}