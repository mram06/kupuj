import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useNavigate } from "react-router";

export const CategoryLinkButton = ({ id, children }) => {
  const navigate = useNavigate();
  const handleLink = () => {
    navigate(frontRoutes.pages.AdsPage.navigationPath(id));
  };

  return (
    <button onClick={handleLink} className="btn-secondary">
      {children}
    </button>
  );
};
