"use client";
import SeccionPerfil from '@/componentes/ajustes/SeccionPerfil';
import SeccionSeguridad from '@/componentes/ajustes/SeccionSeguridad';
import SeccionPreferencias from '@/componentes/ajustes/SeccionPreferencias';
import SeccionCuenta from '@/componentes/ajustes/SeccionCuenta';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

/**
 * Página de Ajustes del usuario.
 * ---------------------------------------
 * Esta página permite al usuario autenticado gestionar su perfil,
 * seguridad, preferencias y la cuenta. Cada sección está
 * separada visualmente por líneas divisorias.
 *
 * La página está protegida mediante Auth0, asegurando que solo
 * usuarios autenticados puedan acceder.
 *
 * @function AjustesPage
 * @param {Object} props - Propiedades recibidas de Auth0.
 * @param {Object} props.user - Información del usuario autenticado.
 * @returns {JSX.Element} Página de ajustes con secciones interactivas.
 * @author Daiana Armenta
 */

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