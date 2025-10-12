"use client"

import { useState } from "react";
import { Building } from "lucide-react";
import Link from "next/link";
import CategoriaSelector from "./CategoriaSelector";

type EstablecimientoFormData = {
  nombreNegocio: string;
  adminId: string;
  categoria: number | '';
  correo: string;
  password: string;
  telefono: string;
  direccion: {
    calle: string;
    numeroExt: string;
    numeroInt: string;
    colonia: string;
    codigoPostal: string;
    municipio: string;
  };
  logo: File | null;
};

export default function RegistrarNegocio() {
  const [formData, setFormData] = useState<EstablecimientoFormData>({
    nombreNegocio: "",
    adminId: "",
    categoria: '',
    correo: "",
    password: "",
    telefono: "",
    direccion: {
      calle: "",
      numeroExt: "",
      numeroInt: "",
      colonia: "",
      codigoPostal: "",
      municipio: "",
    },
    logo: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correo: "",
    password: "",
    telefono: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (e.target.type === 'file') {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        setFormData({ ...formData, logo: file });
        setPreview(URL.createObjectURL(file));
        return;
      }
    }
    
    const addressFields = ["calle", "numeroExt", "numeroInt", "colonia", "codigoPostal", "municipio"];
    if (addressFields.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, [name]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Validación en tiempo real
    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({ 
        ...prev, 
        correo: emailRegex.test(value) ? "" : "Correo inválido" 
      }));
    }
    
    if (name === "password") {
      const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      setErrors((prev) => ({ 
        ...prev, 
        password: passRegex.test(value) ? "" : "Mínimo 8 caracteres, una letra y un número" 
      }));
    }

    if (name === "telefono") {
      const phoneRegex = /^\d{10}$/;
      setErrors((prev) => ({ 
        ...prev, 
        telefono: phoneRegex.test(value) ? "" : "Número de teléfono inválido (10 dígitos)" 
      }));
    }
  };

  // Función para convertir archivo a Base64
  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validaciones
    if (!formData.categoria) {
      setFormError("Por favor, selecciona una categoría para el negocio.");
      return;
    }

    if (errors.correo || errors.password || errors.telefono) {
      setFormError("Por favor, corrige los errores en el formulario.");
      return;
    }

    setIsLoading(true);

    try {
      // Preparar payload
      const payload: any = {
        nombre: formData.nombreNegocio,
        id_categoria: formData.categoria,
        id_admin: parseInt(formData.adminId), // Convertir a número
        calle: formData.direccion.calle,
        colonia: formData.direccion.colonia,
        codigo_postal: formData.direccion.codigoPostal,
        municipio: formData.direccion.municipio,
        numero_ext: formData.direccion.numeroExt,
        numero_int: formData.direccion.numeroInt || null,
        numero_de_telefono: formData.telefono,
      };

      // Convertir logo a Base64 si existe
      if (formData.logo) {
        const logoBase64 = await toBase64(formData.logo);
        payload.foto = logoBase64;
      } else {
        payload.foto = null;
      }

      const API_ENDPOINT = 'https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/establecimiento';

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ocurrió un error en el servidor.');
      }

      // Éxito
      alert('¡Establecimiento registrado con éxito!');
      // Opcional: Redirigir o limpiar formulario
      // window.location.href = '/home/negocios';
      
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);
      setFormError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-base-100 shadow-lg rounded-xl p-6 sm:p-10 space-y-8"
    >
      {/* Encabezado */}
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Registro de Negocios
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Completa la información para crear la cuenta del negocio.
        </p>
      </div>

      {/* Información General */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Información General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="label">
              <span className="label-text">Nombre del negocio</span>
            </label>
            <input 
              type="text" 
              name="nombreNegocio" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">ID del Admin que registra</span>
            </label>
            <input 
              type="number" 
              name="adminId" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded"
              placeholder="Ej: 1"
            />
          </div>

          <div>
            <CategoriaSelector
              value={formData.categoria}
              onChange={(id) => setFormData({ ...formData, categoria: id })}
              required
            />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Datos de Contacto */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Datos de Contacto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text">Correo del negocio</span>
            </label>
            <input 
              type="email" 
              name="correo" 
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.correo ? 'input-error' : ''}`}
              placeholder="negocio@ejemplo.com"
            />
            {errors.correo && <span className="text-error text-xs mt-1">{errors.correo}</span>}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Teléfono</span>
            </label>
            <input 
              type="tel" 
              name="telefono" 
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.telefono ? 'input-error' : ''}`}
              placeholder="10 dígitos"
              maxLength={10}
            />
            {errors.telefono && <span className="text-error text-xs mt-1">{errors.telefono}</span>}
          </div>

          <div className="sm:col-span-2">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.password ? 'input-error' : ''}`}
            />
            {errors.password && <span className="text-error text-xs mt-1">{errors.password}</span>}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Dirección */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Dirección del Negocio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label">
              <span className="label-text">Calle</span>
            </label>
            <input 
              type="text" 
              name="calle" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Número exterior</span>
            </label>
            <input 
              type="text" 
              name="numeroExt" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Número interior (Opcional)</span>
            </label>
            <input 
              type="text" 
              name="numeroInt" 
              onChange={handleChange} 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Código Postal</span>
            </label>
            <input 
              type="text" 
              name="codigoPostal" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label">
              <span className="label-text">Colonia</span>
            </label>
            <input 
              type="text" 
              name="colonia" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label">
              <span className="label-text">Municipio</span>
            </label>
            <input 
              type="text" 
              name="municipio" 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Logo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Logo del Negocio (Opcional)</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {preview ? (
            <img 
              src={preview} 
              alt="Vista previa del logo" 
              className="w-24 h-24 rounded-full object-cover border-2 border-base-300" 
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center bg-base-200">
              <Building className="w-12 h-12 text-base-content/30" />
            </div>
          )}
          <div className="w-full sm:flex-1">
            <input 
              type="file" 
              name="logo" 
              accept="image/*" 
              onChange={handleChange} 
              className="file-input file-input-bordered w-full" 
            />
            <p className="text-xs text-base-content/60 mt-2">
              Sube una imagen (JPG, PNG, etc.) para el logo.
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {formError && (
        <div className="text-center text-error p-2 bg-error/20 rounded-md">
          {formError}
        </div>
      )}

      {/* Botones */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-base-300 pt-6">
        <Link href="/home/negocios">
          <button 
            type="button" 
            className="btn btn-ghost rounded w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancelar
          </button>
        </Link>
        <button 
          type="submit" 
          className="btn btn-primary rounded w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner"></span> : 'Registrar Negocio'}
        </button>
      </div>
    </form>
  );
}