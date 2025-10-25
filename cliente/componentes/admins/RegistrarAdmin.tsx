'use client';

import { useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Componente: RegistroAdmin
 * 
 * Descripción:
 * Este componente renderiza un formulario completo para registrar un nuevo administrador.
 * Incluye:
 * - Datos personales: nombre, apellidos.
 * - Datos de la cuenta: correo, rol, contraseña con validación de fuerza.
 * - Foto de perfil con vista previa.
 * - Validaciones en tiempo real para correo, contraseña y campos de texto.
 * - Conversión de imagen a Base64 antes de enviarla a la API.
 * - Manejo de estados de carga y errores.
 * - Redirección al listado de administradores tras el registro exitoso.
 * 
 * Autora: Daiana Armenta
 */

type AdminFormData = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  rol: string;
  foto: File | null;
  password: string;
};

export default function RegistroAdmin() {
  const [formData, setFormData] = useState<AdminFormData>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    rol: "admin",
    foto: null,
    password: ""
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    correo: "",
    password: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState('none');
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const router = useRouter();

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (password.length === 0) return { message: '', level: 'none' };
    if (password.length < 8) return { message: 'Debe tener al menos 8 caracteres.', level: 'invalid' };

    switch (score) {
      case 0:
      case 1:
      case 2: return { message: 'Contraseña muy débil', level: 'weak' };
      case 3: return { message: 'Contraseña débil', level: 'weak' };
      case 4: return { message: 'Contraseña media', level: 'medium' };
      case 5: return { message: 'Contraseña fuerte', level: 'strong' };
      default: return { message: '', level: 'none' };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === 'file' && files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, foto: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Validaciones
    if (name === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prev => ({ ...prev, correo: emailRegex.test(value) ? "" : "Correo inválido" }));
    }

    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength.level);
      setPasswordFeedback(strength.message);
      setErrors(prev => ({ ...prev, password: strength.level === 'invalid' || strength.level === 'weak' ? strength.message : '' }));
    }

    if (["nombre", "apellido_paterno", "apellido_materno"].includes(name)) {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      setErrors(prev => ({ ...prev, [name]: nameRegex.test(value) ? '' : 'Solo letras y espacios' }));
    }
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const hasErrors = Object.values(errors).some(err => err !== '');
    if (hasErrors) {
      setFormError("Corrige los errores antes de enviar.");
      return;
    }

    if (passwordStrength !== 'strong') {
      setFormError("La contraseña debe ser fuerte.");
      return;
    }

    setIsLoading(true);

    try {
      const payload: any = { ...formData };

      if (formData.foto) {
        payload.foto = await toBase64(formData.foto);
      } else {
        delete payload.foto;
      }

        console.log("Body que se enviará a la Lambda:", payload)

      const response = await fetch('https://hpksmuqzua.execute-api.us-east-1.amazonaws.com/default/createAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Error al registrar");

      alert("Administrador registrado con éxito");
      router.push("/home/admins");

    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" text-base-content w-full min-h-screen bg-base-100 p-6 sm:p-10 space-y-8">
      <div className="border-b border-base-300 pb-6">
        <h1 className="text-2xl sm:text-3xl text-base-content font-bold">Registro de Administrador</h1>
        <p className="mt-1 text-sm text-base-content/70">Completa la información para crear tu cuenta de administrador.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl  text-base-content font-semibold">Datos Personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label"><span className="label-text">Nombre</span></label>
            <input type="text" name="nombre" onChange={handleChange} className={`input input-bordered w-full ${errors.nombre ? 'input-error' : ''}`} required />
            {errors.nombre && <span className="text-error text-xs mt-1">{errors.nombre}</span>}
          </div>
          <div>
            <label className="label"><span className="label-text">Apellido Paterno</span></label>
            <input type="text" name="apellido_paterno" onChange={handleChange} className={`input input-bordered w-full ${errors.apellido_paterno ? 'input-error' : ''}`} required />
            {errors.apellido_paterno && <span className="text-error text-xs mt-1">{errors.apellido_paterno}</span>}
          </div>
          <div>
            <label className="label"><span className="label-text">Apellido Materno</span></label>
            <input type="text" name="apellido_materno" onChange={handleChange} className={`input input-bordered w-full ${errors.apellido_materno ? 'input-error' : ''}`} required />
            {errors.apellido_materno && <span className="text-error text-xs mt-1">{errors.apellido_materno}</span>}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Datos de la Cuenta</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="label"><span className="label-text">Correo</span></label>
            <input type="email" name="correo" onChange={handleChange} className={`input input-bordered w-full ${errors.correo ? 'input-error' : ''}`} required />
            {errors.correo && <span className="text-error text-xs mt-1">{errors.correo}</span>}
          </div>
          <div>
            <label className="label"><span className="label-text">Rol</span></label>
            <select name="rol" value={formData.rol} onChange={handleChange} className="select select-bordered w-full px-2 rounded">
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div>
            <label className="label"><span className="label-text">Contraseña</span></label>
            <input type="password" name="password" onChange={handleChange} className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`} required />
            {passwordStrength !== 'none' && (
              <div className="mt-2">
                <span className={`text-xs ${passwordStrength === 'weak' || passwordStrength === 'invalid' ? 'text-error' : passwordStrength === 'medium' ? 'text-warning' : 'text-success'}`}>{passwordFeedback}</span>
                <div className="w-full bg-base-300 rounded-full h-2 mt-1">
                  <div className={`h-2 rounded-full ${passwordStrength === 'weak' || passwordStrength === 'invalid' ? 'w-1/3 bg-error' : passwordStrength === 'medium' ? 'w-2/3 bg-warning' : 'w-full bg-success'}`}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Foto de Perfil</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {preview ? (
            <img src={preview} alt="Vista previa" className="w-24 h-24 rounded-full object-cover border-2 border-base-300" />
          ) : (
            <User className="w-24 h-24 text-base-content/30 border-2 border-dashed border-base-300 rounded-full p-6" />
          )}
          <input type="file" name="foto" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full sm:flex-1" />
        </div>
      </div>

      {formError && <div className="text-error text-center p-2 bg-error/20 rounded">{formError}</div>}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-base-300 pt-6">
        <button type="button" className="btn btn-ghost w-full sm:w-auto rounded" onClick={() => router.push('/home/admins')} disabled={isLoading}>Cancelar</button>
        <button type="submit" className="btn btn-primary w-full sm:w-auto rounded" disabled={isLoading}>{isLoading ? <span className="loading loading-spinner"></span> : 'Registrar'}</button>
      </div>
    </form>
  );
}
