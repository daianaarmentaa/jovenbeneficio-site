// app/dashboard/page.tsx
'use client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardGeneral from '@/componentes/DashboardGeneral' // Importa tu componente

// 1. withPageAuthRequired envuelve ESTA página y le da el objeto 'user'.
export default withPageAuthRequired(function DashboardPage({ user }) {
  
  // 2. Esta página renderiza tu componente de dashboard...
  //    ...y le pasa el objeto 'user' que recibió.
  return <DashboardGeneral user={user} />;
});