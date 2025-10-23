type ModalProps = {
  isOpen: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({ isOpen, itemName, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <dialog id="delete_modal" className=" text-base-content modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmar Eliminación</h3>
        <p className="py-4">
          ¿Estás seguro de que quieres eliminar a 
          <strong className="mx-1">{itemName}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="modal-action">
          <button className="btn btn-ghost rounded" onClick={onClose}>Cancelar</button>
          <button className="btn btn-error rounded" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}