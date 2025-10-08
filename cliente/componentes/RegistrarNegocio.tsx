"use client"

import { useState } from "react";
import { Building } from "lucide-react";
import Link from "next/link";

export default function RegistrarNegocio() {
  const [formData, setFormData] = useState({
    nombreNegocio: "",
    adminId: "",
    categoria: "",
    correo: "",      // Campo para el correo del negocio
    password: "",    // Campo para la contraseña
    direccion: {
      calle: "",
      numeroExt: "",
      numeroInt: "",
      colonia: "",
      codigoPostal: "",
      municipio: "",
    },
    logo: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target.type === 'file') {
      const files = (e.target as HTMLInputElement).files;
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

    // --- Validación en tiempo real ---
    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({ ...prev, correo: emailRegex.test(value) ? "" : "Correo inválido" }));
    }
    if (name === "password") {
      const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      setErrors((prev) => ({ ...prev, password: passRegex.test(value) ? "" : "Mínimo 8 caracteres, una letra y un número" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoria) {
      alert("Por favor, selecciona una categoría para el negocio.");
      return;
    }
    // Verificar que no haya errores antes de enviar
    if (errors.correo || errors.password) {
      alert("Por favor, corrige los errores en el formulario.");
      return;
    }
    console.log("Datos de Negocio enviados:", formData);
    alert("Negocio registrado con éxito");
  };

  const categorias = ["Belleza", "Entretenimiento", "Comida", "Salud", "Educación", "Moda", "Servicios"];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-base-100 shadow-lg rounded-xl p-6 sm:p-10 space-y-8"
    >
      {/* --- Encabezado --- */}
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Registro de Negocios
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Completa la información para crear la cuenta del negocio.
        </p>
      </div>

      {/* --- Información General y Credenciales --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="label"><span className="label-text">Nombre del negocio</span></label>
          <input type="text" name="nombreNegocio" onChange={handleChange} required className="input input-bordered w-full !rounded" />
        </div>
        <div>
          <label className="label"><span className="label-text">ID del Admin que registra</span></label>
          <input type="text" name="adminId" onChange={handleChange} required className="input input-bordered w-full !rounded" />
        </div>
        <div>
          <label className="label"><span className="label-text">Categoría del negocio</span></label>
          <select name="categoria" onChange={handleChange} required className="select select-bordered w-full !rounded" defaultValue="">
            <option value="" disabled>Selecciona una categoría</option>
            {categorias.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
        {/* --- NUEVOS CAMPOS DE CORREO Y CONTRASEÑA --- */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label"><span className="label-text">Correo del negocio</span></label>
            <input type="email" name="correo" onChange={handleChange} required className={`input input-bordered w-full !rounded ${errors.correo ? 'input-error' : ''}`} />
            {errors.correo && <span className="text-error text-xs mt-1">{errors.correo}</span>}
          </div>
          <div>
            <label className="label"><span className="label-text">Contraseña</span></label>
            <input type="password" name="password" onChange={handleChange} required className={`input input-bordered w-full !rounded ${errors.password ? 'input-error' : ''}`} />
            {errors.password && <span className="text-error text-xs mt-1">{errors.password}</span>}
          </div>
        </div>
      </div>
      
      {/* --- Sección de Dirección --- */}
      <div className="space-y-6 border-t border-base-300 pt-6">
        <h2 className="text-lg font-semibold text-base-content">Dirección del Negocio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="sm:col-span-2">
            <label className="label"><span className="label-text">Calle</span></label>
            <input type="text" name="calle" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Número exterior</span></label>
            <input type="text" name="numeroExt" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Número interior (Opcional)</span></label>
            <input type="text" name="numeroInt" onChange={handleChange} className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Colonia</span></label>
            <input type="text" name="colonia" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Código Postal</span></label>
            <input type="text" name="codigoPostal" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div className="sm:col-span-2">
            <label className="label"><span className="label-text">Municipio</span></label>
            <input type="text" name="municipio" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
        </div>
      </div>

      {/* --- Sección de Logo --- */}
      <div className="space-y-4 border-t border-base-300 pt-6">
        <h2 className="text-lg font-semibold text-base-content">Logo del Negocio</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {preview ? (
            <img src={preview} alt="Vista previa del logo" className="w-24 h-24 rounded-full object-cover border-2 border-base-300" />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center bg-base-200">
              <Building className="w-12 h-12 text-base-content/30" />
            </div>
          )}
          <div className="w-full sm:flex-1">
            <input type="file" name="logo" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
             <p className="text-xs text-base-content/60 mt-2">Sube una imagen (JPG, PNG, etc.) para el logo.</p>
          </div>
        </div>
      </div>

      {/* --- Botones de Acción --- */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-base-300 pt-6">
        <Link href="/home/negocios">
          <button type="button" className="btn btn-ghost rounded w-full sm:w-auto">
            Cancelar
          </button>
        </Link>
        <button type="submit" className="btn btn-primary rounded w-full sm:w-auto">
          Registrar Negocio
        </button>
      </div>
    </form>
  );
}