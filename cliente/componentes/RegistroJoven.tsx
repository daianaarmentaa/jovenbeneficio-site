'use client';

import { useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";

export default function RegistroJoven() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    genero: "",
    direccion: {
      calle: "",
      numeroExterior: "",
      numeroInterior: "",
      colonia: "",
      codigoPostal: "",
      municipio: "",
    },
    curp: "",
    correo: "",
    celular: "",
    password: "",
    foto: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correo: "",
    celular: "",
    password:"",
    curp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue = value;

    if (name === 'curp') {
      finalValue = value.toUpperCase();
    }

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        setFormData({ ...formData, [name]: file });
        setPreview(URL.createObjectURL(file));
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
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
    if (name === "curp") {
      setErrors((prev) => ({
        ...prev,
        curp: finalValue.length !== 18 && finalValue.length > 0
          ? "El CURP debe tener 18 caracteres."
          : "",
      }));
    }

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Joven registrado con éxito");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-base-100 shadow-lg rounded-xl p-6 sm:p-10 space-y-8"
    >
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Registro de Jóvenes
        </h1>
        <p className="mt-1 text-sm text-base-content/70">
          Completa la información para crear tu cuenta como joven.
        </p>
      </div>

      {/* --- SECCIÓN 1: DATOS PERSONALES --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Datos Personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label"><span className="label-text">Nombre(s)</span></label>
            <input type="text" name="nombre" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Apellido Paterno</span></label>
            <input type="text" name="apellidoPaterno" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Apellido Materno</span></label>
            <input type="text" name="apellidoMaterno" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Fecha de nacimiento</span></label>
            <input type="date" name="fechaNacimiento" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">CURP</span></label>
            <input type="text" 
                   name="curp" 
                   onChange={handleChange} 
                   value={formData.curp} 
                   placeholder="18 caracteres" 
                   maxLength={18} required 
                   className={`input input-bordered w-full uppercase !rounded ${errors.curp ? 'input-error' : ''}`} />
                   {errors.curp && <span className="text-error text-xs mt-1">{errors.curp}</span>}
          </div>
          <div>
            <label className="label"><span className="label-text">Género</span></label>
            <select name="genero" onChange={handleChange} value= {formData.genero} required className="select select-bordered w-full !rounded">
              <option disabled value="">Selecciona una opción</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>

      {/* --- SECCIÓN 2: DIRECCIÓN --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Dirección</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label"><span className="label-text">Calle</span></label>
            <input type="text" name="direccion.calle" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Número Exterior</span></label>
            <input type="text" name="direccion.numeroExterior" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Número Interior (Opcional)</span></label>
            <input type="text" name="direccion.numeroInterior" onChange={handleChange} className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Código Postal</span></label>
            <input type="text" name="direccion.codigoPostal" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label"><span className="label-text">Colonia</span></label>
            <input type="text" name="direccion.colonia" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Municipio / Alcaldía</span></label>
            <input type="text" name="direccion.municipio" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* --- SECCIÓN 3: DATOS DE LA CUENTA --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Datos de la Cuenta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label"><span className="label-text">Correo</span></label>
            <input type="email" name="correo" onChange={handleChange} placeholder="correo@ejemplo.com" required className={`input input-bordered w-full !rounded ${errors.correo ? "input-error" : "" }`} />
            {errors.correo && <span className="text-error text-xs mt-1">{errors.correo}</span>}
          </div>
          <div>
            <label className="label"><span className="label-text">Celular</span></label>
            <input type="tel" name="celular" onChange={handleChange} placeholder="10 dígitos" required className={`input input-bordered w-full !rounded ${errors.celular ? "input-error" : "" }`} />
            {errors.celular && <span className="text-error text-xs mt-1">{errors.celular}</span>}
          </div>
        </div>
        <div>
          <label className="label"><span className="label-text">Contraseña</span></label>
          <input type="password" name="password" onChange={handleChange} required className={`input input-bordered w-full !rounded ${errors.password ? "input-error" : "" }`} />
          {errors.password && <span className="text-error text-xs mt-1">{errors.password}</span>}
        </div>
      </div>

      <div className="divider"></div>

      {/* --- SECCIÓN 4: FOTO DE PERFIL --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Foto de Perfil</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {preview ? (
            <img src={preview} alt="Vista previa" className="w-24 h-24 rounded-full object-cover border-2 border-base-300" />
          ) : (
            <User className="w-24 h-24 text-base-content/30 border-2 border-dashed border-base-300 rounded-full p-6" />
          )}
          <div className="w-full sm:flex-1">
            <input type="file" name="foto" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 5: BOTONES DE ACCIÓN --- */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-base-300 pt-6">
        <Link href="/home/jovenes">
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