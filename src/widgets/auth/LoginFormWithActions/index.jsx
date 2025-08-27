import { useLoginMutation } from "@/features/auth/api/authApi";
import { LoginForm } from "@/features/auth/login/login-form";

export const LoginFormWithActions = () => {
  const [login, { isLoding, error }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    login(data);
  };

  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};
