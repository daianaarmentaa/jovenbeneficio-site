// ============================================
// componentes/JovenesCardView.tsx
// ============================================

import { Trash2 } from 'lucide-react';
import { Joven } from "../app/home/jovenes/page"; // ✅ Import from page

type CardViewProps = {
  jovenes: Joven[];
  onDelete: (joven: Joven) => void;
};

export default function JovenesCardView({ jovenes, onDelete }: CardViewProps) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      {jovenes.map((joven) => (
        <div key={joven.id} className="card bg-base-100 shadow-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img 
                  src={joven.foto || `https://i.pravatar.cc/50?img=${joven.id}`} 
                  alt={joven.nombre} 
                />
              </div>
            </div>
            <div className="font-bold text-lg">{joven.nombre}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-base-content/70">Folio:</span>
              <span>{joven.folio}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base-content/70">Correo:</span>
              <span>{joven.correo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base-content/70">Teléfono:</span>
              <span>{joven.telefono}</span>
            </div>
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-end">
            <button 
              onClick={() => onDelete(joven)} 
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