import ContentsManager from "./upload";
import Artworksadmin from "./artwork-admin";
import "./admin.css";

export default function adminR() {
  return (
    <div style={{ overflow: "scroll" }}>
      <ContentsManager></ContentsManager>
      <Artworksadmin></Artworksadmin>
    </div>
  );
}
