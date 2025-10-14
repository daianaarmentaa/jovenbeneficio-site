import { Trash2 } from 'lucide-react';

type Joven = {
  id: number;
  name: string;
  email: string;
  phone: string;
  folio: string; 
};

type TableViewProps = {
  jovenes: Joven[];
  onDelete: (joven: Joven) => void;
};

export default function JovenesDesktopTable({ jovenes, onDelete }: TableViewProps) {
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="table w-full border border-base-300">
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
                    <img src={`https://i.pravatar.cc/50?img=${joven.id}`} alt={joven.name} />
                  </div>
                </div>
              </td>
              <td>{joven.id}</td>
              <td>{joven.name}</td>
              <td>{joven.email}</td>
              <td>{joven.folio}</td>
              <td>{joven.phone}</td>
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