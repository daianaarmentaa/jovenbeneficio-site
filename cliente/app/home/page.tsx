'use client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardGeneral from '@/componentes/dashboard/DashboardGeneral';

/**
 * Página principal del dashboard de administradores.
 * --------------------------------------------------
 * Protegida mediante Auth0 (`withPageAuthRequired`), asegura que solo
 * usuarios autenticados puedan acceder. Renderiza el componente
 * `DashboardGeneral` pasando la información del usuario.
 *
 * @function DashboardPage
 * @param {Object} props - Props de la página proporcionadas por Auth0
 * @param {any} props.user - Información del usuario autenticado
 * @returns {JSX.Element} Componente principal del dashboard
 * @author Daiana Armenta
 */


export default withPageAuthRequired(function DashboardPage({ user }) {
  return <DashboardGeneral user={user} />;
});