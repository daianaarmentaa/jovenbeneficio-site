/* Esta función se encarga de crear un componente para
 * mostrar un pie chart en donde se vean los géneros de los jóvenes.
 * La función recibe los datos enviados por la API.
 * Autora: Daiana Andrea Armenta Maya
*/
"use client";
import React from "react";
import { PieChart as PieIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

type GeneroData = { name: string };

export default function GeneroUsuarios({ data }: { data: GeneroData[] }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="text-base-content card-title"><PieIcon className="text-base-content" /> Género de Usuarios</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} strokeWidth={0}>
              <Cell fill="#C079FF" />
              <Cell fill="#9605f7" />
              <Cell fill="#D8B0FF" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
