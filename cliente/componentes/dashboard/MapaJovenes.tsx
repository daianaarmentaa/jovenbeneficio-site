"use client";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet.heat";

const datosSimulados = [
  { lat: 19.556, lng: -99.250, cantidad: 15 },
  { lat: 19.560, lng: -99.245, cantidad: 8 },
  { lat: 19.548, lng: -99.260, cantidad: 20 },
  { lat: 19.565, lng: -99.255, cantidad: 5 },
];

// Componente para agregar heatmap al mapa
function HeatmapLayer({ puntos }: { puntos: typeof datosSimulados }) {
  const map = useMap();
  const layerRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;

    // Convertir datos a formato [lat, lng, intensidad]
    const heatData = puntos.map(p => [p.lat, p.lng, p.cantidad]);

    // Crear capa heat
    layerRef.current = (L as any).heatLayer(heatData, { radius: 25 }).addTo(map);

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map, puntos]);

  return null;
}

export default function MapaJovenesHeatmap() {
  return (
    <div className="card lg:col-span-4 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Ubicación de los Jóvenes</h2>

        <MapContainer
          center={[19.554, -99.252]}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <HeatmapLayer puntos={datosSimulados} />
        </MapContainer>
      </div>
    </div>
  );
}
