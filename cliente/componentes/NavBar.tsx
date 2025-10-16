/* Esta función se encarga de crear un componente para
 * mostrar una nav bar en la aplicación.
 * Autora: Daiana Andrea Armenta Maya
*/
"use client";

import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavBarProps = {
  toggleSidebar: () => void;
};

export default function NavBar({ toggleSidebar }: NavBarProps) {
  const pathname = usePathname();

  const titleMap: { [key: string]: string } = {
    "/home": "Dashboard",
    "/home/jovenes": "Jóvenes",
    "/home/negocios": "Negocios",
    "/home/promociones": "Promociones",
    "/home/ajustes": "Ajustes",
    "/home/jovenes/registrarJoven": "Jóvenes",
    "/home/negocios/registrarNegocio": "Negocios",
  };

  const title = titleMap[pathname] || "Dashboard";

  return (
    <div className="navbar bg-base-200 px-4 border-b border-base-300">
      <div className="flex-1">
        <button onClick={toggleSidebar} className="btn btn-ghost btn-circle md:hidden">
          <Menu className="w-5 h-5 text-base-content" />
        </button>
        
        <span className="text-xl text-base-content font-semibold ml-2">{title}</span>
      </div>

      <div className="flex-none">

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="w-5 h-5 text-base-content"></Bell>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </div>
        </div>
        
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
            <li className="text-base-content">
              <Link href="/home/ajustes">
                Perfil
              </Link>
            </li>
            <li>
              <a href="/auth/logout" className="btn-sm btn-ghost text-base-content">
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}