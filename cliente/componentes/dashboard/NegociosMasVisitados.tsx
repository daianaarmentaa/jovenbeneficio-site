"use client";
import React from "react";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

type NegocioVisitas = { name: string; visitas: number};

export default function NegociosMasVisitados({ data }: { data: NegocioVisitas[]}) {
    if (!data || data.length === 0) {
        return (
            <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title"><BarChart3 className="text-neutral" /> Negocios Más Visitados</h2>
                <p className="text-center text-gray-500">No hay datos disponibles</p>
            </div>
            </div>
        );
    }
    return(
        <div className="card lg:col-span-2 bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title">
                    <BarChart3 className="text-neutral"/> Negocios más Visitados
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={110} interval={0} />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }}/>
                        <Bar dataKey="visitas" fill="#61738D" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}