"use client"

import { useState } from "react";
import { Building } from "lucide-react"; // Usamos un ícono más apropiado
import Link from "next/link";

export default function RegistrarNegocio() {
  const [formData, setFormData] = useState({
    nombreNegocio: "",
    nombreEncargado: "",
    direccion: "",
    correo: "",
    celular: "",
    password: "",
    logo: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correo: "",
    celular: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({ ...prev, correo: emailRegex.test(value) ? "" : "Correo inválido" }));
    }
    if (name === "celular") {
      const phoneRegex = /^\d{10}$/;
      setErrors((prev) => ({ ...prev, celular: phoneRegex.test(value) ? "" : "Número de celular inválido" }));
    }
    if (name === "password") {
      const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      setErrors((prev) => ({ ...prev, password: passRegex.test(value) ? "" : "Mínimo 8 caracteres, una letra y un número" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de Negocio enviados:", formData);
    alert("Negocio registrado con éxito");
  };

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

      {/* --- Campos del Formulario Corregidos --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label"><span className="label-text">Nombre del negocio</span></label>
          <input type="text" name="nombreNegocio" onChange={handleChange} required className="input input-bordered w-full !rounded" />
        </div>
        <div>
          <label className="label"><span className="label-text">Nombre del encargado/a</span></label>
          <input type="text" name="nombreEncargado" onChange={handleChange} required className="input input-bordered w-full !rounded" />
        </div>
        <div className="sm:col-span-2">
          <label className="label"><span className="label-text">Dirección</span></label>
          <input type="text" name="direccion" onChange={handleChange} required className="input input-bordered w-full !rounded" />
        </div>
        <div>
          <label className="label"><span className="label-text">Correo</span></label>
          <input type="email" name="correo" onChange={handleChange} required className={`input input-bordered w-full !rounded ${errors.correo ? 'input-error' : ''}`} />
          {errors.correo && <span className="text-error text-xs mt-1">{errors.correo}</span>}
        </div>
        <div>
          <label className="label"><span className="label-text">Celular</span></label>
          <input type="tel" name="celular" onChange={handleChange} required className={`input input-bordered w-full !rounded ${errors.celular ? 'input-error' : ''}`} />
          {errors.celular && <span className="text-error text-xs mt-1">{errors.celular}</span>}
        </div>
        <div className="sm:col-span-2">
          <label className="label"><span className="label-text">Contraseña</span></label>
          <input type="password" name="password" onChange={handleChange} required className={`input input-bordered w-full !rounded ${errors.password ? 'input-error' : ''}`} />
          {errors.password && <span className="text-error text-xs mt-1">{errors.password}</span>}
        </div>
      </div>

      {/* --- Sección de Logo --- */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-base-content">Logo del Negocio</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {preview ? (
            <img src={preview} alt="Vista previa del logo" className="w-24 h-24 rounded-full object-cover border-2 border-base-300" />
          ) : (
            <div className="w-18 h-18 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center">
              <Building className="w-12 h-12 text-base-content/30" />
            </div>
          )}
          <div className="w-full sm:flex-1">
            <input type="file" name="logo" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
          </div>
        </div>
      </div>

      {/* --- Botones de Acción --- */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-base-300 pt-6">
        <Link href="/negocios">
          <button type="button" className="btn btn-ghost rounded w-full sm:w-auto">
            Cancelar
          </button>
        </Link>
        <button type="submit" className="btn btn-primary rounded w-full sm:w-auto">
          Registrar
        </button>
      </div>
    </form>
  );
}