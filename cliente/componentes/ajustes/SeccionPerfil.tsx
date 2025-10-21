"use client";
import { useState, ChangeEvent, FormEvent } from 'react'; // Importar hooks necesarios
import SectionHeader from "./SectionHeader";

export default function SeccionPerfil({ user }: { user: any }) {

  if (!user) {
    return null;
  }

  // Paso 1: Crear estados para manejar los datos del formulario
  const [name, setName] = useState(user.nickname || '');
  const [lastName, setLastName] = useState(user.given_name || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user.picture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");

  // Paso 2: Crear una función para manejar el cambio de la imagen
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file); // Guardar el archivo para subirlo después
      setImagePreview(URL.createObjectURL(file)); // Crear una URL temporal para la previsualización
    }
  };

  // Paso 3: Crear una función para manejar el envío del formulario
  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault(); // Evitar que la página se recargue

    // Lógica para subir la imagen y actualizar el perfil
    console.log("Actualizando perfil...");
    console.log("Nombre:", name);
    console.log("Apellidos:", lastName);

    if (selectedImage) {
      console.log("Imagen seleccionada:", selectedImage.name);
      // AQUÍ IRÁ LA LÓGICA PARA SUBIR LA IMAGEN AL BACKEND (ver explicación abajo)
      // 1. Pedir una URL segura para subir el archivo a tu backend (Lambda).
      // 2. Subir el archivo `selectedImage` a esa URL (generalmente a un bucket de S3).
      // 3. Una vez subida, obtienes la URL pública de la imagen.
      // 4. Envías la nueva URL de la imagen y los otros datos (nombre, apellido) a otro endpoint de tu API para guardarlos en la base de datos.
    } else {
       // Si no se cambió la imagen, solo envía los otros datos
       // AQUÍ IRÁ LA LÓGICA PARA ACTUALIZAR SOLO LOS DATOS DE TEXTO
    }
     alert("Funcionalidad de guardado en desarrollo. Revisa la consola para ver los datos.");
  };

  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Perfil de Usuario"
        subtitle="Actualiza tu foto e información personal."
      />
      {/* Paso 3: Asociar la función de envío al formulario */}
      <form className="space-y-6 mt-6" onSubmit={handleUpdateProfile}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* Paso 4: Mostrar la imagen previsualizada o la del usuario */}
              <img src={imagePreview || ''} alt="Vista previa del perfil" />
            </div>
          </div>
          <div className="w-full sm:flex-1">
            {/* Paso 2: Asociar la función de cambio al input de archivo */}
            <input 
              type="file" 
              className="file-input file-input-bordered w-full text-base-content" 
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/gif" // Limitar tipos de archivo
            />
            <p className="text-xs text-base-content/70 mt-2">JPG, GIF o PNG. Tamaño máximo de 5MB.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text text-base-content">Nombre</span></label>
            {/* Paso 1: Vincular el input al estado */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full rounded text-base-content" />
          </div>
          <div>
            <label className="label"><span className="label-text text-base-content">Apellidos</span></label>
            {/* Paso 1: Vincular el input al estado */}
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className=" text-base-content input input-bordered w-full !rounded" />
          </div>
        </div>
        <div>
          <label className="label"><span className="label-text text-base-content">Correo Electrónico</span></label>
          <input type="email" value={user.email} className="input input-bordered w-full" disabled />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary rounded">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}