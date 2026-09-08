import { SignupForm, SignupFormLogo } from "./components/signup-form";

export function Signup01() {
  return (
    <div className="bg-background flex min-h-svh w-full">
      <SignupFormLogo />
      <div className="flex w-full min-w-0 items-center justify-center px-4 py-10 md:w-1/2 md:px-6 lg:w-3/5 xl:px-8">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
