/**
 * Componente: Pagination
 * 
 * Descripción:
 * Este componente muestra controles de paginación simples para navegar entre páginas.
 * Permite ir a la página anterior o siguiente, mostrando también el número de página actual
 * y el total de páginas disponibles.
 * 
 * Props:
 * - currentPage: número de la página actualmente seleccionada.
 * - totalPages: número total de páginas disponibles.
 * - onPrev: función que se ejecuta al hacer clic en "Anterior".
 * - onNext: función que se ejecuta al hacer clic en "Siguiente".
 * 
 * Comportamiento:
 * - El botón "Anterior" se deshabilita si la página actual es 1.
 * - El botón "Siguiente" se deshabilita si la página actual es igual al total de páginas.
 * 
 * Autora: Daiana Armenta
 */


type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({ currentPage, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button 
        className="btn btn-sm btn-primary rounded" 
        onClick={onPrev} 
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="text-base-content">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        className="btn btn-sm btn-primary rounded" 
        onClick={onNext} 
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}