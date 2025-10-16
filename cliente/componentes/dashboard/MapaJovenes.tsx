"use client";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { useTheme } from "@/app/providers/theme_providers"; 

const datosSimulados = [
  { lat: 19.556, lng: -99.250, cantidad: 15 },
  { lat: 19.560, lng: -99.245, cantidad: 8 },
  { lat: 19.548, lng: -99.260, cantidad: 20 },
  { lat: 19.565, lng: -99.255, cantidad: 5 },
];

function HeatmapLayer({ puntos }: { puntos: typeof datosSimulados }) {
  const map = useMap();
  const layerRef = useRef<any>(null);
  const { theme } = useTheme(); // Detecta el tema actual

  useEffect(() => {
    if (!map) return;
    const heatData = puntos.map(p => [p.lat, p.lng, p.cantidad]);

    // 2. Define un gradiente de color más brillante para el modo oscuro
    const heatGradient = {
      0.4: 'blue',
      0.6: 'cyan',
      0.7: 'lime',
      0.8: 'yellow',
      1.0: 'red'
    };
    
    // Si la capa existe, la borramos para crearla de nuevo
    if (layerRef.current) {
        map.removeLayer(layerRef.current);
    }
    
    layerRef.current = (L as any).heatLayer(heatData, { 
      radius: 25,
      // Aplica el gradiente brillante solo si el tema es oscuro
      gradient: theme === 'dracula' ? heatGradient : undefined
    }).addTo(map);

  }, [map, puntos, theme]); // Se vuelve a ejecutar si el tema cambia

  return null;
}

export default function MapaJovenesHeatmap() {
  const { theme } = useTheme(); // 3. Obtiene el tema actual

  // 4. Define las URLs para los temas claro y oscuro
  const tileLayers = {
    light: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors"
    },
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  };

  const currentTileLayer = theme === 'dracula' ? tileLayers.dark : tileLayers.light;

  return (
    <div className="card lg:col-span-4 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-base-content">Ubicación de los Jóvenes</h2>

        <MapContainer
          center={[19.554, -99.252]}
          zoom={12}
          style={{ height: "400px", width: "100%", borderRadius: '1rem' }}
        >
          {/* 5. Usa la URL y atribución que corresponde al tema actual */}
          <TileLayer
            url={currentTileLayer.url}
            attribution={currentTileLayer.attribution}
          />
          <HeatmapLayer puntos={datosSimulados} />
        </MapContainer>
      </div>
    </div>
  );
}