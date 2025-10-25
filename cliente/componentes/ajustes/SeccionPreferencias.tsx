import SectionHeader from "./SectionHeader";
import { useTheme } from "@/app/providers/theme_providers";

/**
 * Componente: SeccionPreferencias
 * 
 * Descripción:
 * Este componente permite a los usuarios personalizar sus preferencias de la aplicación.
 * Funcionalidades incluidas:
 * - Cambio de tema entre claro y oscuro mediante un toggle, usando un proveedor de tema.
 * - Configuración de notificaciones por correo para promociones y actualizaciones de cuenta.
 * - Presentación visual clara con secciones y divisores, usando el componente SectionHeader.
 * 
 * Autora: Daiana Armenta
 */


export default function SeccionPreferencias() {
  const {theme, setTheme} = useTheme();

  const handleThemeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? 'dracula' : 'pastel';
    setTheme(newTheme);
  };
  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Preferencias"
        subtitle="Personaliza la apariencia y notificaciones de la aplicación."
      />
      <div className="space-y-6 mt-6">
        <div className="form-control">
          <label className="label cursor-pointer text-base-content">
            <span className="label-text font-semibold">Tema Oscuro</span> 
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              onChange={handleThemeChange}
              checked={theme === 'dracula'}
              />
          </label>
          <p className="text-xs text-base-content/70 px-1 py-2">Activa el modo oscuro para una experiencia visual diferente.</p>
        </div>
        <div className="divider"></div>
        <div>
          <h3 className="font-semibold text-base-content mb-2">Notificaciones por Correo</h3>
          <div className="form-control">
            <label className="label cursor-pointer text-base-content">
              <span className="label-text">Nuevas promociones y ofertas</span> 
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
          <div className="form-control py-4">
            <label className="label cursor-pointer text-base-content">
              <span className="label-text">Actualizaciones de la cuenta</span> 
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}