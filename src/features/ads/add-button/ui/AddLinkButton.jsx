import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useNavigate } from "react-router";

export const AddLinkButton = () => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(frontRoutes.pages.AddAdPage.navigationPath);
  };
  return (
    <button
      onClick={handleLink}
      className="py-4 px-6 rounded-2xl text-white font-bold bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
    >
      Додати оголошення
    </button>
  );
};
