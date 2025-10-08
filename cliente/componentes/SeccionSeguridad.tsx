import SectionHeader from "./SectionHeader";

export default function SeccionSeguridad() {
  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Seguridad de la Cuenta"
        subtitle="Gestiona tu contraseña y la seguridad de tu cuenta."
      />
      <form className="space-y-6 mt-6">
        <div>
          <label className="label"><span className="label-text">Contraseña Actual</span></label>
          <input type="password" placeholder="••••••••" className="input input-bordered w-full !rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text">Nueva Contraseña</span></label>
            <input type="password" placeholder="••••••••" className="input input-bordered w-full !rounded" />
          </div>
          <div>
            <label className="label"><span className="label-text">Confirmar Contraseña</span></label>
            <input type="password" placeholder="••••••••" className="input input-bordered w-full !rounded" />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary rounded">Actualizar Contraseña</button>
        </div>
      </form>
    </div>
  );
}