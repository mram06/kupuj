import { LoginTypeToggle } from "@/features/auth";
import { useLoginMutation } from "@/features/auth/api/authApi";
import { GoogleAuthButton } from "@/features/auth/google-auth-button";
import { LoginForm } from "@/features/auth/login/login-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToast } from "@/shared/ui/Toast/toastSlice";

export const LoginFormWithActions = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/";
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await login(values).unwrap();

      dispatch(
        addToast({
          type: "success",
          title: "Вітаємо!",
          description: "Ви успішно увійшли в систему",
        })
      );

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);

      if (error?.status === 401) {
        dispatch(
          addToast({
            type: "error",
            title: "Помилка входу",
            description: "Невірний email або пароль",
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
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
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
