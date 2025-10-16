"use client";
import React from "react";
import { Users, CakeSlice, Store, CreditCard } from "lucide-react";

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
    <div className="stats stats-vertical bg-base-100 lg:stats-horizontal shadow w-full mb-6">
      <div className="stat">
        <div className="stat-figure text-base-content"><Users size={32} /></div>
        <div className="stat-title">Jóvenes Totales</div>
        <div className="stat-value text-base-content">{stats.total_jovenes}</div>
        <div className="stat-desc">Jóvenes registrados</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-base-content"><CakeSlice size={32} /></div>
        <div className="stat-title">Promedio de Edad</div>
        <div className="stat-value text-base-content">{stats.promedio_edad}</div>
        <div className="stat-desc">Rango de 12-29 años</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-base-content"><Store size={32} /></div>
        <div className="stat-title">Negocios Totales</div>
        <div className="stat-value text-base-content">{stats.total_negocios}</div>
        <div className="stat-desc">Activos en la plataforma</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-base-content"><CreditCard size={32} /></div>
        <div className="stat-title">Tarjetas Digitales</div>
        <div className="stat-value text-base-content">{stats.tarjetas_digitales}</div>
        <div className="stat-desc">Digitales</div>
      </div>
    </div>
  );
}
