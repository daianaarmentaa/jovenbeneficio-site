/* Esta función se encarga de crear un componente para
 * mostrar las últimas 5 promociones que se crearon en una tabla
 * La función recibe los datos enviados por la API.
 * Autora: Daiana Andrea Armenta Maya
*/
"use client";
import React from "react";
import { Tag } from "lucide-react";

type Promocion = { nombre: string; negocio: string; fecha: string, id_promocion:number };

export default function UltimasPromociones({ data }: { data: Promocion[] }) {
  return (
    <div className="card lg:col-span-2 bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className=" text-base-content card-title"><Tag className="text-base-content" /> Últimas Promociones</h2>
        <div className="overflow-x-auto h-64">
          <table className="table table-sm text-base-content">
            <thead>
              <tr>
                <th>Promoción</th>
                <th>Negocio</th>
                <th>Fecha</th> 
              </tr>
            </thead>
            <tbody>
              {data.map((promo) => (
                <tr key={promo.id_promocion} className="hover">
                  <td>{promo.nombre}</td>
                  <td>{promo.negocio}</td>
                  <td>{promo.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
