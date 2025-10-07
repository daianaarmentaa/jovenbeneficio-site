"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 

type Joven = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
};

export default function JovenesTable() {
  const [jovenes, setJovenes] = useState<Joven[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setJovenes(data as Joven[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando jóvenes...</p>;

  const filtered = jovenes.filter((j) =>
    j.name.toLowerCase().includes(search.toLowerCase())
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
        <Link href="/home/jovenes/registrarJoven">
          <button className="btn btn-primary btn-lg text-sm rounded">Registrar Joven</button>
        </Link>
      </div>
      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full border border-base-300">
          <thead className="bg-base-200">
            <tr>
              <th>Foto</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((joven) => (
              <tr key={joven.id} className="bg-base-100 hover:bg-base-300">
                <td>
                  <img
                    src={`https://i.pravatar.cc/50?img=${joven.id}`}
                    alt={joven.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{joven.id}</td>
                <td>{joven.name}</td>
                <td>{joven.email}</td>
                <td>{joven.address.city}</td>
                <td>{joven.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex flex-col gap-4">
        {paginated.map((joven) => (
          <div key={joven.id} className="card bg-base-100 shadow-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://i.pravatar.cc/50?img=${joven.id}`}
                alt={joven.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="font-bold text-lg">{joven.name}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">Correo:</span>
                <span>{joven.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">Ciudad:</span>
                <span>{joven.address.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-base-content/70">Teléfono:</span>
                <span>{joven.phone}</span>
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

