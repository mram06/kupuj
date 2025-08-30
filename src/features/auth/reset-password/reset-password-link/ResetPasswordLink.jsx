import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { Link } from "react-router";

export const ResetPasswordLink = () => {
  return (
    <Link
      to={frontRoutes.pages.ResetPasswordPage.navigationPath}
      className="self-start underline line"
    >
      Забули пароль?
    </Link>
  );
};
