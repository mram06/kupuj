import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router";

export const CategoryLinkButton = ({ id, children }) => {
  const navigate = useNavigate();
  const handleLink = () => {
    navigate(frontRoutes.pages.AdsPage.navigationPath(id));
  };

  return (
    <Button onClick={handleLink} secondary>
      {children}
    </Button>
  );
};
