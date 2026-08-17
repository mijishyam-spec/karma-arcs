"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItems } from "./NavItems";
import type { Role } from "@/types";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
  role: Role;
}

export function Header({ user, role }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={buttonVariants({ variant: "ghost", size: "icon", className: "md:hidden" })}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center border-b px-4">
              <span className="text-lg font-semibold tracking-tight">
                Karma <span className="text-primary">Arcs</span>
              </span>
            </div>
            <NavItems role={role} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <span className="text-lg font-semibold tracking-tight md:hidden">
          Karma <span className="text-primary">Arcs</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <Badge variant="secondary" className="text-xs">
            {user.role}
          </Badge>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
