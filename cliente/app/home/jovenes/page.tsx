import JovenesTable from "@/componentes/JovenesTable";

export type Joven = {
  id: number;
  nombre: string;
  correo: string;
  folio: string;
  telefono: string;
  foto: string;
};

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

async function getJovenesData() {
  try {
    const API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/jovenes?page=1&limit=5&orderBy=id&orderDir=ASC";
    
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
    
    // ✅ Lambda now returns complete presigned URLs, so NO transformation needed
    // Just use the data as-is
    return {
      data: apiResponse.data,
      pagination: apiResponse.pagination,
    };

  } catch (error) {
    console.error("Error fetching jovenes from API:", error);
    return { data: [], pagination: { page: 1, limit: 10, total: 0, total_pages: 0 } };
  }
}

export default async function JovenesPage() {
  const { data, pagination } = await getJovenesData();

  return (
    <JovenesTable 
      initialData={data} 
      initialPagination={pagination}
    />
  );
}