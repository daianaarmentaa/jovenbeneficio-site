/* Esta función se encarga de crear un componente para
 * mostrar una gráfica de barras en donde se ven los 5 negocios más visitados
 * La función recibe el nombre del usuario para mostrarlo en el encabezado.
 * Autora: Daiana Andrea Armenta Maya
*/
"use client";
import React from "react";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";

type NegocioVisitas = { name: string; visitas: number};

// Se definen los colores que se van a usar en cada barra 
const barColors = ["#71D1FE", "#FFB667", "#7AF1A7", "#FF9FA0", "#E9D4FF", "#FCA4D4"];

export default function NegociosMasVisitados({ data }: { data: NegocioVisitas[]}) {
    if (!data || data.length === 0) {
        return (
            <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-base-content"><BarChart3 className="text-base-content" /> Negocios Más Visitados</h2>
                <p className="text-center text-gray-500">No hay datos disponibles</p>
            </div>
            </div>
        );
    }
    return(
        <div className="card lg:col-span-2 bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-base-content">
                    <BarChart3 className="text-base-content"/> Negocios más Visitados
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={110} interval={0} stroke="rgba(156, 156, 156, 1)" />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }}/>
                        <Bar dataKey="visitas">
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