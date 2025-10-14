// ============================================
// app/home/jovenes/page.tsx
// ============================================

import JovenesTable from "@/componentes/JovenesTable";

export type Joven = {
  id: number;
  foto: string;
  nombre: string;
  correo: string;
  folio: string;
  telefono: string;
};

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

type InitialData = {
  jovenes: Joven[];
  pagination: PaginationInfo;
};

// Función para obtener los datos en el servidor
async function getJovenesData(): Promise<InitialData> {
  try {
    const res = await fetch(
      "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/jovenes?page=1&limit=5&orderBy=id&orderDir=ASC",
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      console.error("API returned error:", res.status);
      return { jovenes: [], pagination: { page: 1, limit: 5, total: 0, total_pages: 0, has_next: false, has_prev: false } };
    }
    
    const response = await res.json();
    
    // The API returns { data: [...], pagination: {...} }
    const jovenesData = response.data.map((joven: any) => ({
      id: joven.id,
      foto: joven.foto,
      nombre: joven.nombre,
      correo: joven.correo,
      folio: joven.folio,
      telefono: joven.telefono
    }));
    
    return {
      jovenes: jovenesData,
      pagination: response.pagination
    };

  } catch (error) {
    console.error("Error fetching jóvenes data:", error);
    return { jovenes: [], pagination: { page: 1, limit: 5, total: 0, total_pages: 0, has_next: false, has_prev: false } };
  }
}

export default async function JovenesPage() {
  const initialData = await getJovenesData();
  return (
    <JovenesTable 
      initialData={initialData.jovenes}
      initialPagination={initialData.pagination}
    />
  );
}