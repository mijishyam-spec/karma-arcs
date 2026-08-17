import { NavItems } from "./NavItems";
import type { Role } from "@/types";

interface SidebarProps {
  role: Role;
}

export function Sidebar({ role }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold tracking-tight">
          Karma <span className="text-primary">Arcs</span>
        </span>
      </div>
      <NavItems role={role} />
    </aside>
  );
}
