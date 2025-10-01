'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, Gift, Settings } from "lucide-react";

// Sidebar Component
export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/jovenes", label: "Jóvenes", icon: Users },
    { href: "/negocios", label: "Negocios", icon: Briefcase },
    { href: "/promociones", label: "Promociones", icon: Gift },
    { href: "/ajustes", label: "Ajustes", icon: Settings, mtAuto: true },
  ];

  return (
    <div className="h-screen w-60 bg-base-100 text-black flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-15 h-15 bg-base relative">
          <Image
            src="/logo.png"
            alt="Logo Beneficio Joven"
            fill
            className="object-cover"
          />
        </div>

      </div>

      {/* Menu */}
      <ul className="menu bg-transparent text-sm flex flex-col gap-2">
        {menuItems.map(({ href, label, icon: Icon, mtAuto }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className={mtAuto ? "mt-auto" : ""}>
              <Link
                href={href}
                className="flex items-center gap-2 p-2 rounded group"
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-rose-300" : "text-black group-hover:text-rose-300"
                  }`}
                />
                <span
                  className={`${
                    isActive ? "text-rose-300" : "text-black group-hover:text-rose-300"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}



