'use client';

import { useState } from "react";
import { Promocion } from "../app/home/promociones/page";

type PromocionesTableProps = {
  initialData: Promocion[];
};

const estadoColors: { [key: string]: string } = {
  activa: 'badge-success',
  expirada: 'badge-neutral',
  cancelada: 'badge-error',
};

export default function PromocionesTable({ initialData }: PromocionesTableProps) {
  const [promociones] = useState<Promocion[]>(initialData);
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // Filtering logic
  const filtered = promociones.filter((p) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = 
      p.nombre_promocion.toLowerCase().includes(searchTerm) ||
      p.nombre_establecimiento.toLowerCase().includes(searchTerm);
    
    const matchesEstado = estadoFilter === "" || p.estado === estadoFilter;
    
    return matchesSearch && matchesEstado;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="p-2">
      {/* Search and Filter Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por promoción o establecimiento..."
          className="input input-bordered input-lg flex-1 !rounded-sm placeholder:text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        
        <select 
          className="select select-bordered select-lg !rounded-sm"
          value={estadoFilter}
          onChange={(e) => {
            setEstadoFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todos los estados</option>
          <option value="activa">Activa</option>
          <option value="expirada">Expirada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* No results message */}
      {paginated.length === 0 && (
        <div className="text-center py-8 text-base-content/70">
          No se encontraron promociones
        </div>
      )}

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full border border-base-300">
          <thead className="bg-base-200">
            <tr>
              <th>ID</th>
              <th>Nombre de Promoción</th>
              <th>Establecimiento</th>
              <th>Creación</th>
              <th>Expiración</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((promo) => (
              <tr key={promo.id} className="bg-base-100 hover:bg-base-300">
                <td>{promo.id}</td>
                <td className="font-semibold">{promo.nombre_promocion}</td>
                <td>{promo.nombre_establecimiento}</td>
                <td>{formatDate(promo.fecha_creacion)}</td>
                <td>{formatDate(promo.fecha_expiracion)}</td>
                <td>
                  <span className={`badge ${estadoColors[promo.estado]}`}>
                    {promo.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {paginated.map((promo) => (
          <div key={promo.id} className="card bg-base-100 shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg">{promo.nombre_promocion}</div>
              <span className={`badge ${estadoColors[promo.estado]}`}>
                {promo.estado}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">ID:</span>
                <span>{promo.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">Establecimiento:</span>
                <span>{promo.nombre_establecimiento}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">Creación:</span>
                <span>{formatDate(promo.fecha_creacion)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">Expiración:</span>
                <span>{formatDate(promo.fecha_expiracion)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button 
            className="btn btn-sm btn-primary rounded" 
            onClick={handlePrev} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button 
            className="btn btn-sm btn-primary rounded" 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}