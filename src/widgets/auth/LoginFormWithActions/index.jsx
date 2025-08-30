import { LoginTypeToggle } from "@/features/auth";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { LoginForm } from "@/features/auth/login/login-form";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { NavLink, useLocation, useNavigate } from "react-router";

export const LoginFormWithActions = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await login(values).unwrap();

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-105">
      <LoginTypeToggle />
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error?.status === 401 && (
        <div className="mt-2 text-center text-xs text-red-500">
          Не вірний email або пароль
        </div>
      )}
    </div>
  );
};
