import { Trash2 } from 'lucide-react';
import { Negocio } from '../app/home/negocios/page';

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
            <th>Contacto</th>
            <th>Categoría</th>
            <th>Colonia</th>
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
                    <img 
                      src={negocio.foto} 
                      alt={negocio.nombre_establecimiento}
                      onError={(e) => {
                        // Fallback to default image if S3 image fails to load
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(negocio.nombre_establecimiento)}&background=random`;
                      }}
                    />
                  </div>
                </div>
              </td>
              <td>{negocio.id}</td>
              <td className="font-semibold">{negocio.nombre_establecimiento}</td>
              <td className="text-sm">{negocio.nombre_contacto_completo || 'N/A'}</td>
              <td>
                <span className="badge badge-primary badge-sm">
                  {negocio.categoria}
                </span>
              </td>
              <td>{negocio.colonia}</td>
              <td className="text-sm">
                <div className="max-w-xs">
                  {negocio.correo.split(' / ').map((email, idx) => (
                    <div key={idx} className="text-sm py-0.5">
                      <span className="text-base-content/60 mr-1">
                        {idx === 0 ? 'Público:' : 'Privado:'}
                      </span>
                      <span className="select-all">{email.trim()}</span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="text-sm">
                <div className="space-y-0.5">
                  {negocio.telefono.split(' / ').map((phone, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="text-base-content/60 mr-1">
                        {idx === 0 ? 'Público:' : 'Privado:'}
                      </span>
                      <span className="select-all">{phone.trim()}</span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="text-right">
                <button 
                  onClick={() => onDelete(negocio)} 
                  className="btn btn-ghost btn-sm btn-circle"
                  title="Eliminar establecimiento"
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