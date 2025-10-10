'use client'; 

import { useState } from 'react';
import Sidebar from "@/componentes/Sidebar";
import NavBar from "@/componentes/NavBar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // El estado para la visibilidad del sidebar vive aquí
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para abrir/cerrar el sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Se le pasa el estado y la función para que se muestre/oculte */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Se le pasa la función para que el botón de hamburguesa funcione */}
        <NavBar toggleSidebar={toggleSidebar} />
        
        {/* El contenido principal de la página */}
        <main className="flex-1 p-6 bg-base-200 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


