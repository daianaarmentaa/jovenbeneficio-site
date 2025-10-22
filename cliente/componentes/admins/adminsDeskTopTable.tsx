/* Esta función se encarga de crear un componente para
 * mostrar la tabla de los administradores registrados para pantallas grandes
 * Autora: Daiana Andrea Armenta Maya
*/
import { Trash2 } from 'lucide-react';

type Admin = {
  id_admin: number;
  nombre: string;
  correo: string;
  rol: string;
  foto?: string;
};

type TableViewProps = {
  admins: Admin[];
  onDelete: (admin: Admin) => void;
};

export default function AdminsDesktopTable({ admins, onDelete }: TableViewProps) {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="table w-full border border-base-300 text-base-content">
        <thead className="bg-base-200">
          <tr>
            <th>Foto</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id_admin} className="bg-base-100 hover:bg-base-300">
              <td>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={admin.foto || `https://i.pravatar.cc/50?img=${admin.id_admin}`}
                      alt={admin.nombre}
                    />
                  </div>
                </div>
              </td>
              <td>{admin.id_admin}</td>
              <td>{admin.nombre}</td>
              <td>{admin.correo}</td>
              <td>{admin.rol}</td>
              <td className="text-right">
                <button
                  onClick={() => onDelete(admin)}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <Trash2 className="w-4 h-4 text-error" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
