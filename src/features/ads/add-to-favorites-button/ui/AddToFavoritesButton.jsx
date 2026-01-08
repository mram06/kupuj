import star from "@/assets/icons/star.svg";
import greenStar from "@/assets/icons/green-star.svg";
import { useAddToFavoritesMutation } from "../../api/advertsApi";
import { useSelector, useDispatch } from "react-redux";
import { addToast } from "@/shared/ui/Toast/toastSlice";

export const AddToFavoritesButton = ({ id, rest }) => {
  const [add] = useAddToFavoritesMutation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const favoritesList = useSelector((state) => state.favorites.favoritesList);
  const isFavorite = () => {
    return favoritesList.some((favId) => favId === id);
  };

  const addToFavorites = async (e) => {
    e.stopPropagation();
    if (user) {
      await add({ id });
      if (isFavorite())
        dispatch(
          addToast({
            type: "success",
            title: "Успішно!",
            description: "Оголошення видалено зі списку обраних",
          })
        );
      else
        dispatch(
          addToast({
            type: "success",
            title: "Успішно!",
            description: "Оголошення додано до списку обраних",
          })
        );
    } else {
      dispatch(
        addToast({
          type: "warning",
          title: "Потрібна авторизація",
          description: "Увійдіть, щоб додати оголошення до обраного",
        })
      );
    }
  };

  return (
    <div onClick={addToFavorites} className="cursor-pointer" {...rest}>
      <img src={isFavorite() ? greenStar : star} />
    </div>
  );
};
