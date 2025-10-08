import SectionHeader from "./SectionHeader";

export default function SeccionPreferencias() {
  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Preferencias"
        subtitle="Personaliza la apariencia y notificaciones de la aplicación."
      />
      <div className="space-y-6 mt-6">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Tema Oscuro</span> 
            <input type="checkbox" className="toggle toggle-primary" />
          </label>
          <p className="text-xs text-base-content/70 px-1 py-2">Activa el modo oscuro para una experiencia visual diferente.</p>
        </div>
        <div className="divider"></div>
        <div>
          <h3 className="font-semibold mb-2">Notificaciones por Correo</h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Nuevas promociones y ofertas</span> 
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
          <div className="form-control py-4">
            <label className="label cursor-pointer">
              <span className="label-text">Actualizaciones de la cuenta</span> 
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}