import NegociosTable from "@/componentes/tablaNegocios/NegociosTable";

// Updated type to match API response
export type Negocio = {
  id: number;
  nombre_establecimiento: string;
  nombre_contacto_completo: string;
  foto: string;
  colonia: string;
  correo: string;
  telefono: string;
  categoria: string;
  fecha_registro: string;
};

// API Response type
type ApiResponse = {
  data: Negocio[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
};

// Función para obtener los datos del API real
async function getNegociosData() {
  try {
    const API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/establecimientos?page=1&limit=5&orderBy=id&orderDir=ASC";
    
    const res = await fetch(API_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error("API request failed:", res.status, res.statusText);
      return { 
        data: [], 
        pagination: { 
          page: 1, 
          limit: 5, 
          total: 0, 
          total_pages: 0,
          has_next: false,
          has_prev: false
        } 
      };
    }
    
    const apiResponse: ApiResponse = await res.json();
    
    // ✅ Lambda now returns complete presigned URLs, so NO transformation needed
    // Just use the data as-is
    return {
      data: apiResponse.data,
      pagination: apiResponse.pagination,
    };

  } catch (error) {
    console.error("Error fetching negocios from API:", error);
    return { 
      data: [], 
      pagination: { 
        page: 1, 
        limit: 5, 
        total: 0, 
        total_pages: 0,
        has_next: false,
        has_prev: false
      } 
    };
  }
}

export default async function NegociosPage() {
  const { data, pagination } = await getNegociosData();

  return (
    <NegociosTable 
      initialData={data} 
      initialPagination={pagination}
    />
  );
}