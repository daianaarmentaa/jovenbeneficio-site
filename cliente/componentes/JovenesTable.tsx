'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Joven } from "../app/home/jovenes/page"; 
import DeleteConfirmationModal from "./DeleteConfirmationModel";
import Pagination from "./Pagination";
import JovenesCardView from "./JovenesCardView";
import JovenesDesktopTable from "./JovenesDesktopTable";

const API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/jovenes";

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

type Props = {
  initialData: Joven[];
  initialPagination: PaginationInfo;
};

export default function JovenesTable({ initialData, initialPagination }: Props) {
  const [jovenes, setJovenes] = useState<Joven[]>(initialData); 
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [totalPages, setTotalPages] = useState(initialPagination.total_pages);
  const [totalItems, setTotalItems] = useState(initialPagination.total);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;
  const [jovenToDelete, setJovenToDelete] = useState<Joven | null>(null);
  const isFirstRender = useRef(true);

  // Fetch data from API
  const fetchJovenes = async (page: number, searchQuery: string = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        orderBy: 'id',
        orderDir: 'ASC'
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();

      setJovenes(data.data || []);
      setTotalPages(data.pagination.total_pages);
      setTotalItems(data.pagination.total);
      setCurrentPage(data.pagination.page);
    } catch (error) {
      console.error("Error fetching jovenes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    fetchJovenes(currentPage, search);
  }, [currentPage]);

  // Fetch when search changes
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
    fetchJovenes(1, newSearch);
  };

  const handleDelete = async () => {
    if (!jovenToDelete) return;
    try {
      const response = await fetch(
        `${API_URL}/${jovenToDelete.id}`, 
        { method: 'DELETE' }
      );
      
      if (!response.ok) {
        throw new Error("Error al eliminar el joven.");
      }
      
      fetchJovenes(currentPage, search);
      alert(`Joven "${jovenToDelete.nombre}" eliminado con éxito.`);
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el registro.");
    } finally {
      setJovenToDelete(null);
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
          placeholder="Buscar por nombre o folio..."
          className="input input-bordered input-lg flex-1 !rounded-sm placeholder:text-sm"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={loading}
        />
        <Link href="/home/jovenes/registrarJoven">
          <button className="btn btn-primary btn-lg text-sm rounded">
            Registrar Joven
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <JovenesDesktopTable 
            jovenes={jovenes} 
            onDelete={(joven) => setJovenToDelete(joven)} 
          />
          
          <JovenesCardView 
            jovenes={jovenes} 
            onDelete={(joven) => setJovenToDelete(joven)} 
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
        Mostrando {jovenes.length} de {totalItems} jóvenes
      </div>
      
      <DeleteConfirmationModal
        isOpen={!!jovenToDelete}
        itemName={jovenToDelete?.nombre || ''}
        onClose={() => setJovenToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}