import { LoginTypeToggle, useSignupMutation } from "@/features/auth";
import { SignupForm } from "@/features/auth";
import { useNavigate } from "react-router";

export const SignupFormWithActions = () => {
  const [signup, { isLoading, error }] = useSignupMutation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await signup(values).unwrap();

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-105">
      <LoginTypeToggle />
      <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error?.status === 401 && (
        <div className="mt-2 text-center text-xs text-red-500">
          Не вірний email або пароль
        </div>
      )}
    </div>
  );
};
