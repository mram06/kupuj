import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useResetPasswordForm } from "../model/useResetPasswordForm";

export const ResetPasswordGetTokenForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    field: { errors },
  } = useResetPasswordForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        placeholder="Електронна пошта"
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" isLoading={isLoading}>
        Підтвердити
      </Button>
    </form>
  );
};
