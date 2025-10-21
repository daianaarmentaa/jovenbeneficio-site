'use client';

import { useState, useEffect } from 'react';

type Categoria = {
  id_categoria: number;
  nombre: string;
};

type CategoriaSelectorProps = {
  value: number | '';
  onChange: (idCategoria: number) => void;
  required?: boolean;
};

export default function CategoriaSelector({ 
  value, 
  onChange, 
  required = false 
}: CategoriaSelectorProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          'https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/categorias'
        );
        
        if (!response.ok) {
          throw new Error('Error al cargar categorías');
        }
        
        const data = await response.json();
        setCategorias(data.categorias);
      } catch (err: any) {
        console.error('Error fetching categorias:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      onChange(parseInt(selectedValue));
    }
  };

  if (loading) {
    return (
      <div>
        <label className="label text-base-content">
          <span className="label-text">Categoría del negocio</span>
        </label>
        <select className="select select-bordered w-full !rounded" disabled>
          <option>Cargando categorías...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <label className="label text-base-content">
          <span className="label-text">Categoría del negocio</span>
        </label>
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="label text-base-content">
        <span className="label-text">Categoría del negocio</span>
      </label>
      <select 
        className="select select-bordered w-full !rounded px-2"
        value={value}
        onChange={handleChange}
        required={required}
      >
        <option disabled value="">Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}