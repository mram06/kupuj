import { Input } from "@/shared/ui/Input";
import useSignupForm from "../model/useSignupForm";
import { Button } from "@/shared/ui/Button";

export const SignupForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    field: { errors },
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        placeholder="Ім'я"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        placeholder="Телефон"
        type="phone"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Input
        placeholder="Електронна пошта"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        type="password"
        placeholder="Пароль"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        type="password"
        placeholder="Повторіть пароль"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" isLoading={isLoading}>
        Зареєструватися
      </Button>
    </form>
  );
};
