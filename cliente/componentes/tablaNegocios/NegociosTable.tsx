'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Negocio } from "../../app/home/negocios/page";
import DeleteConfirmationModal from "../DeleteConfirmationModel";
import Pagination from "../Pagination";
import NegociosCardView from "../tablaNegocios/NegociosCardView";
import NegociosDesktopTable from "./NegociosDesktopTable";

const API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/establecimientos";
const DELETE_API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/deleteEstablecimiento";

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

type Props = {
  initialData: Negocio[];
  initialPagination: PaginationInfo;
};

export default function NegociosTable({ initialData, initialPagination }: Props) {
  const [negocios, setNegocios] = useState<Negocio[]>(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [totalPages, setTotalPages] = useState(initialPagination.total_pages);
  const [totalItems, setTotalItems] = useState(initialPagination.total);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  const [negocioToDelete, setNegocioToDelete] = useState<Negocio | null>(null);
  const isFirstRender = useRef(true);

  // Fetch data from API
  const fetchNegocios = async (page: number, searchQuery: string = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        orderBy: 'id',
        orderDir: 'ASC',
        view_model: 'admin'
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`${API_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        setNegocios(data.data);
        setTotalPages(data.pagination?.total_pages || 0);
        setTotalItems(data.pagination?.total || 0);
        setCurrentPage(data.pagination?.page || page);
        
        console.log(`Loaded ${data.data.length} negocios for page ${page}`);
      } else {
        console.error('Invalid data structure:', data);
        setNegocios([]);
      }
    } catch (error) {
      console.error("Error fetching negocios:", error);
      setNegocios([]);
      setTotalPages(0);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('Initial render with', initialData.length, 'negocios');
      return;
    }
    
    console.log('Fetching page:', currentPage);
    fetchNegocios(currentPage, search);
  }, [currentPage]);

  // Fetch when search changes
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
    fetchNegocios(1, newSearch);
  };

  const handleDelete = async () => {
    if (!negocioToDelete) return;
    
    try {
      console.log(`Deleting negocio with ID: ${negocioToDelete.id_establecimiento}`);
      
      const response = await fetch(
        `${DELETE_API_URL}/${negocioToDelete.id_establecimiento}`, 
        { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar el establecimiento.");
      }
      
      const result = await response.json();
      console.log('Delete successful:', result);
      
      // Calculate if we need to go to previous page
      const isLastItemOnPage = negocios.length === 1;
      const shouldGoToPreviousPage = isLastItemOnPage && currentPage > 1;
      
      if (shouldGoToPreviousPage) {
        console.log('Going to previous page after delete');
        setCurrentPage(currentPage - 1);
        await fetchNegocios(currentPage - 1, search);
      } else {
        console.log('Refreshing current page after delete');
        await fetchNegocios(currentPage, search);
      }
      
      alert(`Establecimiento "${negocioToDelete.nombre}" eliminado con éxito.`);
    } catch (error) {
      console.error('Delete error:', error);
      alert(error instanceof Error ? error.message : "No se pudo eliminar el establecimiento.");
    } finally {
      setNegocioToDelete(null);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por nombre, categoría, colonia..."
          className="text-base-content input input-bordered input-lg flex-1 !rounded-sm w-full placeholder:text-sm sm:w-full"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={loading}
        />
        <Link href="/home/negocios/registrarNegocio">
          <button className="btn btn-primary btn-lg text-sm w-full sm:w-full rounded">
            Registrar Negocio
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className=" text-base-content loading loading-spinner loading-lg"></span>
        </div>
      ) : negocios.length === 0 ? (
        <div className="text-center py-8 text-base-content/70">
          No se encontraron establecimientos
        </div>
      ) : (
        <>
          <NegociosDesktopTable 
            negocios={negocios} 
            onDelete={(negocio) => setNegocioToDelete(negocio)} 
          />
          
          <NegociosCardView 
            negocios={negocios} 
            onDelete={(negocio) => setNegocioToDelete(negocio)} 
          />
        </>
      )}
    
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <div className="text-center text-sm text-base-content/70">
        Mostrando {negocios.length} de {totalItems} establecimientos
      </div>
      
      <DeleteConfirmationModal
        isOpen={!!negocioToDelete}
        itemName={negocioToDelete?.nombre || ''}
        onClose={() => setNegocioToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}