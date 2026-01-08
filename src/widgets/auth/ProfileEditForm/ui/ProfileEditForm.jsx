import { useState } from "react";
import { useUpdateProfileMutation } from "@/features/auth/api/authApi";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";

export const ProfileEditForm = ({ user }) => {
  const navigate = useNavigate();
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastname: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setSuccessMessage("");
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Ім'я є обов'язковим";
    }

    if (!formData.lastname.trim()) {
      errors.lastname = "Прізвище є обов'язковим";
    }

    if (!formData.email.trim()) {
      errors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Невірний формат email";
    }

    if (formData.phone.trim() && !/^\+?[\d\s()-]{10,}$/.test(formData.phone)) {
      errors.phone = "Невірний формат телефону";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await updateProfile(formData).unwrap();
      setSuccessMessage("Профіль успішно оновлено!");
      setValidationErrors({});
    } catch (err) {
      console.error("Failed to update profile:", err);
      if (err.data?.errors) {
        setValidationErrors(err.data.errors);
      } else {
        setValidationErrors({
          submit: err.data?.message || "Помилка при оновленні профілю",
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-2xl">
            {successMessage}
          </div>
        )}

        {/* General Error */}
        {validationErrors.submit && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-2xl">
            {validationErrors.submit}
          </div>
        )}

        {/* API Error */}
        {error && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-2xl">
            {error.data?.message ||
              "Помилка при оновленні профілю. Спробуйте ще раз."}
          </div>
        )}

        {/* Name Field */}
        <Input
          label="Ім'я"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={validationErrors.name}
          placeholder="Введіть ваше ім'я"
        />

        {/* Lastname Field */}
        <Input
          label="Прізвище"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          error={validationErrors.lastname}
          placeholder="Введіть ваше прізвище"
        />

        {/* Email Field */}
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={validationErrors.email}
          placeholder="Введіть вашу электронну адресу"
        />

        {/* Phone Field */}
        <Input
          label="Телефон (опційно)"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={validationErrors.phone}
          placeholder="+38 (099) 123-45-67"
          hint="Введіть телефон у будь-якому форматі"
        />

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Зберегти зміни
          </Button>
          <Button type="button" secondary onClick={() => navigate(-1)}>
            Скасувати
          </Button>
        </div>

        {/* Password Change Info */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            Безпека облікового запису
          </h3>
          <p className="text-gray-600 mb-4">
            Для зміни пароля скористайтеся окремою формою в налаштуваннях
            безпеки.
          </p>
          <Button
            onClick={() =>
              navigate(frontRoutes.pages.ResetPasswordPage.navigationPath)
            }
            secondary
            type="button"
          >
            Змінити пароль
          </Button>
        </div>
      </form>
    </div>
  );
};
