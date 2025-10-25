import JovenesTable from "@/componentes/tablaJovenes/JovenesTable";

/**
 * Función que obtiene los datos de los jóvenes desde la API.
 * @async
 * @function getJovenesData
 * @returns {Promise<{data: Joven[], pagination: ApiResponse['pagination']}>} 
 *          Datos de jóvenes y paginación.
 * @author Daiana Armenta y Emiliano Plata
 */

//Los datos que se van a mostrar del joven
export type Joven = {
  id: number;
  nombre: string;
  correo: string;
  folio: string;
  telefono: string;
  foto: string;
};


// Datos de la api que va a recibir 
type ApiResponse = {
  data: Joven[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
};

//funcion para poder jalar los datos de la api
async function getJovenesData() {
  try {
    const API_URL = "https://listar-joven-819994103285.us-central1.run.app";
    
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
    console.error("Error fetching jovenes from API:", error);
    return { data: [], pagination: { page: 1, limit: 10, total: 0, total_pages: 0 } };
  }
}


//Funcion principal que llama a una funcion
export default async function JovenesPage() {
  const { data, pagination } = await getJovenesData();

  return (
    <JovenesTable 
      initialData={data} 
      initialPagination={pagination}
    />
  );
}