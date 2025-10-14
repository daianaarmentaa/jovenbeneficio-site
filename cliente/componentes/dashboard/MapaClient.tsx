
import dynamic from "next/dynamic";

const MapaJovenesHeatmap = dynamic(
  () => import("./MapaJovenes"),
  { ssr: false } 
);

export default MapaJovenesHeatmap;
