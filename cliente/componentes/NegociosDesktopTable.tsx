import { Trash2 } from 'lucide-react';
import { Negocio } from '../app/home/negocios/page'; // Importa el tipo 'Negocio'

type TableViewProps = {
  negocios: Negocio[];
  onDelete: (negocio: Negocio) => void;
};

export default function NegociosDesktopTable({ negocios, onDelete }: TableViewProps) {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="table w-full border border-base-300">
        <thead className="bg-base-200">
          <tr>
            <th>Logo</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Ciudad</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {negocios.map((negocio) => (
            <tr key={negocio.id} className="bg-base-100 hover:bg-base-300">
              <td>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={`https://i.pravatar.cc/50?u=${negocio.id}`} alt={negocio.nombre} />
                  </div>
                </div>
              </td>
              <td>{negocio.id}</td>
              <td>{negocio.nombre}</td>
              <td>{negocio.categoria}</td>
              <td>{negocio.direccion.ciudad}</td>
              <td>{negocio.correo}</td>
              <td>{negocio.telefono}</td>
              <td className="text-right">
                <button 
                  onClick={() => onDelete(negocio)} 
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