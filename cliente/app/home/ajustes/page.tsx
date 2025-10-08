import SeccionPerfil from '@/componentes/SeccionPerfil';
import SeccionSeguridad from '@/componentes/SeccionSeguridad';
import SeccionPreferencias from '@/componentes/SeccionPreferencias';
import SeccionCuenta from '@/componentes/SeccionCuenta';

export default function AjustesPage() {
  return (
    // Contenedor principal
    <div className="flex flex-col gap-12 p-4">
      <SeccionPerfil />
      <div className="w-full h-px bg-base-300 my-6"></div> 
      
      <SeccionSeguridad />
      <div className="w-full h-px bg-base-300 my-6"></div> 
      
      <SeccionPreferencias />
      
      <div className="w-full h-px bg-base-300 my-6"></div> 
      
      <SeccionCuenta />
    </div>
  );
}