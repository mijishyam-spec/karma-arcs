"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNavItems, mainNavItems } from "@/config/navigation";
import { canViewModule } from "@/lib/permissions";
import type { Role } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItemsProps {
  role: Role;
  onNavigate?: () => void;
}

export function NavItems({ role, onNavigate }: NavItemsProps) {
  const pathname = usePathname();
  const items = [...mainNavItems, ...adminNavItems].filter((item) =>
    canViewModule(role, item.module)
  );

  return (
    <ScrollArea className="flex-1">
      <nav className="flex flex-col gap-1 px-2 py-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.phase !== undefined && (
                <Badge variant="outline" className="px-1 py-0 text-[10px]">
                  P{item.phase}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
