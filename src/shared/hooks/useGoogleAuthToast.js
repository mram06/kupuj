import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "@/shared/ui/Toast/toastSlice";

export const useGoogleAuthToast = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && localStorage.getItem("showAuthToast") === "true") {
      dispatch(
        addToast({
          type: "success",
          title: "Вітаємо!",
          description: "Ви успішно увійшли в систему",
        })
      );
      localStorage.removeItem("showAuthToast");
    }
  }, [user, dispatch]);
};
