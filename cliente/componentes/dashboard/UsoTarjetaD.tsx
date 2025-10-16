/* Esta función se encarga de crear un componente para
 * mostrar una gráfica sobre los usos de la tarjeta digital en los
 * últimos 7 días.
 * La función recibe los datos enviados por la API.
 * Autora: Daiana Andrea Armenta Maya
*/
"use client";
import React from "react";
import { Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";

type UsoTarjetaData = { fecha: string; "Usos Tarjeta Digital": number };

export default function UsoTarjetaDigital({ data }: { data: UsoTarjetaData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="card lg:col-span-4 bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-base-content"><Activity className="text-base-content" /> Uso de Tarjeta Digital (Últ. 7 días)</h2>
          <p className="text-center text-gray-500">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card lg:col-span-4 bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-base-content"><Activity className="text-base-content" /> Uso de Tarjeta Digital (Últ. 7 días)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" stroke="rgba(156, 156, 156, 1)" />
            <YAxis stroke="rgba(156, 156, 156, 1)" />
            <Tooltip />
            <Area type="monotone" dataKey="Usos Tarjeta Digital" stroke="#71D1FE" fill="#71D1FE" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
