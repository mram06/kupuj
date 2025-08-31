import { Button } from "@/shared/ui/Button";

export const GoogleAuthButton = () => {
  const handleClick = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH;
  };

  return <Button onClick={handleClick}>Google</Button>;
};
