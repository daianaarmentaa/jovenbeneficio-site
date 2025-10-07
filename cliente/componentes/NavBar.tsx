"use client"; // 1. Necesario para usar hooks como usePathname

import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation"; // 2. Importa el hook

type NavBarProps = {
  toggleSidebar: () => void;
};

export default function NavBar({ toggleSidebar }: NavBarProps) {
  const pathname = usePathname();

  // 3. Mapeo de rutas a los títulos que quieres mostrar
  const titleMap: { [key: string]: string } = {
    "/home": "Dashboard",
    "/home/jovenes": "Jóvenes",
    "/home/negocios": "Negocios",
    "/home/promociones": "Promociones",
    "/home/ajustes": "Ajustes",
    // --- Agrega aquí nuevas rutas y títulos en el futuro ---
    "/home/jovenes/registrarJoven": "Jóvenes",
    "/home/negocios/registrarNegocio": "Negocios",
  };

  // 4. Determina el título actual, si no lo encuentra, usa "Dashboard"
  const title = titleMap[pathname] || "Dashboard";

  return (
    <div className="navbar bg-base-200 px-4 border-b border-base-300">
      <div className="flex-1">
        <button onClick={toggleSidebar} className="btn btn-ghost btn-circle md:hidden">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* 5. Muestra el título dinámico */}
        <span className="text-xl font-bold ml-2">{title}</span>
      </div>

      <div className="flex-none">
        {/* Notificaciones */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="w-5 h-5"></Bell>
              <span className="badge badge-xs badge-info indicator-item"></span>
            </div>
          </div>
        </div>
        
        {/* Avatar del Usuario */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar de usuario"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Perfil
              </a>
            </li>
            <li><a>Ajustes</a></li>
            <li><a>Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}