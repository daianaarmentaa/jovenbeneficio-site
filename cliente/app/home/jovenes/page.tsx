import JovenesTable from "@/componentes/tablaJovenes/JovenesTable";

export type Joven = {
  id: number;
  name: string;
  email: string;
  phone: string;
  folio: string; 
};

// Función para obtener los datos en el servidor
async function getJovenesData(): Promise<Joven[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    
    const data = await res.json();

    const jovenesData = data.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      folio: `BJ-${String(user.id).padStart(3, '0')}`,
    }));
    return jovenesData;

  } catch (error) {
    console.error("Error fetching data on server:", error);
    return [];
  }
}
export default async function JovenesPage() {
  const initialJovenes = await getJovenesData();
  return (
    <JovenesTable initialData={initialJovenes} />
  );
}