import SectionHeader from "./SectionHeader";
import PasswordInput from "../ContraseñaInput";

/**
 * Componente: SeccionSeguridad
 * 
 * Descripción:
 * Este componente permite a los usuarios gestionar la seguridad de su cuenta.
 * Funcionalidades incluidas:
 * - Actualización de contraseña mediante campos de contraseña actual, nueva y confirmación.
 * - Uso del componente PasswordInput para una mejor experiencia de ingreso de contraseña.
 * - Presentación visual clara con secciones y encabezado mediante SectionHeader.
 * - Botón para enviar los cambios de contraseña (funcionalidad de backend no incluida en este componente).
 * 
 * Autora: Daiana Armenta
 */


export default function SeccionSeguridad() {
  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Seguridad de la Cuenta"
        subtitle="Gestiona tu contraseña y la seguridad de tu cuenta."
      />
      <form className="space-y-6 mt-6">
    
        <div>
          <label className="label">
            <span className="label-text text-base-content">Contraseña Actual</span>
          </label>
          <input 
            type="password" 
            placeholder="••••••••••••" 
            className="input input-bordered w-full rounded text-base-content" 
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text text-base-content">Nueva Contraseña</span>
          </label>
          <PasswordInput 
            placeholder="••••••••••••" 
            containerClassName="w-full text-base-content"
          />
        </div>
        
        <div>
          <label className="label">
            <span className="label-text text-base-content">Confirmar Contraseña</span>
          </label>
          <PasswordInput 
            placeholder="••••••••••••" 
            containerClassName="w-full text-base-content"
          />
        </div>
        
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary rounded">
            Actualizar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
}