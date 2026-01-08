import editImg from "@/assets/icons/edit.svg";
import { useSelector, useDispatch } from "react-redux";
import { addToast } from "@/shared/ui/Toast/toastSlice";
import { useNavigate } from "react-router";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

export const EditAdButton = ({ id, rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleEdit = (e) => {
    e.stopPropagation();
    if (user) {
      navigate(frontRoutes.pages.EditAdPage.navigationPath(id));
    } else {
      dispatch(
        addToast({
          type: "warning",
          title: "Потрібна авторизація",
          description: "Увійдіть, щоб редагувати оголошення",
        })
      );
    }
  };

  return (
    <div onClick={handleEdit} className="cursor-pointer" {...rest}>
      <img src={editImg} className="w-6 h-6" />
    </div>
  );
};
