"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Fondo Opcional: Gradiente o Imagen */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
      
      {/* Tarjeta de Contenido */}
      <div className="relative w-full max-w-md p-8 space-y-8 bg-base-100 rounded-lg shadow-2xl text-center">
        
        {/* 1. Logo como Protagonista */}
        <div className="flex justify-center">
          <Image 
            src="/logo.png"
            alt='Logo Beneficio Joven'
            width={250}
            height={200}
            className='rounded-full'
          />


        </div>
        
        {/* 2. Jerarquía de Texto */}
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Portal de Administradores
          </h1>
          <p className="mt-2 text-base-content/70">
            Inicia sesión para acceder a la aplicación.
          </p>
        </div>

        {/* 3. Llamado a la Acción Claro */}
        <a 
          href="/auth/login" 
          className="btn btn-primary btn-block rounded-full"
        >
          Acceder al Panel
        </a>
      </div>

      {/* 4. Detalles de Confianza en el Pie de Página */}
      <footer className="absolute bottom-4 text-center w-full text-gray-500/60 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} Beneficio Joven. Todos los derechos reservados.</p>
        <p className="font-semibold">Acceso Restringido</p>
      </footer>
    </div>
  );
}