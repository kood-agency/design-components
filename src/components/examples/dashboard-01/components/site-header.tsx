import {
  BookOpenIcon,
  BotIcon,
  ChevronsUpDownIcon,
  CircleQuestionMarkIcon,
  CreditCardIcon,
  ExternalLinkIcon,
  LifeBuoyIcon,
  LogOutIcon,
  SendIcon,
  SettingsIcon,
  SquareUserIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  SidebarTrigger,
} from "../../../ui";

const menuGroups: { label: string; items: { icon: typeof BotIcon; title: string }[] }[] = [
  {
    label: "Platform",
    items: [
      { icon: SquareUserIcon, title: "Account" },
      { icon: CreditCardIcon, title: "Billing" },
      { icon: SettingsIcon, title: "Settings" },
      { icon: SendIcon, title: "Invite friends" },
    ],
  },
  {
    label: "Help Center",
    items: [
      { icon: LifeBuoyIcon, title: "Support" },
      { icon: BotIcon, title: "AI Chatbot" },
      { icon: BookOpenIcon, title: "Documentation" },
      {
        icon: ExternalLinkIcon,
        title: "Join Discord",
      },
    ],
  },
  {
    label: "FAQs",
    items: [{ icon: CircleQuestionMarkIcon, title: "Frequently asked questions" }],
  },
];

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b py-2.5">
      <div className="flex w-full items-center gap-1.5 px-4 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:block">
              <BreadcrumbPage>Acme Inc</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Documents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          {menuGroups.map((group) => (
            <DropdownMenu key={group.label}>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon-sm" className="max-md:hidden" />}
              >
                <span className="sr-only">Open {group.label} menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <Avatar className="size-6">
                    <AvatarFallback className="text-xs">CN</AvatarFallback>
                  </Avatar>
                  <ChevronsUpDownIcon className="size-3.5" />
                  <span className="sr-only">Open settings menu</span>
                </Button>
              }
            >
              <span className="sr-only">Open settings menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs">CN</AvatarFallback>
                    </Avatar>
                    <span className="grid flex-1 text-left leading-tight">
                      <span className="truncate font-medium">Carolyn Newton</span>
                      <span className="text-muted-foreground truncate text-xs">
                        c.newton@example.com
                      </span>
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SquareUserIcon className="size-4" /> <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon className="size-4" /> <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="size-4" /> <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="size-4" /> <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
