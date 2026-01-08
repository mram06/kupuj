import { Button } from "../Button";

export const Modal = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
  isDanger = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-around gap-3">
          <Button white onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} danger={isDanger}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
