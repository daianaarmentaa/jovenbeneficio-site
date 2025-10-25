"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useTheme } from "@/app/providers/theme_providers";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

/**
 * Componente: MapaJovenesClusters
 * 
 * Descripción:
 * Este componente muestra un mapa interactivo con clusters de marcadores que representan la concentración de jóvenes.
 * Funcionalidades incluidas:
 * - Obtención de coordenadas desde una API y duplicación de puntos según la cantidad reportada.
 * - Renderizado de mapas con Leaflet y React-Leaflet, usando MarkerClusterGroup para agrupar marcadores.
 * - Iconos personalizados para los marcadores individuales.
 * - Adaptación del tile layer según el tema actual (claro u oscuro) usando un proveedor de tema.
 * - Indicador de carga mientras se obtienen los datos.
 * - Popups para cada marcador mostrando latitud y longitud.
 * 
 * Autora: Daiana Armenta
 */


// Tipo de dato para las coordenadas individuales que usará el mapa
type CoordenadaPoint = { lat: number; lng: number; };

// Tipo de dato que esperamos de la API (con cantidad)
type ApiPoint = { lat: string; lng: string; cantidad: number };

const customMarkerIcon = new L.DivIcon({
  html: `<span class="bg-blue-500 w-2 h-2 block rounded-full border border-white"></span>`,
  className: '', 
  iconSize: [8, 8],
  iconAnchor: [4, 4],
});


export default function MapaJovenesClusters() {
  const { theme } = useTheme();
  const [puntos, setPuntos] = useState<CoordenadaPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const API_ENDPOINT_URL = 'https://aqajhyyeq6.execute-api.us-east-1.amazonaws.com/default/getCoordenadas';

    fetch(API_ENDPOINT_URL)
      .then(response => response.json())
      .then((data: ApiPoint[]) => {
        if (Array.isArray(data)) {
          const puntosIndividuales: CoordenadaPoint[] = [];
          data.forEach(grupo => {
            for (let i = 0; i < grupo.cantidad; i++) {
              puntosIndividuales.push({
                lat: parseFloat(grupo.lat),
                lng: parseFloat(grupo.lng), 
              });
            }
          });
          setPuntos(puntosIndividuales);
        } else {
          console.error("Error: Los datos recibidos no son un arreglo.", data);
          setPuntos([]);
        }
      })
      .catch(error => {
        console.error("Error al obtener las coordenadas:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const tileLayers = {
    light: { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: "&copy; OpenStreetMap contributors" },
    dark: { url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", attribution: '&copy; OpenStreetMap contributors &copy; CARTO' }
  };

  const currentTileLayer = theme === 'dracula' ? tileLayers.dark : tileLayers.light;

  return (
    <div className="card lg:col-span-4 bg-base-100 shadow-lg">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-base-content">Concentración de Jóvenes</h2>
        
        {isLoading ? (
          <div style={{ height: "400px", width: "100%" }} className="flex items-center justify-center">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <MapContainer
            center={[19.554, -99.252]}
            zoom={12}
            style={{ height: "400px", width: "100%", borderRadius: '1rem' }}
          >
            <TileLayer
              url={currentTileLayer.url}
              attribution={currentTileLayer.attribution}
            />
            
            <MarkerClusterGroup>
              {Array.isArray(puntos) && puntos.map((punto, index) => (
                <Marker 
                  key={index} 
                  position={[punto.lat, punto.lng]}
                  icon={customMarkerIcon}
                >
                  <Popup>
                    Ubicación de un joven. <br /> 
                    Lat: {punto.lat.toFixed(4)}, Lng: {punto.lng.toFixed(4)}
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>

          </MapContainer>
        )}
      </div>
    </div>
  );
}

