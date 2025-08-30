import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

import { CodeInput } from "@/shared/ui/CodeInput/Index";
import { useResetPasswordChangeForm } from "../model/useResetPasswordChangeForm";
import { ResetPasswordGetTokenAgainButton } from "@/features/auth/reset-password/reset-password-get-token-again-button";

export const ResetPasswordChangeForm = ({ onSubmit, isLoading, children }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    field: { errors },
  } = useResetPasswordChangeForm();

  const codeValue = watch("resetCode");

  const handleCodeChange = (value) => {
    setValue("resetCode", value, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label>Код підтвердження</label>
        <CodeInput
          length={6}
          value={codeValue}
          onChange={handleCodeChange}
          error={errors.resetCode?.message}
        />
        {errors.resetCode && (
          <p className="text-red-500 text-sm mt-1">
            {errors.resetCode.message}
          </p>
        )}
      </div>
      {children}

      <Input
        placeholder="Новий пароль"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        placeholder="Повторіть пароль"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" isLoading={isLoading}>
        Підтвердити
      </Button>
    </form>
  );
};
