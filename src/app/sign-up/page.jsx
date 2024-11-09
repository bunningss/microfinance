import { AuthWrapper } from "@/components/authentication/auth-wrapper";
import { RegisterForm } from "@/components/authentication/register-form";

export function metadata() {
  return {
    title: "Register",
  };
}

export default async function Page() {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
}
