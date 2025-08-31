import { Input } from "@/shared/ui/Input";
import useLoginForm from "../model/useLoginForm";
import { ResetPasswordLink } from "@/features/auth/reset-password/reset-password-link";
import { Button } from "@/shared/ui/Button";

export const LoginForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    field: { errors },
  } = useLoginForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        placeholder="Електронна пошта"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        type="password"
        placeholder="Пароль"
        autoComplete="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <ResetPasswordLink />
      <Button type="submit" isLoading={isLoading}>
        Увійти
      </Button>
    </form>
  );
};
