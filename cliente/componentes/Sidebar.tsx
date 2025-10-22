/* Esta función se encarga de crear un componente para
 * mostrar una barra de menú lateral que se oculta en pantallas más pequeñas
 * Autora: Daiana Andrea Armenta Maya
*/
'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import { Home, Users, Briefcase, Gift, Settings, Shield } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://y3y75wja2d.execute-api.us-east-1.amazonaws.com/default/getRole?correo=${user.email}`)
        .then(res => res.json())
        .then(data => setRol(data.rol))
        .catch(() => setRol(null));
    }
  }, [user]);

  const menuItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/home/jovenes", label: "Jóvenes", icon: Users },
    { href: "/home/negocios", label: "Negocios", icon: Briefcase },
    { href: "/home/promociones", label: "Promociones", icon: Gift },
    // Este ítem solo se muestra si el usuario es super_admin
    ...(rol === "super_admin"
      ? [{ href: "/home/admins", label: "Administradores", icon: Shield }]
      : []),
    { href: "/home/ajustes", label: "Ajustes", icon: Settings, mtAuto: true },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`
          h-screen w-60 bg-base-100 text-base-content flex flex-col
          fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 border-r border-base-300
        `}
      >
        <div className="hidden md:flex items-center px-4 h-16">
          <div className="flex">
            <span className="font-bold text-lg text-pink-400">BENEFICIO</span>
            <span className="font-light text-lg text-blue-200">JOVEN</span>
          </div>
        </div>

        <ul className="menu bg-transparent text-base-content text-sm flex-col gap-2 flex-grow px-4 mt-4">
          {menuItems.map(({ href, label, icon: Icon, mtAuto }) => (
            <li key={href} className={mtAuto ? "mt-auto" : ""}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 p-2 rounded group"
              >
                <Icon
                  className={`h-5 w-5 ${pathname === href ? "text-rose-300" : "text-base-content group-hover:text-rose-300"}`}
                />
                <span
                  className={`${pathname === href ? "text-rose-300" : "text-base-content group-hover:text-rose-300"}`}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
