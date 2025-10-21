import PromocionesTable from "@/componentes/PromocionesTable";

// Updated type to match API response
export type Promocion = {
  id: number;
  titulo: string;
  fecha_creacion: string;
  fecha_expiracion: string;
  estado: 'activa' | 'expirada' | 'cancelada';
  foto: string;
  id_establecimiento: number;
  nombre_establecimiento: string;
};

// API Response type
type ApiResponse = {
  data: Promocion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
};

// S3 bucket URL
const S3_BUCKET_URL = "https://beneficiojoven-photos.s3.us-east-1.amazonaws.com";

// Function to fetch promociones from API
async function getPromocionesData(): Promise<Promocion[]> {
  try {
    const API_URL = "https://listar-promociones-819994103285.us-central1.run.app";
    
    const res = await fetch(API_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error("API request failed:", res.status, res.statusText);
      return [];
    }
    
    const apiResponse: ApiResponse = await res.json();
    
    // Transform data to add full S3 URLs for photos
    const promocionesData = apiResponse.data.map((promocion) => ({
      ...promocion,
      foto: promocion.foto ? `${S3_BUCKET_URL}/${promocion.foto}` : `${S3_BUCKET_URL}/fotos_promociones/default-promo.jpg`,
    }));

    return promocionesData;

  } catch (error) {
    console.error("Error fetching promociones from API:", error);
    return [];
  }
}

export default async function PromocionesPage() {
  const initialPromociones = await getPromocionesData();

  return (
    <PromocionesTable initialData={initialPromociones} />
  );
}