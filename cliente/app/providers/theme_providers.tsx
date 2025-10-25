"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * ThemeProvider
 * -------------
 * Proveedor de contexto que envuelve la aplicación y permite:
 *   - Mantener el estado del tema actual.
 *   - Cambiar dinámicamente entre temas.
 *   - Persistir el tema en localStorage.
 *
 * @param {Object} props - Props del componente.
 * @param {React.ReactNode} props.children - Contenido que recibirá el contexto.
 * @returns {JSX.Element} Componente ThemeProvider que envuelve a los hijos.
 * @author Daiana Armenta
 */

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>('pastel'); 

  useEffect(() => {

    const savedTheme = localStorage.getItem('theme') || 'pastel';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {

    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}