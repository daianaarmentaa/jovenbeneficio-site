/**
 * Componente: DeleteConfirmationModal
 * 
 * Descripción:
 * Este componente renderiza un modal de confirmación para eliminar un elemento.
 * Muestra un mensaje con el nombre del elemento a eliminar y ofrece botones para
 * cancelar o confirmar la acción. Es útil para evitar eliminaciones accidentales.
 * 
 * Props:
 * - isOpen: boolean que determina si el modal está visible.
 * - itemName: string con el nombre del elemento que se va a eliminar.
 * - onClose: función que se ejecuta al cerrar el modal sin eliminar.
 * - onConfirm: función que se ejecuta al confirmar la eliminación.
 * 
 * Comportamiento:
 * - Si `isOpen` es false, el modal no se renderiza.
 * - Al hacer clic en "Cancelar" o en el fondo, se llama a `onClose`.
 * - Al hacer clic en "Eliminar", se llama a `onConfirm`.
 * 
 * Autora: Daiana Armenta
 */


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