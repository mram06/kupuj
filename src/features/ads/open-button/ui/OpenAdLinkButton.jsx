import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useNavigate } from "react-router";

export const OpenAdLinkButton = ({ id }) => {
  const navigate = useNavigate();
  const handleLink = () => {
    navigate(frontRoutes.pages.AdPage.navigationPath(id));
  };

  return (
    <button
      onClick={handleLink}
      className="py-4 px-6 rounded-2xl bg-white hover:bg-gray-300 transition-colors cursor-pointer"
    >
      Відкрити оголошення
    </button>
  );
};
