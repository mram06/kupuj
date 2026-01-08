import { Button } from "@/shared/ui/Button";
import googleLogo from "@/assets/icons/google.svg";

export const GoogleAuthButton = () => {
  const handleClick = () => {
    localStorage.setItem("showAuthToast", "true");
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH;
  };

  return (
    <Button onClick={handleClick}>
      <img src={googleLogo} className="w-5 h-5" />
      Google
    </Button>
  );
};
