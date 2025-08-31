import { LoginFormWithActions } from "@/widgets/auth/LoginFormWithActions";

function LoginPage() {
  return (
    <>
      <section className="container">
        <div className="mx-auto max-w-105">
          <LoginFormWithActions />
        </div>
      </section>
    </>
  );
}

export default LoginPage;
