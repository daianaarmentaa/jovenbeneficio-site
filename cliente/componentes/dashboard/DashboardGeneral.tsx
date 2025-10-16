"use client";
import React, { useEffect, useState } from "react";

import StatsPanel from "./StatsPanel";
import NegociosMasVisitados from "./NegociosMasVisitados";
import CategoriasPopulares from "./CategoriasPopulares";
import GeneroUsuarios from "./GeneroUsuarios";
import NegociosFavoritos from "./NegociosFavs";
import UltimasPromociones from "./UltimasPromos";
import UsoTarjetaDigital from "./UsoTarjetaD";
import MapaJovenes from "./MapaClient";


export default function DashboardGeneral({ user }: { user: any }) {
  const [datos, setDatos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    async function fetchDatos() {
      try {
        const res = await fetch(
          "https://m6y1jona1f.execute-api.us-east-1.amazonaws.com/default/dashboardStats"
        );
        const data = await res.json();
        setDatos(data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDatos();
  }, []);

  
  if (loading) return <p className="text-base-content">Cargando...</p>;
  if (!datos) return <p className="text-error">No se pudieron cargar los datos.</p>;
  return (
    <main className="p-4 sm:p-6 lg:p-4 bg-base-200 min-h-screen text-base-300">
      <h1 className="text-3xl font-semibold text-base-content mb-6">
        Hola! {user.name}
      </h1>

      <StatsPanel stats={datos.stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NegociosMasVisitados data={datos.topNegocios} />
        <CategoriasPopulares data={datos.topCategorias} />
        <GeneroUsuarios data={datos.genero} />
        <NegociosFavoritos data={datos.topFavoritos} />
        <UltimasPromociones data={datos.promociones} />
        <UsoTarjetaDigital data={datos.usoTarjeta} />
        <MapaJovenes />
      </div>
    </main>
  );
}
