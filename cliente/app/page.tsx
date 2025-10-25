"use client";
import Image from 'next/image';
/**
 * Página: Bienvenida
 * --------------------
 * Página principal de la aplicación para administradores.
 * Muestra el logo, título, descripción y un botón para iniciar sesión.
 *
 * @returns {JSX.Element} Retorna la estructura de la página de inicio.
 * @author Daiana Armenta
 */

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
    
      <div className="relative w-full max-w-md p-8 space-y-8 bg-base-100 rounded-lg shadow-2xl text-center">
        
        <div className="flex justify-center">
          <Image 
            src="/logo.png"
            alt='Logo Beneficio Joven'
            width={250}
            height={200}
            className='rounded-full'
          />


        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Portal de Administradores
          </h1>
          <p className="mt-2 text-base-content/70">
            Inicia sesión para acceder a la aplicación.
          </p>
        </div>

        <a 
          href="/auth/login" 
          className="btn btn-primary btn-block rounded-full"
        >
          Acceder al Panel
        </a>
      </div>

      <footer className="absolute bottom-4 text-center w-full text-gray-500/60 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} Beneficio Joven. Todos los derechos reservados.</p>
        <p className="font-semibold">Acceso Restringido</p>
      </footer>
    </div>
  );
}