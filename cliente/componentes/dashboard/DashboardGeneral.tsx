"use client";
import React from "react";

import StatsPanel from "./StatsPanel";
import NegociosMasVisitados from "./NegociosMasVisitados";
import CategoriasPopulares from "./CategoriasPopulares";
import GeneroUsuarios from "./GeneroUsuarios";
import NegociosFavoritos from "./NegociosFavs";
import UltimasPromociones from "./UltimasPromos";
import UsoTarjetaDigital from "./UsoTarjetaD";
import MapaJovenes from "./MapaClient";

const datos = {
  topNegocios: [
    { name: 'Café "El Rincón"', visitas: 980 },
    { name: "Cinepolis", visitas: 850 },
    { name: 'Gimnasio "Actívate"', visitas: 760 },
    { name: 'Librería "El Saber"', visitas: 620 },
    { name: 'Restaurante "Sazón"', visitas: 540 },
  ],
  topFavoritos: [
    { name: 'Café "El Rincón"', favoritos: 150 },
    { name: 'Librería "El Saber"', favoritos: 125 },
    { name: "Cinepolis", favoritos: 110 },
    { name: 'Tienda "EcoVida"', favoritos: 95 },
    { name: 'Parque "Aventura"', favoritos: 80 },
  ],
  topCategorias: [
    { name: "Comida", popularidad: 1230 },
    { name: "Entretenimiento", popularidad: 1100 },
    { name: "Salud", popularidad: 980 },
    { name: "Educación", popularidad: 750 },
    { name: "Servicios", popularidad: 430 },
  ],
  genero: [
    { name: "Femenino", total: 450 },
    { name: "Masculino", total: 720 },
    { name: "Otro", total: 80 },
  ],
  usoTarjeta: [
    { fecha: "Oct 01", "Usos Tarjeta Digital": 289 },
    { fecha: "Oct 02", "Usos Tarjeta Digital": 275 },
    { fecha: "Oct 03", "Usos Tarjeta Digital": 332 },
    { fecha: "Oct 04", "Usos Tarjeta Digital": 343 },
    { fecha: "Oct 05", "Usos Tarjeta Digital": 390 },
    { fecha: "Oct 06", "Usos Tarjeta Digital": 340 },
    { fecha: "Oct 07", "Usos Tarjeta Digital": 410 },
  ],
  promociones: [
    { nombre: "2x1 en Frappés", negocio: 'Café "El Rincón"', fecha: "2025-10-08" },
    { nombre: "50% Dto. en Entrada", negocio: "Cinepolis", fecha: "2025-10-07" },
    { nombre: "Inscripción Gratis", negocio: 'Gimnasio "Actívate"', fecha: "2025-10-07" },
  ],
};

export default function DashboardGeneral({ user }: { user: any }) {
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-semibold text-base-content mb-6">
        Hola! {user.name}
      </h1>

      {/*TODO: pasarle los datos de la bd a StatsPanel*/}
      <StatsPanel />
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
