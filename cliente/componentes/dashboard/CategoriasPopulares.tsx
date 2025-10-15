"use client";
import React from "react";
import { Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";

type Categoria = { name: string; popularidad: number };

const barColors = ["#71D1FE", "#FFB667", "#7AF1A7", "#FF9FA0", "#E9D4FF", "#FCA4D4"];

export default function CategoriasPopulares({ data }: { data: Categoria[] }) {
  if (!data || data.length === 0) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title"><Activity className="text-neutral" /> Categorias Populares</h2>
        <p className="text-center text-gray-500">No hay datos disponibles</p>
      </div>
    </div>
  );
}
  return (
    <div className="card lg:col-span-2 bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title"><Activity className="text-neutral" /> Categorías Populares</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={110} interval={0} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
            <Bar dataKey="popularidad">
              {data.map((_, i) => (
                <Cell key={i} fill={barColors[i % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
