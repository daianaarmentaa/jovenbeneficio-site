"use client";
import React from "react";
import { Tag } from "lucide-react";

type Promocion = { nombre: string; negocio: string; fecha: string };

export default function UltimasPromociones({ data }: { data: Promocion[] }) {
  return (
    <div className="card lg:col-span-2 bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title"><Tag className="text-neutral" /> Últimas Promociones</h2>
        <div className="overflow-x-auto h-64">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Promoción</th>
                <th>Negocio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((promo) => (
                <tr key={promo.nombre} className="hover">
                  <td>{promo.nombre}</td>
                  <td>{promo.negocio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
