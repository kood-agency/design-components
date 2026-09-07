import { cn } from "../../../lib/utils";
import { LoginForm, LoginFormLogo } from "./components/login-form";

export function Login01() {
  return (
    <div className="bg-background flex min-h-svh w-full">
      <LoginFormLogo />
      <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-10 lg:w-3/5">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export { cn };
