import { Trash2 } from 'lucide-react';
import { Negocio } from "../app/home/negocios/page"

// Define las props que el componente espera recibir
type CardViewProps = {
  negocios: Negocio[];
  onDelete: (negocio: Negocio) => void; // Una función para manejar el clic en eliminar
};

export default function NegociosCardView({ negocios, onDelete }: CardViewProps) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      {negocios.map((negocio) => (
        <div key={negocio.id} className="card bg-base-100 shadow-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={`https://i.pravatar.cc/50?u=${negocio.id}`} alt={negocio.nombre} />
              </div>
            </div>
            <div className="font-bold text-lg">{negocio.nombre}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-base-200 py-1">
              <span className="font-semibold text-base-content/70">Categoría:</span>
              <span>{negocio.categoria}</span>
            </div>
            <div className="flex justify-between border-b border-base-200 py-1">
              <span className="font-semibold text-base-content/70">Ciudad:</span>
              <span>{negocio.direccion.ciudad}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold text-base-content/70">Correo:</span>
              <span className="truncate">{negocio.correo}</span>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-end">
            <button 
              onClick={() => onDelete(negocio)} // Llama a la función 'onDelete' pasada por props
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