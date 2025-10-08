'use client';

import { useState } from "react";
import Link from "next/link";
import { Joven } from "../app/home/jovenes/page"; 
import DeleteConfirmationModal from "./DeleteConfirmationModel";
import Pagination from "./Pagination";
import JovenesCardView from "./JovenesCardView";
import JovenesDesktopTable from "./JovenesDesktopTable";

export default function JovenesTable({ initialData }: { initialData: Joven[] }) {
  const [jovenes, setJovenes] = useState<Joven[]>(initialData); 
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [jovenToDelete, setJovenToDelete] = useState<Joven | null>(null);

  const handleDelete = async () => {
    if (!jovenToDelete) return;
    try {
      // llamada a la API
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${jovenToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el joven.");
      }
      setJovenes(prevJovenes => prevJovenes.filter(j => j.id !== jovenToDelete.id));
      alert(`Joven "${jovenToDelete.name}" eliminado con éxito.`);
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el registro.");
    } finally {
      setJovenToDelete(null);
    }
  };

  const filtered = jovenes.filter((j) =>
    j.name.toLowerCase().includes(search.toLowerCase()) ||
    j.folio.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por nombre o folio..."
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
      <JovenesDesktopTable 
        jovenes={paginated} 
        onDelete={(joven) => setJovenToDelete(joven)} 
      />
      <JovenesCardView 
        jovenes={paginated} 
        onDelete={(joven) => setJovenToDelete(joven)} 
      />
    
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <DeleteConfirmationModal
        isOpen={!!jovenToDelete}
        itemName={jovenToDelete?.name || ''}
        onClose={() => setJovenToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}