// my-app/app/ArtworksServer.tsx
import Yearbtn from "./year-btn";
import YearFetcher from "./yearfetcher";

export default async function YearServer() {
  const years = await YearFetcher();
  return <Yearbtn years={ years } />;
}
