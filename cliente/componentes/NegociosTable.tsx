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

  const handleDelete = async () => {
    if (!negocioToDelete) return;

    try {
      // TODO: Call DELETE API endpoint here
      // const response = await fetch(`/api/establecimientos/${negocioToDelete.id}`, {
      //   method: 'DELETE',
      // });

      // For now, just remove from local state
      setNegocios(negocios.filter(n => n.id !== negocioToDelete.id));
      setNegocioToDelete(null);
      
      // Show success message
      alert('Negocio eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting negocio:', error);
      alert('Error al eliminar el negocio');
    }
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  
  // Updated filter to use new field names
  const filtered = negocios.filter((n) =>
    n.nombre_establecimiento.toLowerCase().includes(search.toLowerCase()) ||
    n.categoria.toLowerCase().includes(search.toLowerCase()) ||
    n.colonia.toLowerCase().includes(search.toLowerCase()) ||
    n.nombre_contacto_completo?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por nombre, categoría, colonia..."
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

      {paginated.length === 0 ? (
        <div className="text-center py-8 text-base-content/70">
          No se encontraron establecimientos
        </div>
      ) : (
        <>
          <NegociosDesktopTable 
            negocios={paginated} 
            onDelete={(negocio) => setNegocioToDelete(negocio)} 
          />
          <NegociosCardView 
            negocios={paginated} 
            onDelete={(negocio) => setNegocioToDelete(negocio)} 
          />
        </>
      )}
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!negocioToDelete}
        itemName={negocioToDelete?.nombre_establecimiento || ''}
        onClose={() => setNegocioToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}