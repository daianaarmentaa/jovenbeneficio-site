'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DeleteConfirmationModal from "../DeleteConfirmationModel";
import Pagination from "../Pagination";
import AdminsCardView from "./AdminsCardView";
import AdminsDesktopTable from "./adminsDeskTopTable";

/**
 * Componente: AdminsTable
 * 
 * Descripción:
 * Este componente renderiza una lista de administradores con funcionalidades completas:
 * - Búsqueda por nombre o correo.
 * - Paginación de resultados.
 * - Visualización en tabla para escritorio y en tarjetas para móviles.
 * - Eliminación de administradores con confirmación mediante modal.
 * 
 * Utiliza APIs externas para obtener y eliminar administradores, y maneja
 * estados de carga y búsqueda con debounce.
 * 
 * Autora: Daiana Armenta
 */

const API_URL = "https://5ouqlbfg7h.execute-api.us-east-1.amazonaws.com/default/getAdmins";
const DELETE_API_URL = "https://jzgk6lxhti.execute-api.us-east-1.amazonaws.com/default/deleteAdmin";

type Admin = {
  id_admin: number;
  nombre: string;
  correo: string;
  rol: string;
};

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

type Props = {
  initialData: Admin[];
  initialPagination: PaginationInfo;
};

export default function AdminsTable({ initialData, initialPagination }: Props) {
  const [admins, setAdmins] = useState<Admin[]>(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [totalPages, setTotalPages] = useState(initialPagination.total_pages);
  const [totalItems, setTotalItems] = useState(initialPagination.total);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
  const isFirstRender = useRef(true);
  const pageSize = 5;

  const fetchAdmins = async (page: number, searchQuery: string = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        orderBy: 'id_admin',
        orderDir: 'ASC'
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();

      setAdmins(data.data || []);
      setTotalPages(data.pagination?.total_pages || 0);
      setTotalItems(data.pagination?.total || 0);
      setCurrentPage(data.pagination?.page || page);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchAdmins(currentPage, search);
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchAdmins(1, search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDelete = async () => {
    if (!adminToDelete) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(DELETE_API_URL, {  // URL sin /{id}
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_admin: adminToDelete.id_admin  // Enviamos el ID en el body
        })
      });

      if (!response.ok) throw new Error("Error al eliminar el administrador.");

      const isLastItemOnPage = admins.length === 1;
      const shouldGoToPreviousPage = isLastItemOnPage && currentPage > 1;

      if (shouldGoToPreviousPage) {
        setCurrentPage(currentPage - 1);
        await fetchAdmins(currentPage - 1, search);
      } else {
        await fetchAdmins(currentPage, search);
      }

      alert(`Administrador "${adminToDelete.nombre}" eliminado con éxito.`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo eliminar.");
    } finally {
        setDeleteLoading(false);
        setAdminToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="search"
          placeholder="Buscar por nombre o correo..."
          className="input input-bordered input-lg flex-1 rounded w-full placeholder:text-sm sm:w-full text-base-content"
          value={search}
          onChange={handleSearchChange}
          disabled={loading}
        />
        <Link href="/home/admins/registrarAdmin">
          <button className="btn btn-primary btn-lg text-sm w-full sm:w-full rounded">
            Registrar Admin
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-base-content"></span>
        </div>
      ) : (
        <>
          <AdminsDesktopTable admins={admins} onDelete={setAdminToDelete} />
          <AdminsCardView admins={admins} onDelete={setAdminToDelete} />
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        onNext={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
      />

      <div className="text-center text-sm text-base-content/70">
        Mostrando {admins.length} de {totalItems} administradores
      </div>

      <DeleteConfirmationModal
        isOpen={!!adminToDelete}
        itemName={adminToDelete?.nombre || ''}
        onClose={() => setAdminToDelete(null)}
        onConfirm={handleDelete}

      />
    </div>
  );
}
