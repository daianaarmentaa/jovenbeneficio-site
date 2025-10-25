/**
 * Componente: SectionHeader
 * 
 * Descripción:
 * Este componente renderiza un encabezado de sección con título y subtítulo.
 * Funcionalidades incluidas:
 * - Título en negrita y tamaño grande.
 * - Subtítulo con estilo de texto secundario.
 * - Separador visual mediante un borde inferior para distinguir secciones.
 * 
 * Autora: Daiana Armenta
 */

export default function SectionHeader({ title, subtitle }: { title: string; subtitle:string }) {
  return (
    <div className="pb-4 border-b border-base-300">
      <h2 className="text-2xl font-bold text-base-content">{title}</h2>
      <p className="text-base-content/70 mt-1">{subtitle}</p>
    </div>
  );
}