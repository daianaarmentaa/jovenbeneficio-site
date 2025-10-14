
'use client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardGeneral from '@/componentes/dashboard/DashboardGeneral' // Importa tu componente


export default withPageAuthRequired(function DashboardPage({ user }) {
  return <DashboardGeneral user={user} />;
});