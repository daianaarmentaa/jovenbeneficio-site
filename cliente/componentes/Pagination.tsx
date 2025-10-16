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