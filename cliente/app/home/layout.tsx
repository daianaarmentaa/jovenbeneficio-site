'use client'; 

import { useState } from 'react';
import Sidebar from "@/componentes/Sidebar";
import NavBar from "@/componentes/NavBar";

/**
 * DashboardLayout es un layout principal para el panel de administración.
 * 
 * Este componente envuelve la interfaz de usuario con un `Sidebar` y un `NavBar`,
 * y renderiza el contenido principal dentro del área de `main`. 
 * Proporciona la funcionalidad de abrir/cerrar la barra lateral (sidebar).
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del layout.
 * @author Daiana Armenta
 */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-base-200 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


