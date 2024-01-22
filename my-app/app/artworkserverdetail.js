// my-app/app/ArtworksServer.tsx
import DataFetcher from "../past/datafetcher";
import Detail from "@/pages/detail/[id]";

export default async function ArtworksServer() {
    const artworks = await DataFetcher();
    return <Detail artworks={artworks} />;
    
}