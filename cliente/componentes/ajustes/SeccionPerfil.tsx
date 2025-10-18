"use client";
import SectionHeader from "./SectionHeader";


export default function SeccionPerfil({ user }: { user: any}) {

  if(!user) {
    return null;
  }
  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Perfil de Usuario"
        subtitle="Actualiza tu foto e información personal."

      />
      <form className="space-y-6 mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="w-full sm:flex-1">
            <input type="file" className="file-input file-input-bordered w-full text-base-content" />
            <p className="text-xs text-base-content/70 mt-2">JPG, GIF o PNG. Tamaño máximo de 5MB.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text text-base-content">Nombre</span></label>
            <input type="text" defaultValue={user.nickname} className="input input-bordered w-full rounded text-base-content" />
          </div>
          <div>
            <label className="label"><span className="label-text text-base-content">Apellidos</span></label>
            <input type="text" defaultValue={user.given_name} className=" text-base-content input input-bordered w-full !rounded" />
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