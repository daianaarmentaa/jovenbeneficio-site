import NegociosTable from "@/componentes/NegociosTable";

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

// S3 bucket URL - replace with your actual S3 bucket URL
const S3_BUCKET_URL = "https://beneficiojoven-photos.s3.us-east-1.amazonaws.com";

// Función para obtener los datos del API real
async function getNegociosData(): Promise<Negocio[]> {
  try {
    const API_URL = "https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/establecimientos";
    
    const res = await fetch(API_URL, {
      cache: 'no-store', // Obtiene datos frescos en cada carga
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
    const negociosData = apiResponse.data.map((negocio) => ({
      ...negocio,
      foto: negocio.foto ? `${S3_BUCKET_URL}/${negocio.foto}` : `${S3_BUCKET_URL}/fotos_establecimientos/default-establishment.jpg`,
    }));

    return negociosData;

  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
}

export default async function NegociosPage() {
  // Obtenemos los datos antes de renderizar la página
  const initialNegocios = await getNegociosData();

  // Renderizamos el componente de cliente, pasándole los datos iniciales
  return (
    <NegociosTable initialData={initialNegocios} />
  );
}