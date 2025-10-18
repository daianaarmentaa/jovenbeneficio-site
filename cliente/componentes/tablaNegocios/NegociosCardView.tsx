import { Trash2 } from 'lucide-react';
import { Negocio } from "../../app/home/negocios/page"

type CardViewProps = {
  negocios: Negocio[];
  onDelete: (negocio: Negocio) => void;
};

export default function NegociosCardView({ negocios, onDelete }: CardViewProps) {
  // Helper function to safely split and display contacts
  const splitContact = (contact: string): string[] => {
    if (!contact) return ['N/A'];
    return contact.split(' / ').filter(item => item.trim() !== '');
  };

  return (
    <div className="md:hidden flex flex-col gap-4">
      {negocios.map((negocio) => {
        const emails = splitContact(negocio.correos);
        const phones = splitContact(negocio.telefonos);
        
        return (
          <div key={negocio.id_establecimiento} className="card bg-base-100 shadow-lg p-4">
            {/* Header with avatar and name */}
            <div className="flex items-start gap-4 mb-4">
              <div className="avatar">
                <div className="w-14 h-14 rounded-full">
                  <img 
                    src={negocio.foto} 
                    alt={negocio.nombre}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(negocio.nombre)}&background=random`;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base-content leading-tight mb-1">
                  {negocio.nombre}
                </div>
                <div className="badge badge-primary badge-sm mb-2">
                  {negocio.nombre_categoria}
                </div>
                {negocio.nombre_contacto_completo && (
                  <div className="text-xs text-base-content/70">
                    👤 {negocio.nombre_contacto_completo}
                  </div>
                )}
              </div>
              <button 
                onClick={() => onDelete(negocio)}
                className="btn btn-ghost btn-sm btn-circle flex-shrink-0"
                title="Eliminar establecimiento"
              >
                <Trash2 className="w-4 h-4 text-error" />
              </button>
            </div>

            {/* Details - Stacked layout */}
            <div className="space-y-3">
              {/* ID and Colonia */}
              <div className="flex gap-4 text-xs">
                <div>
                  <span className="text-base-content font-semibold">ID:</span> 
                  <span className="ml-1 font-semibold text-base-content">{negocio.id_establecimiento}</span>
                </div>
                <div className="flex-1">
                  <span className="text-base-content">📍</span>
                  <span className="text-base-content ml-1">{negocio.colonia}</span>
                </div>
              </div>

              {/* Emails */}
              <div className="bg-base-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-base-content/70 mb-2">
                  📧 Correo{emails.length > 1 ? 's' : ''}:
                </div>
                <div className="space-y-1">
                  {emails.map((email, idx) => (
                    <div key={idx} className="text-xs break-all">
                      {emails.length > 1 && (
                        <span className="text-base-content/60">
                          {idx === 0 ? 'Público: ' : 'Privado: '}
                        </span>
                      )}
                      <span className="text-base-content">{email}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phones */}
              <div className="bg-base-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-base-content/70 mb-2">
                  📞 Teléfono{phones.length > 1 ? 's' : ''}:
                </div>
                <div className="space-y-1">
                  {phones.map((phone, idx) => (
                    <div key={idx} className="text-xs">
                      {phones.length > 1 && (
                        <span className="text-base-content/60">
                          {idx === 0 ? 'Público: ' : 'Privado: '}
                        </span>
                      )}
                      <span className="font-medium text-base-content">{phone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}