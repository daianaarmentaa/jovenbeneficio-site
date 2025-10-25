"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import SectionHeader from "./SectionHeader";

/**
 * Componente: SeccionPerfil
 * 
 * Descripción:
 * Este componente muestra y permite actualizar el perfil de un administrador.
 * Funcionalidades incluidas:
 * - Visualización de datos del administrador: nombre, correo, rol y ID.
 * - Vista previa de la foto de perfil y opción de subir una nueva imagen.
 * - Obtención de la información del administrador desde la base de datos y fallback a datos del usuario logueado.
 * - Indicadores de carga mientras se obtiene la información.
 * - Manejo de errores al cargar la imagen y fallback a imagen predeterminada.
 * - Formulario preparado para actualizar los datos (funcionalidad de guardado en desarrollo).
 * 
 * Autora: Daiana Armenta
 */

interface AdminProfile {
  id_admin: number;
  nombre: string;
  correo: string;
  rol: string;
  foto: string | null;
  apellido_paterno?: string;
  apellido_materno?: string;
}

export default function SeccionPerfil({ user }: { user: any }) {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user?.name || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Obtener el perfil del administrador desde tu BD
  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('https://5ouqlbfg7h.execute-api.us-east-1.amazonaws.com/default/getAdmins');
        if (response.ok) {
          const data = await response.json();
          
          // Buscar el admin que coincide con el email del usuario logueado
          const currentAdmin = data.data.find((admin: AdminProfile) => 
            admin.correo === user.email
          );
          
          setAdminProfile(currentAdmin || null);
          
          // Establecer la imagen de preview con la foto de la BD
          if (currentAdmin?.foto) {
            setImagePreview(currentAdmin.foto);
          } else if (user.picture) {
            setImagePreview(user.picture); // Fallback a Auth0
          }
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [user]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Actualizando perfil...");
    console.log("Admin ID:", adminProfile?.id_admin);

    if (selectedImage) {
      console.log("Imagen seleccionada:", selectedImage.name);
      // Aquí irá la lógica para subir la imagen
    }

    alert("Funcionalidad de guardado en desarrollo. Revisa la consola para ver los datos.");
  };

  // Función para determinar qué imagen mostrar
  const getDisplayImage = () => {
    if (imagePreview) return imagePreview;
    if (adminProfile?.foto) return adminProfile.foto;
    if (user?.picture) return user.picture;
    return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="card p-6 sm:p-8">
        <SectionHeader
          title="Perfil de Usuario"
          subtitle="Actualiza tu foto e información personal."
        />
        <div className="space-y-6 mt-6">
          <div className="skeleton h-24 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Perfil de Usuario"
        subtitle="Actualiza tu foto e información personal."
      />
      <form className="space-y-6 mt-6" onSubmit={handleUpdateProfile}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src={getDisplayImage()} 
                alt="Foto de perfil" 
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  e.currentTarget.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
              />
            </div>
          </div>
          <div className="w-full sm:flex-1">
            <input 
              type="file" 
              className="file-input file-input-bordered w-full text-base-content" 
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/gif"
            />
            <p className="text-xs text-base-content/70 mt-2">JPG, GIF o PNG. Tamaño máximo de 5MB.</p>
            
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="label">
              <span className="label-text text-base-content">Nombre Completo</span>
            </label>
            <input 
              type="text" 
              value={name} 
              className="input input-bordered w-full rounded text-base-content" 
              disabled 
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text text-base-content">Correo Electrónico</span>
          </label>
          <input 
            type="email" 
            value={user.email} 
            className="input input-bordered w-full" 
            disabled 
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-base-content">Rol</span>
          </label>
          <input 
            type="text" 
            value={adminProfile?.rol || 'No asignado'} 
            className="input input-bordered w-full" 
            disabled 
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-base-content">ID de Administrador</span>
          </label>
          <input 
            type="text" 
            value={adminProfile?.id_admin || 'No encontrado'} 
            className="input input-bordered w-full" 
            disabled 
          />
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary rounded">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}