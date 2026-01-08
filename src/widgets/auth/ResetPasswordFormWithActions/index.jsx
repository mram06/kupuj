import {
  useChangePasswordMutation,
  useResetPasswordMutation,
} from "@/features/auth";
import { ResetPasswordChangeForm } from "@/features/auth/reset-password/reset-password-change-form";
import { ResetPasswordGetTokenAgainButton } from "@/features/auth/reset-password/reset-password-get-token-again-button";
import { ResetPasswordGetTokenForm } from "@/features/auth/reset-password/reset-password-get-token-form";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import { useState } from "react";
import { useNavigate } from "react-router";

export const ResetPasswordFormWithActions = () => {
  const [currentStep, setCurrentStep] = useState("reset");
  const [userEmail, setUserEmail] = useState("");
  const [resetPassword, { isLoading: isResetLoading, error: resetError }] =
    useResetPasswordMutation();

  const handleGetResetCode = async (values) => {
    try {
      setUserEmail(values.email);
      await resetPassword(values).unwrap();
      setCurrentStep("change");
    } catch (error) {
      console.log(error);
    }
  };

  const [changePassword, { isLoading: isChangeLoading, error: changeError }] =
    useChangePasswordMutation();

  const navigate = useNavigate();
  const handleChangePassword = async (values) => {
    try {
      await changePassword({ email: userEmail, ...values }).unwrap();
      navigate(frontRoutes.pages.LoginPage.navigationPath);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-auto max-w-105">
      <h3 className="text-2xl font-semibold mb-4">Скинути пароль</h3>
      {currentStep === "reset" ? (
        <ResetPasswordGetTokenForm
          onSubmit={handleGetResetCode}
          isLoading={isResetLoading}
        />
      ) : (
        <ResetPasswordChangeForm
          onSubmit={handleChangePassword}
          isLoading={isChangeLoading}
        >
          <ResetPasswordGetTokenAgainButton userEmail={userEmail} />
        </ResetPasswordChangeForm>
      )}
    </div>
  );
};
