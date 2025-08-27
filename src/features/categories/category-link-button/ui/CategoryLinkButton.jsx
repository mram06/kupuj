import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useNavigate } from "react-router";

export const CategoryLinkButton = ({ id, children }) => {
  const navigate = useNavigate();
  const handleLink = () => {
    navigate(frontRoutes.pages.AdsPage.navigationPath(id));
  };

  return (
    <button
      onClick={handleLink}
      className="bg-gray-100 py-4 px-6 rounded-2xl border-1 border-gray-200 hover:bg-gray-200 transition-colors duration-200"
    >
      {children}
    </button>
  );
};
