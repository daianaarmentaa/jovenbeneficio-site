"use client";
import React from "react";
import { Users, BrainCircuit, DollarSign, CreditCard } from "lucide-react";

interface Stats {
  total_jovenes: number;
  promedio_edad: number;
  total_negocios: number;
  tarjetas_digitales: number;
  tarjetas_fisicas: number;

}

interface StatsPanelProps {
  stats: Stats
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-6">
      <div className="stat">
        <div className="stat-figure"><Users size={32} /></div>
        <div className="stat-title">Jóvenes Totales</div>
        <div className="stat-value">{stats.total_jovenes}</div>
        <div className="stat-desc">Jóvenes registrados</div>
      </div>
      <div className="stat">
        <div className="stat-figure"><BrainCircuit size={32} /></div>
        <div className="stat-title">Promedio de Edad</div>
        <div className="stat-value">{stats.promedio_edad}</div>
        <div className="stat-desc">Rango de 12-29 años</div>
      </div>
      <div className="stat">
        <div className="stat-figure"><DollarSign size={32} /></div>
        <div className="stat-title">Negocios Totales</div>
        <div className="stat-value">{stats.total_negocios}</div>
        <div className="stat-desc">Activos en la plataforma</div>
      </div>
      <div className="stat">
        <div className="stat-figure"><CreditCard size={32} /></div>
        <div className="stat-title">Tarjetas Digitales</div>
        <div className="stat-value">{stats.tarjetas_digitales}</div>
        <div className="stat-desc">Digitales</div>
      </div>
        <div className="stat">
        <div className="stat-figure"><CreditCard size={32} /></div>
        <div className="stat-title">Tarjetas Físicas</div>
        <div className="stat-value">{stats.tarjetas_fisicas}</div>
        <div className="stat-desc">Físicas</div>
      </div>
    </div>
  );
}
