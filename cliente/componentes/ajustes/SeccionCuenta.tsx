import { Trash2, UserX } from "lucide-react";
import SectionHeader from "./SectionHeader";

/**
 * Componente: SeccionCuenta
 * 
 * Descripción:
 * Este componente renderiza la sección de gestión de la cuenta de usuario.
 * Incluye:
 * - Opción de desactivar temporalmente la cuenta, ocultando perfil y contenido hasta el próximo inicio de sesión.
 * - Opción de eliminar la cuenta de forma permanente, con advertencia de pérdida de datos.
 * - Uso de alertas visuales y botones con estilos diferenciados para cada acción.
 * - Encabezado de sección con título y subtítulo a través del componente SectionHeader.
 * 
 * Autora: Daiana Armenta
 */

export default function SeccionCuenta() {
  return (
    <div className="card p-6 sm:p-8">
      <SectionHeader
        title="Gestión de la Cuenta"
        subtitle="Desactiva temporalmente o elimina tu cuenta de forma permanente."
      />
      <div className="space-y-6 mt-6">
        
        <div className="alert alert-warning">
          <UserX className="w-5 h-5"/>
          <div>
            <h3 className="font-bold">Desactivar Cuenta </h3>
            <div className="text-xs">
              Tu perfil y contenido serán ocultados temporalmente hasta que vuelvas a iniciar sesión.
            </div>
          </div>
          <button className="btn btn-sm btn-warning">Desactivar</button>
        </div>

        {/* --- SECCIÓN DE ELIMINAR CUENTA --- */}
        <div className="alert alert-error">
          <Trash2 className="w-5 h-5"/>
          <div>
            <h3 className="font-bold">Eliminar Cuenta</h3>
            <div className="text-xs">
              Esta acción es permanente y no se puede deshacer. Perderás todos tus datos.
            </div>
          </div>
          <button className="btn btn-sm btn-error">Eliminar</button>
        </div>
      </div>
    </div>
  );
}