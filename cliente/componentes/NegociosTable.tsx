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
    // Ejemplo usando JSON placeholder, reemplazar con la API
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

  return (
    <div className="overflow-x-auto p-2">
      <div className="mb-4 flex gap-2 w-full max-w-8xl">
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
        <Link href="/negocios/registrarNegocio">
          <button className="btn btn-primary btn-lg text-sm rounded">
            Registrar Negocio
          </button>
        </Link>
      </div>

      <table className="table w-full border border-gray-200">
        <thead className="bg-base-100">
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
                <img
                  src={`https://i.pravatar.cc/50?img=${negocio.id}`}
                  alt={negocio.nombre}
                  className="w-10 h-10 rounded-full"
                />
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

      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm btn-primary rounded"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-sm btn-primary rounded"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
