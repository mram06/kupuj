import { LoginTypeToggle, useSignupMutation } from "@/features/auth";
import { SignupForm } from "@/features/auth";
import { GoogleAuthButton } from "@/features/auth/google-auth-button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToast } from "@/shared/ui/Toast/toastSlice";

export const SignupFormWithActions = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await signup(values).unwrap();

      dispatch(
        addToast({
          type: "success",
          title: "Вітаємо!",
          description: "Ви успішно зареєструвалися",
        })
      );

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);

      if (error?.status === 409) {
        dispatch(
          addToast({
            type: "error",
            title: "Помилка реєстрації",
            description: "Користувач з таким email вже існує",
          })
        );
      } else if (error?.status === 401) {
        dispatch(
          addToast({
            type: "error",
            title: "Помилка",
            description: "Невірні дані для реєстрації",
          })
        );
      } else {
        dispatch(
          addToast({
            type: "error",
            title: "Помилка",
            description: "Щось пішло не так. Спробуйте пізніше",
          })
        );
      }
    }
  };

  return (
    <>
      <LoginTypeToggle />
      <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error?.status === 401 && (
        <div className="mt-2 text-center text-xs text-red-500">
          Не вірний email або пароль
        </div>
      )}
      <div className="flex gap-2 items-center my-12">
        <span className="w-full h-0.5 bg-gray-300"></span>
        <span>Або</span>
        <span className="w-full h-0.5 bg-gray-300"></span>
      </div>
      <div className="flex flex-col">
        <GoogleAuthButton />
      </div>
    </>
  );
};
