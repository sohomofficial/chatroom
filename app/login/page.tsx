import AuthForm from "@/components/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Login;
