import { Button } from "@/shared/ui/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../api/authSlice";
import { useLogoutMutation } from "../../api/authApi";
import { useNavigate } from "react-router";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { addToast } from "@/shared/ui/Toast/toastSlice";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutMutation();
    dispatch(logout());
    navigate(frontRoutes.pages.HomePage.navigationPath);

    dispatch(
      addToast({
        type: "info",
        title: "Вихід",
        description: "Ви вийшли із облікового запису",
      })
    );
  };

  return (
    <Button onClick={handleLogout} danger>
      Вихід
    </Button>
  );
};
