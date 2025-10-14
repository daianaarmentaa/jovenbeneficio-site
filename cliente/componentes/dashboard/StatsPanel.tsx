"use client";
import React from "react";
import { Users, BrainCircuit, DollarSign, CreditCard } from "lucide-react";

export default function StatsPanel() {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-6">
      <div className="stat">
        <div className="stat-figure"><Users size={32} /></div>
        <div className="stat-title">Jóvenes Totales</div>
        <div className="stat-value">1,250</div>
        <div className="stat-desc">Usuarios registrados</div>
      </div>
      <div className="stat">
        <div className="stat-figure"><BrainCircuit size={32} /></div>
        <div className="stat-title">Promedio de Edad</div>
        <div className="stat-value">21.3 años</div>
        <div className="stat-desc">Rango de 12-22 años</div>
      </div>
      <div className="stat">
        <div className="stat-figure"><DollarSign size={32} /></div>
        <div className="stat-title">Negocios Totales</div>
        <div className="stat-value">78</div>
        <div className="stat-desc">Activos en la plataforma</div>
      </div>
      <div className="stat">
        <div className="stat-figure"><CreditCard size={32} /></div>
        <div className="stat-title">Tarjetas</div>
        <div className="stat-value">1,100 D | 150 F</div>
        <div className="stat-desc">Digitales y Físicas</div>
      </div>
    </div>
  );
}
