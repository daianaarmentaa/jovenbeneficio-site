"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

// Tipado para el valor del contexto
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// 1. Crear el Contexto con un valor por defecto (puede ser undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Crear el Proveedor del Contexto
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>('pastel'); // Estado inicial por defecto

  useEffect(() => {
    // Al cargar, intenta leer el tema de localStorage
    const savedTheme = localStorage.getItem('theme') || 'pastel';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Cada vez que el estado 'theme' cambie, actualiza el HTML y localStorage
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

// 3. Crear el hook personalizado para consumir el contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}