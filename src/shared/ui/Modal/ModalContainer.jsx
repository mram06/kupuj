import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { Modal } from "./Modal";
import { useModalCallback } from "./ModalContext";

export const ModalContainer = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { getCallback } = useModalCallback();

  const handleConfirm = async () => {
    const callback = getCallback();
    if (callback) {
      await callback();
    }
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      title={modal.title}
      description={modal.description}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText={modal.confirmText}
      cancelText={modal.cancelText}
      isDanger={modal.isDanger}
    />
  );
};
