"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Negocio = {
  id: number;
  nombre: string;
  rfc: string;
  correo: string;
  telefono: string;
  direccion: {
    ciudad: string;
  };
};

export default function NegociosTable() {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const negociosData = data.map((u: any) => ({
          id: u.id,
          nombre: u.name,
          rfc: `RFC${u.id}XYZ`,
          correo: u.email,
          telefono: u.phone,
          direccion: { ciudad: u.address.city },
        }));
        setNegocios(negociosData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando negocios...</p>;

  const filtered = negocios.filter((n) =>
    n.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="p-2">
      {/* --- Barra de Búsqueda y Botón --- */}
      <div className="mb-4 flex gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          className="input input-bordered input-lg flex-1 !rounded-sm placeholder:text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Link href="/home/negocios/registrarNegocio">
          <button className="btn btn-primary btn-lg text-sm rounded">
            Registrar Negocio
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full border border-base-300">
          <thead className="bg-base-200">
            <tr>
              <th>Logo</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>RFC</th>
              <th>Ciudad</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((negocio) => (
              <tr key={negocio.id} className="bg-base-100 hover:bg-base-300">
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={`https://i.pravatar.cc/50?u=${negocio.id}`} alt={negocio.nombre} />
                    </div>
                  </div>
                </td>
                <td>{negocio.id}</td>
                <td>{negocio.nombre}</td>
                <td>{negocio.rfc}</td>
                <td>{negocio.direccion.ciudad}</td>
                <td>{negocio.correo}</td>
                <td>{negocio.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {paginated.map((negocio) => (
          <div key={negocio.id} className="card bg-base-100 shadow-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={`https://i.pravatar.cc/50?u=${negocio.id}`} alt={negocio.nombre} />
                </div>
              </div>
              <div className="font-bold text-lg">{negocio.nombre}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-base-200 py-1">
                <span className="font-semibold text-base-content/70">RFC:</span>
                <span>{negocio.rfc}</span>
              </div>
              <div className="flex justify-between border-b border-base-200 py-1">
                <span className="font-semibold text-base-content/70">Ciudad:</span>
                <span>{negocio.direccion.ciudad}</span>
              </div>
              <div className="flex justify-between border-b border-base-200 py-1">
                <span className="font-semibold text-base-content/70">Correo:</span>
                <span className="truncate">{negocio.correo}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-base-content/70">Teléfono:</span>
                <span>{negocio.telefono}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm btn-primary rounded"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-sm btn-primary rounded"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
