// ============================================
// componentes/JovenesDesktopTable.tsx
// ============================================

import { Trash2 } from 'lucide-react';
import { Joven } from "../../app/home/jovenes/page"; // ✅ Import from page

type TableViewProps = {
  jovenes: Joven[];
  onDelete: (joven: Joven) => void;
};

export default function JovenesDesktopTable({ jovenes, onDelete }: TableViewProps) {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="table w-full border border-base-300 text-base-content">
        <thead className="bg-base-200">
          <tr>
            <th>Foto</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Folio</th>
            <th>Teléfono</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jovenes.map((joven) => (
            <tr key={joven.id} className="bg-base-100 hover:bg-base-300">
              <td>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img 
                      src={joven.foto || `https://i.pravatar.cc/50?img=${joven.id}`} 
                      alt={joven.nombre} 
                    />
                  </div>
                </div>
              </td>
              <td>{joven.id}</td>
              <td>{joven.nombre}</td>
              <td>{joven.correo}</td>
              <td>{joven.folio}</td>
              <td>{joven.telefono}</td>
              <td className="text-right">
                <button 
                  onClick={() => onDelete(joven)} 
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