/* Esta función se encarga de crear un componente para
 * mostrar la tabla de los administradores registrados en forma de tarjetas para
 * pantallas pequeñas
 * @author Daiana Andrea Armenta Maya
*/
import { Trash2 } from 'lucide-react';

type Admin = {
  id_admin: number;
  nombre: string;
  correo: string;
  rol: string;
  foto?: string;
};

type CardViewProps = {
  admins: Admin[];
  onDelete: (admin: Admin) => void;
};

export default function AdminsCardView({ admins, onDelete }: CardViewProps) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      {admins.map((admin) => (
        <div key={admin.id_admin} className="card bg-base-100 shadow-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img 
                  src={admin.foto || `https://i.pravatar.cc/50?img=${admin.id_admin}`} 
                  alt={admin.nombre} 
                />
              </div>
            </div>
            <div className="font-bold text-base-content text-lg">{admin.nombre}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-base-content/70">Correo:</span>
              <span className="text-base-content">{admin.correo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base-content/70">Rol:</span>
              <span className="text-base-content capitalize">{admin.rol}</span>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-end">
            <button 
              onClick={() => onDelete(admin)} 
              className="btn btn-ghost btn-sm btn-circle"
            >
              <Trash2 className="w-5 h-5 text-error" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
