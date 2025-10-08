import NegociosTable from "@/componentes/NegociosTable";

export type Negocio = {
  id: number;
  nombre: string;
  categoria: string;
  correo: string;
  telefono: string;
  direccion: {
    ciudad: string;
  };
};

// Función para obtener los datos en el servidor
async function getNegociosData(): Promise<Negocio[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: 'no-store' // Obtiene datos frescos en cada carga
    });
    if (!res.ok) return [];
    
    const data = await res.json();
    
    // Transforma los datos en el servidor
    const categoriasPosibles = ['Restaurante', 'Tienda', 'Servicios', 'Salud'];
    const negociosData = data.map((u: any, index: number) => ({
      id: u.id,
      nombre: u.company.name,
      categoria: categoriasPosibles[index % categoriasPosibles.length],
      correo: u.email,
      telefono: u.phone,
      direccion: { ciudad: u.address.city },
    }));
    return negociosData;

  } catch (error) {
    console.error("Error fetching data on server:", error);
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