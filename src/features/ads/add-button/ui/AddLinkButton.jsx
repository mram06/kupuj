import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useNavigate } from "react-router";

export const AddLinkButton = () => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(frontRoutes.pages.AddAdPage.navigationPath);
  };
  return (
    <button onClick={handleLink} className="btn-primary">
      Додати оголошення
    </button>
  );
};
