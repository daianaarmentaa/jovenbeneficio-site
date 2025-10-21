/* Esta función se encarga de crear un componente para
 * mostrar un formulario para el registro de los jóvenes
 * Autora: Daiana Andrea Armenta Maya y Emiliano Plata
*/
'use client';

import { useState } from "react";
import { User } from "lucide-react";
import Link from "next/link";

type JovenFormData = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  genero: string;
  direccion: {
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    colonia: string;
    codigoPostal: string;
    municipio: string;
    estado: string;
  };
  curp: string;
  correo: string;
  celular: string;
  password: string;
  consentimientoAceptado: boolean;
  foto?: File | null; // <-- LA CLAVE ES EL '?'
};



export default function RegistroJoven() {
  // --- PASO 2: APLICA EL TIPO A TU ESTADO ---
  const [formData, setFormData] = useState<JovenFormData>({
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
      estado: "",
    },
    curp: "",
    correo: "",
    celular: "",
    password: "",
    consentimientoAceptado: false,
    foto: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correo: "",
    celular: "",
    password:"",
    curp: "",
  });


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    let finalValue: any = value;

    if (type == 'checkbox'){
      finalValue = checked;
    }

    if (name === 'curp') {
      finalValue = value.toUpperCase();
    }

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        setFormData(prev => ({ ...prev, [name]: file }));
        setPreview(URL.createObjectURL(file));
      }
    } 
    else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: finalValue,
      }));
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

    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Función para convertir un archivo a Base64
    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // Quita el prefijo "data:image/jpeg;base64,"
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
    // 🆕 NUEVA FUNCIÓN: Formatear fecha de YYYY-MM-DD a DD/MM/YYYY
    const formatDateToDDMMYYYY = (dateString: string): string => {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null); // Limpia errores previos

        // Validación extra en el frontend
        if (!formData.consentimientoAceptado) {
            setFormError("Debes aceptar el aviso de privacidad para registrarte.");
            return;
        }

        setIsLoading(true);

        try {
            const payload = { ...formData };

            if (formData.fechaNacimiento) {
              payload.fechaNacimiento = formatDateToDDMMYYYY(formData.fechaNacimiento);
            }
            
            // Si hay una foto, la convertimos a Base64
            if (formData.foto) {
                const fotoBase64 = await toBase64(formData.foto);
                payload.foto = fotoBase64 as any; // Usamos 'any' para evitar problemas de tipo
            } else {
                delete payload.foto; // No se envía la propiedad si no hay foto
            }

            const API_ENDPOINT = 'https://registrojoven-819994103285.us-central1.run.app';

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                // Si la API devuelve un error (ej. 409, 500), lo mostramos
                throw new Error(result.message || 'Ocurrió un error en el servidor.');
            }

            alert('¡Joven registrado con éxito!');


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
      className="w-full bg-base-100 shadow-lg rounded-xl p-6 sm:p-10 space-y-8 text-base-content"
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
            <label className="label text-base-content"><span className="label-text">Nombre(s)</span></label>
            <input type="text" name="nombre" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Apellido Paterno</span></label>
            <input type="text" name="apellidoPaterno" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Apellido Materno</span></label>
            <input type="text" name="apellidoMaterno" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Fecha de nacimiento</span></label>
            <input type="date" name="fechaNacimiento" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">CURP</span></label>
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
            <label className="label text-base-content"><span className="label-text">Género</span></label>
              <select name="genero" onChange={handleChange} value={formData.genero} required className="select select-bordered w-full !rounded">
                <option disabled value="">Selecciona una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
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
            <label className="label text-base-content"><span className="label-text">Número Exterior</span></label>
            <input type="text" name="direccion.numeroExterior" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Número Interior (Opcional)</span></label>
            <input type="text" name="direccion.numeroInterior" onChange={handleChange} className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Código Postal</span></label>
            <input type="text" name="direccion.codigoPostal" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="label text-base-content"><span className="label-text">Colonia</span></label>
            <input type="text" name="direccion.colonia" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Municipio / Alcaldía</span></label>
            <input type="text" name="direccion.municipio" onChange={handleChange} required className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Estado</span></label>
            <input 
              type="text" 
              name="direccion.estado" 
              value={formData.direccion.estado} 
              onChange={handleChange} 
              required 
              className="input input-bordered w-full !rounded" 
            />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* --- SECCIÓN 3: DATOS DE LA CUENTA --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Datos de la Cuenta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label text-base-content"><span className="label-text">Correo</span></label>
            <input type="email" name="correo" onChange={handleChange} placeholder="correo@ejemplo.com" required className={`input input-bordered w-full !rounded ${errors.correo ? "input-error" : "" }`} />
            {errors.correo && <span className="text-error text-xs mt-1">{errors.correo}</span>}
          </div>
          <div>
            <label className="label text-base-content"><span className="label-text">Celular</span></label>
            <input type="tel" name="celular" onChange={handleChange} placeholder="10 dígitos" required className={`input input-bordered w-full !rounded ${errors.celular ? "input-error" : "" }`} />
            {errors.celular && <span className="text-error text-xs mt-1">{errors.celular}</span>}
          </div>
        </div>
        <div>
          <label className="label text-base-content"><span className="label-text">Contraseña</span></label>
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

      <div className="divider"></div>

      {/* --- SECCIÓN 4: CONSENTIMIENTO --- */}
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consentimiento"
              name="consentimientoAceptado"
              type="checkbox"
              checked={formData.consentimientoAceptado}
              onChange={handleChange}
              className="checkbox checkbox-primary"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consentimiento" className="label-text">
              He leído y acepto el{" "}
              <a href="/aviso-de-privacidad" target="_blank" className="link link-primary">
                Aviso de Privacidad
              </a>
              .
            </label>
          </div>
        </div>
      </div>

        {/* --- SECCIÓN 5: BOTONES DE ACCIÓN --- */}
        {/* Muestra un mensaje de error si existe */}
        {formError && (
          <div className="text-center text-error p-2 bg-error/20 rounded-md mb-4">
            {formError}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-base-300 pt-6">
          <Link href="/home/jovenes">
            <button type="button" className="btn btn-ghost rounded w-full sm:w-auto" disabled={isLoading}>
              Cancelar
            </button>
          </Link>
          <button type="submit" className="btn btn-primary rounded w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner"></span> : 'Registrar'}
          </button>
        </div>
    </form>
  );
}