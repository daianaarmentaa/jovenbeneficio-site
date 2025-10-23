/* Esta función se encarga de crear un componente para
 * mostrar una nav bar en la aplicación.
 * Autora: Daiana Andrea Armenta Maya
*/
"use client";

import { Bell, Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";

type NavBarProps = {
  toggleSidebar: () => void;
};

interface AdminProfile {
  id_admin: number;
  nombre: string;
  correo: string;
  rol: string;
  foto: string | null;
}

export default function NavBar({ toggleSidebar }: NavBarProps) {
  const pathname = usePathname();
  const { user, isLoading: auth0Loading } = useUser();
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const titleMap: { [key: string]: string } = {
    "/home": "Dashboard",
    "/home/jovenes": "Jóvenes",
    "/home/negocios": "Negocios",
    "/home/promociones": "Promociones",
    "/home/ajustes": "Ajustes",
    "/home/jovenes/registrarJoven": "Jóvenes",
    "/home/negocios/registrarNegocio": "Negocios",
    "/home/admins": "Administradores",
    "/home/admins/registrarAdmin": "Registro"
  };

  const title = titleMap[pathname] || "Dashboard";

  // Obtener el perfil del administrador desde tu API
  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('https://5ouqlbfg7h.execute-api.us-east-1.amazonaws.com/default/getAdmins');
        if (response.ok) {
          const data = await response.json();
          
          // Buscar el admin que coincide con el email del usuario logueado
          const currentAdmin = data.data.find((admin: AdminProfile) => 
            admin.correo === user.email
          );
          
          setAdminProfile(currentAdmin || null);
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!auth0Loading) {
      fetchAdminProfile();
    }
  }, [user, auth0Loading]);

  // Función para determinar la fuente de la imagen
  const getImageSrc = () => {
    // 1. Primero intentar con la foto de la BD
    if (adminProfile?.foto) {
      return adminProfile.foto;
    }
    
    // 2. Si no hay foto en BD, usar la de Auth0
    if (user?.picture) {
      return user.picture;
    }
    
    // 3. Si no hay ninguna, usar imagen por defecto
    return null;
  };

  const imageSrc = getImageSrc();
  const displayName = adminProfile?.nombre || user?.name || 'Usuario';

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
              {loading || auth0Loading ? (
                <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>
              ) : imageSrc ? (
                <img
                  alt={`Avatar de ${displayName}`}
                  src={imageSrc}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li className="menu-title">
              <span>{displayName}</span>
            </li>
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