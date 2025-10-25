import AdminsTable from "@/componentes/admins/adminsTable";

/**
 * Obtiene los datos de administradores desde la API.
 * -----------------------------------------------
 * Realiza la petición a la API y retorna los datos de administradores
 * junto con la información de paginación.
 *
 * @async
 * @function getAdminsData
 * @returns {Promise<{data: Admin[], pagination: ApiResponse['pagination']}>} 
 *          Objeto con la lista de administradores y la paginación.
 * @author Daiana Armenta y Emiliano Plata
 */

// Los datos que se van a mostrar del administrador
export type Admin = {
  id_admin: number;
  nombre: string;
  correo: string;
  rol: string;
  foto: string;
};

// Datos de la API que va a recibir
type ApiResponse = {
  data: Admin[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
};

// Función para obtener los datos desde la API
async function getAdminsData() {
  try {
    const API_URL = "https://5ouqlbfg7h.execute-api.us-east-1.amazonaws.com/default/getAdmins"; // Reemplaza con tu endpoint real

    const res = await fetch(API_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error("API request failed:", res.status, res.statusText);
      return { data: [], pagination: { page: 1, limit: 10, total: 0, total_pages: 0 } };
    }

    const apiResponse: ApiResponse = await res.json();

    return {
      data: apiResponse.data,
      pagination: apiResponse.pagination,
    };

  } catch (error) {
    console.error("Error fetching admins from API:", error);
    return { data: [], pagination: { page: 1, limit: 10, total: 0, total_pages: 0 } };
  }
}

// Función principal que llama a la tabla
export default async function AdminsPage() {
  const { data, pagination } = await getAdminsData();

  return (
    <AdminsTable
      initialData={data}
      initialPagination={pagination}
    />
  );
}
