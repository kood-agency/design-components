import { GalleryVerticalEndIcon } from "lucide-react";
import { Button, Input, Label } from "../../../ui";

export function LoginForm() {
  return (
    <form className="flex min-w-0 flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl leading-snug font-semibold text-balance [overflow-wrap:anywhere] break-keep">
          코오드 디자인 시스템 운영 계정으로 다시 로그인하세요
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed [overflow-wrap:anywhere] break-keep">
          주식회사 코오드 디자인 시스템 운영 및 고객 성공 통합 관리 본부 계정으로 계속합니다.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="login-email">업무용 이메일</Label>
          <Input id="login-email" type="email" placeholder="name@kood.design" required />
        </div>
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <Label htmlFor="login-password">비밀번호</Label>
            <a
              href="#"
              className="text-accent-foreground text-sm underline-offset-4 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <Input id="login-password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          로그인
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-3">
            또는 이메일로 계속
          </span>
        </div>
        <Button variant="outline" type="button" className="w-full">
          이메일 로그인
        </Button>
      </div>
      <div className="text-muted-foreground text-center text-sm leading-relaxed">
        아직 계정이 없으신가요?{" "}
        <a href="#" className="text-accent-foreground underline underline-offset-4">
          계정 만들기
        </a>
      </div>
    </form>
  );
}

export function LoginFormLogo() {
  return (
    <div className="bg-muted text-muted-foreground hidden min-h-svh flex-col items-center justify-center gap-6 border-r p-6 md:flex md:w-1/2 lg:w-2/5 xl:p-8">
      <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-lg">
        <GalleryVerticalEndIcon className="size-5" />
      </div>
      <p className="text-foreground max-w-xs text-center text-sm leading-relaxed font-medium text-balance [overflow-wrap:anywhere] break-keep">
        주식회사 코오드 디자인 시스템 운영 및 고객 성공 통합 관리 본부
      </p>
    </div>
  );
}
