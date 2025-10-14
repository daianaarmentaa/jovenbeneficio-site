"use client";
import React from "react";
import { PieChart as PieIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

type GeneroData = { name: string; total: number };

export default function GeneroUsuarios({ data }: { data: GeneroData[] }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title"><PieIcon className="text-neutral" /> Género de Usuarios</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
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
