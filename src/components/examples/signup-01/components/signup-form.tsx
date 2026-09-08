import { GalleryVerticalEndIcon } from "lucide-react";
import { Button, Input, Label } from "../../../ui";

export function SignupForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">운영 계정을 만들고 팀과 함께 시작하세요</h1>
        <p className="text-muted-foreground text-sm text-balance">
          주식회사 코오드 디자인 시스템 운영 및 고객 성공 통합 관리 본부에서 사용할 업무용 이메일을
          입력하세요.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="signup-email">업무용 이메일</Label>
          <Input id="signup-email" type="email" placeholder="name@kood.design" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="signup-password">비밀번호</Label>
          <Input id="signup-password" type="password" required />
          <p className="text-muted-foreground text-xs">비밀번호는 8자 이상으로 입력하세요.</p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="signup-confirm">비밀번호 확인</Label>
          <Input id="signup-confirm" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          계정 만들기
        </Button>
      </div>
      <div className="text-center text-sm">
        이미 계정이 있으신가요?{" "}
        <a href="#" className="underline underline-offset-4">
          로그인
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
        주식회사 코오드 디자인 시스템 운영 및 고객 성공 통합 관리 본부
      </p>
    </div>
  );
}
