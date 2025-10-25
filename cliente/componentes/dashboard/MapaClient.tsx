import dynamic from "next/dynamic";

/**
 * Componente: MapaJovenesHeatmap
 * 
 * Descripción:
 * Este componente carga dinámicamente el mapa de jóvenes con visualización tipo heatmap.
 * Funcionalidades incluidas:
 * - Importación dinámica del componente MapaJovenes usando Next.js dynamic import.
 * - Desactivación del renderizado del lado del servidor (SSR: false) para compatibilidad con librerías que dependen del DOM.
 * 
 * Autora: Daiana Armenta
 */


const MapaJovenesHeatmap = dynamic(
  () => import("./MapaJovenes"),
  { ssr: false } 
);

export default MapaJovenesHeatmap;
