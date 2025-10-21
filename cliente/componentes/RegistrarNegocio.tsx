/* Esta función se encarga de crear un componente para
 * mostrar un formulario para el registro de los negocios
 * Autora: Daiana Andrea Armenta Maya y Emiliano Plata
*/
"use client"

import { useState } from "react";
import { Building } from "lucide-react";
import Link from "next/link";
import CategoriaSelector from "./CategoriaSelector";

type EstablecimientoFormData = {
  nombreNegocio: string;
  adminId: string;
  categoria: number | '';
  // Contact person info (encrypted)
  nombreContacto: string;
  apellidoPaternoContacto: string;
  apellidoMaternoContacto: string;
  correoContacto: string;
  telefonoContacto: string;
  password: string;
  // Public info (not encrypted)
  correoPublico: string;
  telefonoPublico: string;
  direccion: {
    calle: string;
    numeroExt: string;
    numeroInt: string;
    colonia: string;
    codigoPostal: string;
    municipio: string;
    estado: string;
  };
  logo: File | null;
};

export default function RegistrarNegocio() {
  const [formData, setFormData] = useState<EstablecimientoFormData>({
    nombreNegocio: "",
    adminId: "",
    categoria: '',
    nombreContacto: "",
    apellidoPaternoContacto: "",
    apellidoMaternoContacto: "",
    correoContacto: "",
    telefonoContacto: "",
    password: "",
    correoPublico: "",
    telefonoPublico: "",
    direccion: {
      calle: "",
      numeroExt: "",
      numeroInt: "",
      colonia: "",
      codigoPostal: "",
      municipio: "",
      estado: ""
    },
    logo: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correoContacto: "",
    correoPublico: "",
    password: "",
    telefonoContacto: "",
    telefonoPublico: "",
    codigoPostal:"",
  });

  const checkPasswordStrength = (password: string) => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++; // Mayúsculas
  if (/[a-z]/.test(password)) score++; // Minúsculas
  if (/[0-9]/.test(password)) score++; // Números
  if (/[!@#$%^&*]/.test(password)) score++; // Caracteres especiales

  if (password.length === 0) return { message: '', level: 'none' };
  if (password.length < 8) return { message: 'Debe tener al menos 8 caracteres.', level: 'invalid' };
  
  switch (score) {
    case 0:
    case 1:
    case 2:
      return { message: 'Contraseña muy débil', level: 'weak' };
    case 3:
      return { message: 'Contraseña débil', level: 'weak' };
    case 4:
      return { message: 'Contraseña media', level: 'medium' };
    case 5:
      return { message: 'Contraseña fuerte', level: 'strong' };
    case 6:
      return { message: 'Contraseña muy fuerte', level: 'strong' };
    default:
      return { message: '', level: 'none' };
  }
};
const [passwordStrength, setPasswordStrength] = useState('none');

const [isLoading, setIsLoading] = useState(false);
const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    
    const addressFields = ["calle", "numeroExt", "numeroInt", "colonia", "codigoPostal", "municipio", "estado"];
    if (addressFields.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, [name]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Validación en tiempo real
    if (name === "correoContacto" || name === "correoPublico") {
      const emailRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setErrors((prev) => ({ 
        ...prev, 
        [name]: emailRegex.test(value) ? "" : "Correo inválido" 
      }));
    }
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength.level); // Actualiza el nivel para la barra visual
      setErrors((prev) => ({ 
        ...prev, 
        password: strength.message 
      }));
    }

    if (name === "telefonoContacto" || name === "telefonoPublico") {
      const phoneRegex = /^\d{10}$/;
      setErrors((prev) => ({ 
        ...prev, 
        [name]: phoneRegex.test(value) ? "" : "Número de teléfono inválido (10 dígitos)" 
      }));
    }
    if (name === "direccion.codigoPostal") {
      const cpRegex = /^(?!(\d)\1{4})\d{5}$/;
      setErrors((prev) => ({
        ...prev,
        codigoPostal: (cpRegex.test(value) || value.length === 0)
        ? ""
        : "Ingresa un formato válido para un código postal.",
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

    setIsLoading(true);

    try {
      // Convertir logo a Base64 si existe
      let fotoBase64 = "";
      if (formData.logo) {
        fotoBase64 = await toBase64(formData.logo);
      }

      // Preparar payload según el formato esperado por el Lambda
      const payload = {
        nombreEstablecimiento: formData.nombreNegocio,
        nombreContacto: formData.nombreContacto,
        apellidoPaternoContacto: formData.apellidoPaternoContacto,
        apellidoMaternoContacto: formData.apellidoMaternoContacto || undefined,
        correoContacto: formData.correoContacto,
        telefonoContacto: formData.telefonoContacto,
        password: formData.password,
        idCategoria: Number(formData.categoria),
        idAdmin: Number(formData.adminId),
        foto: fotoBase64,
        direccion: {
          calle: formData.direccion.calle,
          colonia: formData.direccion.colonia,
          codigoPostal: formData.direccion.codigoPostal,
          municipio: formData.direccion.municipio,
          numeroExterior: formData.direccion.numeroExt,
          numeroInterior: formData.direccion.numeroInt || undefined,
          estado: formData.direccion.estado
        },
        correoPublico: formData.correoPublico || formData.correoContacto,
        telefonoPublico: formData.telefonoPublico || undefined,
      };

      const API_ENDPOINT = 'https://registro-establecimiento-819994103285.us-central1.run.app ';

      console.log('Sending payload:', payload);

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
      alert(`¡Establecimiento "${result.nombre}" registrado con éxito! ID: ${result.id}`);
      
      // Opcional: Redirigir después de registro exitoso
      window.location.href = '/home/negocios';
      
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);
      setFormError(error.message || "Error al registrar el establecimiento. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-base-100 shadow-lg rounded-xl p-6 sm:p-10 space-y-8 text-base-content"
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
              <span className="label-text text-base-content">Nombre del negocio</span>
            </label>
            <input 
              type="text" 
              name="nombreNegocio" 
              value={formData.nombreNegocio}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
              placeholder="Ej: Restaurante El Buen Sabor"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">ID del Admin que registra</span>
            </label>
            <input 
              type="number" 
              name="adminId" 
              value={formData.adminId}
              onChange={handleChange} 
              required
              min="0"
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

      {/* Datos de la Persona de Contacto */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Datos de la Persona de Contacto (Privados)</h2>
        <p className="text-sm text-base-content/70">Esta información será encriptada por seguridad.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text text-base-content">Nombre</span>
            </label>
            <input 
              type="text" 
              name="nombreContacto" 
              value={formData.nombreContacto}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded"
              placeholder="Ej: María"
            />
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Apellido Paterno</span>
            </label>
            <input 
              type="text" 
              name="apellidoPaternoContacto" 
              value={formData.apellidoPaternoContacto}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded"
              placeholder="Ej: González"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Apellido Materno (Opcional)</span>
            </label>
            <input 
              type="text" 
              name="apellidoMaternoContacto" 
              value={formData.apellidoMaternoContacto}
              onChange={handleChange} 
              className="input input-bordered w-full !rounded"
              placeholder="Ej: López"
            />
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Correo del Contacto</span>
            </label>
            <input 
              type="email" 
              name="correoContacto" 
              value={formData.correoContacto}
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.correoContacto ? 'input-error' : ''}`}
              placeholder="contacto@ejemplo.com"
            />
            {errors.correoContacto && <span className="text-error text-xs mt-1">{errors.correoContacto}</span>}
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Teléfono del Contacto</span>
            </label>
            <input 
              type="tel" 
              name="telefonoContacto" 
              value={formData.telefonoContacto}
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.telefonoContacto ? 'input-error' : ''}`}
              placeholder="10 dígitos"
              maxLength={10}
            />
            {errors.telefonoContacto && <span className="text-error text-xs mt-1">{errors.telefonoContacto}</span>}
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Contraseña</span>
            </label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.password && passwordStrength === 'invalid' ? "input-error" : "" }`}
              placeholder="Mínimo 8 caracteres"
            />
                        {passwordStrength !== 'none' && (
              <div className="mt-2">
                <span className={`text-xs ${
                  passwordStrength === 'invalid' || passwordStrength === 'weak' ? 'text-error' :
                  passwordStrength === 'medium' ? 'text-warning' : 'text-success'
                }`}>
                  {errors.password}
                </span>
                <div className="w-full bg-base-300 rounded-full h-2 mt-1">
                  <div className={`h-2 rounded-full ${
                    passwordStrength === 'weak' || passwordStrength === 'invalid' ? 'w-1/3 bg-error' :
                    passwordStrength === 'medium' ? 'w-2/3 bg-warning' :
                    passwordStrength === 'strong' ? 'w-full bg-success' : 'w-0'
                }`}></div>
                </div>
            </div>
          )}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Datos Públicos del Negocio */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Datos Públicos del Negocio (Opcionales)</h2>
        <p className="text-sm text-base-content/70">Esta información será visible para los clientes.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label text-base-content">
              <span className="label-text">Correo Público</span>
            </label>
            <input 
              type="email" 
              name="correoPublico" 
              value={formData.correoPublico}
              onChange={handleChange} 
              className={`input input-bordered w-full !rounded ${errors.correoPublico ? 'input-error' : ''}`}
              placeholder="info@negocio.com (opcional)"
            />
            {errors.correoPublico && <span className="text-error text-xs mt-1">{errors.correoPublico}</span>}
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Teléfono Público</span>
            </label>
            <input 
              type="tel" 
              name="telefonoPublico" 
              value={formData.telefonoPublico}
              onChange={handleChange} 
              className={`input input-bordered w-full !rounded ${errors.telefonoPublico ? 'input-error' : ''}`}
              placeholder="10 dígitos (opcional)"
              maxLength={10}
            />
            {errors.telefonoPublico && <span className="text-error text-xs mt-1">{errors.telefonoPublico}</span>}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Dirección */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Dirección del Negocio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label text-base-content">
              <span className="label-text">Calle</span>
            </label>
            <input 
              type="text" 
              name="calle" 
              value={formData.direccion.calle}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Número exterior</span>
            </label>
            <input 
              type="text" 
              name="numeroExt" 
              value={formData.direccion.numeroExt}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Número interior (Opcional)</span>
            </label>
            <input 
              type="text" 
              name="numeroInt" 
              value={formData.direccion.numeroInt}
              onChange={handleChange} 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div>
            <label className="label text-base-content">
              <span className="label-text">Código Postal</span>
            </label>
            <input 
              type="text" 
              name="direccion.codigoPostal" 
              onChange={handleChange} 
              required
              maxLength={5} 
              className={`input input-bordered w-full !rounded ${errors.codigoPostal ? 'input-error' : ''}`} />
              {errors.codigoPostal && <span className="text-error text-xs mt-1">{errors.codigoPostal}</span>}
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label text-base-content">
              <span className="label-text">Colonia</span>
            </label>
            <input 
              type="text" 
              name="colonia" 
              value={formData.direccion.colonia}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label text-base-content">
              <span className="label-text">Municipio</span>
            </label>
            <input 
              type="text" 
              name="municipio" 
              value={formData.direccion.municipio}
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>
            <div>
            <label className="label text-base-content"><span className="label-text">Estado</span></label>
            <select 
              name="direccion.estado" 
              value={formData.direccion.estado} 
              onChange={handleChange} 
              required 
              className="select select-bordered w-full !rounded px-2" >        
              <option disabled value="">Selecciona un estado</option>
              <option value="Estado de México">Estado de México</option>
              <option value="CDMX">Ciudad de México</option>
              <option value="Otro">Otro</option>
            </select>

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
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{formError}</span>
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