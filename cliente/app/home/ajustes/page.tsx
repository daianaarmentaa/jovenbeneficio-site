"use client";
import SeccionPerfil from '@/componentes/ajustes/SeccionPerfil';
import SeccionSeguridad from '@/componentes/ajustes/SeccionSeguridad';
import SeccionPreferencias from '@/componentes/ajustes/SeccionPreferencias';
import SeccionCuenta from '@/componentes/ajustes/SeccionCuenta';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function AjustesPage({ user }) {
  return (
    // Contenedor principal
    <div className="flex flex-col gap-12 p-4 text-base-content">
      <SeccionPerfil user={user} />
      <div className="w-full h-px bg-base-100 my-6"></div> 
      
      <SeccionSeguridad />
      <div className="w-full h-px bg-base-100 my-6"></div> 
      
      <SeccionPreferencias />
      
      <div className="w-full h-px bg-base-100 my-6"></div> 
      
      <SeccionCuenta />
    </div>
  )
});