'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Joven } from "../../app/home/jovenes/page"; 
import DeleteConfirmationModal from "../DeleteConfirmationModel";
import Pagination from "../Pagination";
import JovenesCardView from "./JovenesCardView";
import JovenesDesktopTable from "./JovenesDesktopTable";

const API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/jovenes";
const DELETE_API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/jovenesDelete";

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
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        setJovenes(data.data);
        setTotalPages(data.pagination?.total_pages || 0);
        setTotalItems(data.pagination?.total || 0);
        setCurrentPage(data.pagination?.page || page);
        
        console.log(`Loaded ${data.data.length} jóvenes for page ${page}`);
      } else {
        console.error('Invalid data structure:', data);
        setJovenes([]);
      }
    } catch (error) {
      console.error("Error fetching jovenes:", error);
      setJovenes([]);
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
      console.log('📊 Initial render with', initialData.length, 'jóvenes');
      return;
    }
    
    console.log('🔄 Fetching page:', currentPage);
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
      console.log(`🗑️ Deleting joven with ID: ${jovenToDelete.id}`);
      
      // ✅ USE THE CORRECT DELETE ENDPOINT
      const response = await fetch(
        `${DELETE_API_URL}/${jovenToDelete.id}`, 
        { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar el joven.");
      }
      
      const result = await response.json();
      console.log('✅ Delete successful:', result);
      
      // Calculate if we need to go to previous page
      // If we're deleting the last item on the current page and we're not on page 1
      const isLastItemOnPage = jovenes.length === 1;
      const shouldGoToPreviousPage = isLastItemOnPage && currentPage > 1;
      
      if (shouldGoToPreviousPage) {
        // Go to previous page
        console.log('📄 Going to previous page after delete');
        setCurrentPage(currentPage - 1);
        await fetchJovenes(currentPage - 1, search);
      } else {
        // Refresh the current page
        console.log('🔄 Refreshing current page after delete');
        await fetchJovenes(currentPage, search);
      }
      
      alert(`Joven "${jovenToDelete.nombre}" eliminado con éxito.`);
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert(error instanceof Error ? error.message : "No se pudo eliminar el registro.");
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
          className="input input-bordered input-lg flex-1 rounded w-full placeholder:text-sm sm:w-full text-base-content"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={loading}
        />
        <Link href="/home/jovenes/registrarJoven">
          <button className="btn btn-primary btn-lg text-sm w-full sm:w-full rounded">
            Registrar Joven
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="text-base-content loading loading-spinner loading-lg"></span>
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