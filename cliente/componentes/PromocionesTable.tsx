'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

type Establecimiento = {
  id: number;
  nombre: string;
};

// 1. Tipo 'estado' actualizado sin 'inactiva'
type Promocion = {
  id: number;
  idEstablecimiento: number;
  nombre: string;
  fechaCreacion: string;
  fechaExpiracion: string;
  estado: 'activa' | 'expirada' | 'cancelada'; 
};

type PromocionEnriquecida = Promocion & {
  nombreEstablecimiento: string;
};

// 2. Colores actualizados sin 'inactiva'
const estadoColors: { [key: string]: string } = {
  activa: 'badge-success',
  expirada: 'badge-neutral',
  cancelada: 'badge-error',
};

export default function PromocionesTable() {
  const [promociones, setPromociones] = useState<PromocionEnriquecida[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    // Datos de ejemplo para establecimientos
    const mockEstablecimientos: Establecimiento[] = Array.from({ length: 15 }, (_, i) => ({
      id: 100 + i,
      nombre: `Negocio #${i + 1}`,
    }));

    // 3. Estados posibles actualizados sin 'inactiva'
    const estadosPosibles: Promocion['estado'][] = ['activa', 'expirada', 'cancelada'];
    const mockPromociones: Promocion[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      idEstablecimiento: 100 + i,
      nombre: `Promo ${i % 3 === 0 ? 'Descuento' : '2x1'} #${i + 1}`,
      fechaCreacion: `2025-10-0${(i % 5) + 1}`,
      fechaExpiracion: `2025-11-1${(i % 5) + 1}`,
      estado: estadosPosibles[i % estadosPosibles.length],
    }));
    
    // Lógica para combinar los datos (sin cambios)
    const promocionesEnriquecidas = mockPromociones.map(promo => {
      const establecimiento = mockEstablecimientos.find(est => est.id === promo.idEstablecimiento);
      return {
        ...promo,
        nombreEstablecimiento: establecimiento ? establecimiento.nombre : 'Desconocido',
      };
    });

    setPromociones(promocionesEnriquecidas);
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando promociones...</p>;

  // --- 4. Lógica de filtrado MEJORADA ---
  const filtered = promociones.filter((p) => {
    const searchTerm = search.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(searchTerm) ||
      p.nombreEstablecimiento.toLowerCase().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="p-2">
      <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
        {/* --- 5. Placeholder del input MEJORADO --- */}
        <input
          type="search"
          placeholder="Buscar por promoción o establecimiento..."
          className="input input-bordered input-lg flex-1 !rounded-sm placeholder:text-sm"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* --- Resto del componente visual (sin cambios) --- */}
      
      {/* Vista de Tabla para Desktop */}
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
                <td className="font-semibold">{promo.nombre}</td>
                <td>{promo.nombreEstablecimiento}</td>
                <td>{promo.fechaCreacion}</td>
                <td>{promo.fechaExpiracion}</td>
                <td>
                  <span className={`badge ${estadoColors[promo.estado]}`}>{promo.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de Tarjetas para Móvil */}
      <div className="md:hidden flex flex-col gap-4">
        {paginated.map((promo) => (
          <div key={promo.id} className="card bg-base-100 shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg">{promo.nombre}</div>
              <span className={`badge ${estadoColors[promo.estado]}`}>{promo.estado}</span>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="font-semibold text-base-content/70">ID:</span><span>{promo.id}</span></div>
                <div className="flex justify-between"><span className="font-semibold text-base-content/70">Establecimiento:</span><span>{promo.nombreEstablecimiento}</span></div>
                <div className="flex justify-between"><span className="font-semibold text-base-content/70">Creación:</span><span>{promo.fechaCreacion}</span></div>
                <div className="flex justify-between"><span className="font-semibold text-base-content/70">Expiración:</span><span>{promo.fechaExpiracion}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button className="btn btn-sm btn-primary rounded" onClick={handlePrev} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button className="btn btn-sm btn-primary rounded" onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
}