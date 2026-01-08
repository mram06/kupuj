import deleteImg from "@/assets/icons/delete.png";
import { useDispatch } from "react-redux";
import { addToast } from "@/shared/ui/Toast/toastSlice";
import { openModal } from "@/shared/ui/Modal";
import { useModalCallback } from "@/shared/ui/Modal/ModalContext";
import { useDeleteMutation } from "../../api/advertsApi";
import { useNavigate } from "react-router";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

export const DeleteAdButton = ({ id, rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAd] = useDeleteMutation();
  const { setCallback } = useModalCallback();

  const handleDeleteClick = (e) => {
    e.stopPropagation();

    const handleConfirm = async () => {
      try {
        await deleteAd({ id }).unwrap();
        dispatch(
          addToast({
            type: "success",
            title: "Успішно!",
            description: "Оголошення видалено",
          })
        );
        setTimeout(() => {
          navigate(frontRoutes.pages.ProfilePage.navigationPath);
        }, 500);
      } catch {
        dispatch(
          addToast({
            type: "error",
            title: "Помилка!",
            description: "Не вдалось видалити оголошення",
          })
        );
      }
    };

    setCallback(handleConfirm);
    dispatch(
      openModal({
        title: "Видалити оголошення?",
        description:
          "Ви впевнені, що хочете видалити це оголошення? Цю дію не можна скасувати.",
        confirmText: "Видалити",
        cancelText: "Скасувати",
        isDanger: true,
      })
    );
  };

  return (
    <div onClick={handleDeleteClick} className="cursor-pointer" {...rest}>
      <img src={deleteImg} className="w-6 h-6" />
    </div>
  );
};
