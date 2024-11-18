import { AuthWrapper } from "@/components/authentication/auth-wrapper";
import { LoginForm } from "@/components/authentication/login-form";

export function metadata() {
  return {
    title: "Login",
  };
}

export default async function Page() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
