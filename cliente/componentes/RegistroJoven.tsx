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
  foto?: File | null; 
};

export default function RegistroJoven() {
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
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength.level); // Actualiza el nivel para la barra visual
      setErrors((prev) => ({ 
        ...prev, 
        password: strength.message 
      }));
    }
    if (name === "curp") {
      const curpRegex = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
      const upperCaseValue = value.toUpperCase();
      setFormData(prev => ({ ...prev, curp: upperCaseValue }));
      setErrors((prev) => ({
        ...prev,
        curp: curpRegex.test(upperCaseValue) || upperCaseValue.length === 0
        ? ""
        : "El formato del CURP no es válido.",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null); // Limpia errores previos

        const hasClientErros = Object.values(errors).some(errorMsg => errorMsg !== "");

        if (hasClientErros){
          setFormError("Por favor, corrige los errores marcados en rojo antes de continuar");
          return;
        }
      
        // Validación extra en el frontend
        if (!formData.consentimientoAceptado) {
            setFormError("Debes aceptar el aviso de privacidad para registrarte.");
            return;
        }

        setIsLoading(true);

        try {
            const payload = { ...formData };
        
            // Si hay una foto, la convertimos a Base64
            if (formData.foto) {
                const fotoBase64 = await toBase64(formData.foto);
                payload.foto = fotoBase64 as any; // Usamos 'any' para evitar problemas de tipo
            } else {
                delete payload.foto; // No se envía la propiedad si no hay foto
            }

            const API_ENDPOINT = 'https://9somwbyil5.execute-api.us-east-1.amazonaws.com/prod/registerJoven';

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
              <select name="genero" onChange={handleChange} value={formData.genero} required className="select select-bordered w-full !rounded px-2">
                <option disabled value="">Selecciona una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>

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
            <input type="text" name="direccion.codigoPostal" onChange={handleChange} required maxLength={5} className={`input input-bordered w-full !rounded ${errors.codigoPostal ? 'input-error' : ''}`} />
            {errors.codigoPostal && <span className="text-error text-xs mt-1">{errors.codigoPostal}</span>}
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
            <select 
              name="direccion.estado" 
              value={formData.direccion.estado} 
              onChange={handleChange} 
              required 
              className="select select-bordered w-full !rounded px-2" >        
              <option disabled value="">Selecciona un estado</option>
              <option value="Estado de México">Estado de México</option>
              <option value="CDMX">Ciudad de México</option>
            </select>

          </div>
        </div>
      </div>

      <div className="divider"></div>

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
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              required 
              className={`input input-bordered w-full !rounded ${errors.password && passwordStrength === 'invalid' ? "input-error" : "" }`} 
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

      <div className="divider"></div>

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