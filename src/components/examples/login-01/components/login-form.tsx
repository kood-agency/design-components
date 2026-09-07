import { GalleryVerticalEndIcon } from "lucide-react";
import { Button, Input, Label } from "../../../ui";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-sm text-balance">Login to your Acme Inc account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="login-password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="login-password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
        </div>
        <Button variant="outline" type="button" className="w-full">
          Login with Email
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}

export function LoginFormLogo() {
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
