'use client';

import { useState } from "react";
import Link from "next/link";
import { Negocio } from "../app/home/negocios/page"
import DeleteConfirmationModal from "./DeleteConfirmationModel";
import Pagination from "./Pagination";
import NegociosCardView from "./NegociosCardView";
import NegociosDesktopTable from "./NegociosDesktopTable";

export default function NegociosTable({ initialData }: { initialData: Negocio[] }) {
  
  const [negocios, setNegocios] = useState<Negocio[]>(initialData);
    
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [negocioToDelete, setNegocioToDelete] = useState<Negocio | null>(null);

  const handleDelete = async () => { /* ... */ };
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  
  const filtered = negocios.filter((n) =>
    n.nombre.toLowerCase().includes(search.toLowerCase()) ||
    n.categoria.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por nombre o categoría..."
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

      <NegociosDesktopTable 
        negocios={paginated} 
        onDelete={(negocio) => setNegocioToDelete(negocio)} 
      />
      <NegociosCardView 
        negocios={paginated} 
        onDelete={(negocio) => setNegocioToDelete(negocio)} 
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <DeleteConfirmationModal
        isOpen={!!negocioToDelete}
        itemName={negocioToDelete?.nombre || ''}
        onClose={() => setNegocioToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}