"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function RegistroJoven() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    direccion: "",
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
        setErrors((prev) => ({
            ...prev,
            correo: emailRegex.test(value) ? "" : "Correo inválido",
        }));
    }
    if (name === "celular") {
        const phoneRegex = /^\d{10}$/; // ejemplo: 10 dígitos
        setErrors((prev) => ({
            ...prev,
            celular: phoneRegex.test(value) ? "" : "Número de celular inválido",
        }));
    }
    if (name === "password") {
        // mínimo 8 caracteres, al menos una letra y un número
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        setErrors((prev) => ({
            ...prev,
            password: passRegex.test(value)
                ? ""
                : "La contraseña debe tener mínimo 8 caracteres, al menos una letra y un número",
        }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Joven registrado con éxito");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-xl p-10 space-y-12"
      >
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Registro de Jóvenes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Completa la información para crear tu cuenta como joven.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input
              type="text"
              name="nombre"
              onChange={handleChange}
              required
              className="input input-bordered w-full !rounded" 
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Apellidos</span>
            </label>
            <input
              type="text"
              name="apellidos"
              onChange={handleChange}
              required
              className="input input-bordered w-full !rounded"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Fecha de nacimiento</span>
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              onChange={handleChange}
              required
              className="input input-bordered w-full !rounded"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">CURP</span>
            </label>
            <input
              type="text"
              name="curp"
              onChange={handleChange}
              placeholder="18 caracteres"
              required
              className="input input-bordered w-full uppercase !rounded"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">
              <span className="label-text">Dirección</span>
            </label>
            <input
              type="text"
              name="direccion"
              onChange={handleChange}
              required
              className="input input-bordered w-full !rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text">Correo</span>
            </label>
            <input
              type="email"
              name="correo"
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
              className={`input input-bordered w-full !rounded ${errors.correo ? "input-error" : "" }`}
            />
            {errors.correo && <span className="text-error text-sm">{errors.correo}</span>}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Celular</span>
            </label>
            <input
              type="tel"
              name="celular"
              onChange={handleChange}
              placeholder="10 dígitos"
              required
              className={`input input-bordered w-full !rounded ${errors.celular} ? "input-error" : "" }`}
            />
            {errors.celular && <span className="text-error text-sm">{errors.celular}</span>}
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            className={`input input-bordered w-full !rounded ${errors.password} ? "input-error" : "" }`}
          />
          {errors.password && <span className="text-error text-sm">{errors.password}</span>}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Foto de perfil
          </h2>
          <div className="flex items-center gap-6">
   
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <User className="w-20 h-20 text-gray-300 border rounded-full p-6" />
            )}

            <div className="flex-1">
              <input
                type="file"
                name="foto"
                accept="image/*"
                onChange={handleChange}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
          <button type="button" className="btn btn-ghost">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}



