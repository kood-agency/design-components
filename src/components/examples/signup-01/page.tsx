import { SignupForm, SignupFormLogo } from "./components/signup-form";

export function Signup01() {
  return (
    <div className="bg-background flex min-h-svh w-full">
      <SignupFormLogo />
      <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-10 lg:w-3/5">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
