import { GalleryVerticalEndIcon } from "lucide-react";
import { Button, Input, Label } from "../../../ui";

export function SignupForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="signup-password">Password</Label>
          <Input id="signup-password" type="password" required />
          <p className="text-muted-foreground text-xs">Must be at least 8 characters long</p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="signup-confirm">Confirm password</Label>
          <Input id="signup-confirm" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}

export function SignupFormLogo() {
  return (
    <div className="bg-muted text-muted-foreground relative hidden min-h-svh flex-col items-center justify-center gap-4 p-6 md:flex md:w-1/2 lg:w-2/5">
      <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-lg">
        <GalleryVerticalEndIcon className="size-5" />
      </div>
      <p className="text-foreground text-center text-sm font-medium">
        Acme Inc — the fastest way to build dashboards
      </p>
    </div>
  );
}
