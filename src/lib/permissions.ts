import type { Role } from "@prisma/client";

import type { Action, Module } from "@/types";

type PermissionLevel = "none" | "view" | "partial" | "create" | "full";

const rolePermissions: Record<Role, Record<Module, PermissionLevel>> = {
  ADMIN: {
    dashboard: "full",
    enquiries: "full",
    siteVisits: "full",
    siteReports: "full",
    drawings: "full",
    projects: "full",
    materials: "full",
    purchase: "full",
    finance: "full",
    reports: "full",
    admin: "full",
  },
  ARCHITECT: {
    dashboard: "view",
    enquiries: "view",
    siteVisits: "full",
    siteReports: "view",
    drawings: "full",
    projects: "view",
    materials: "view",
    purchase: "none",
    finance: "none",
    reports: "partial",
    admin: "none",
  },
  SUPERVISOR: {
    dashboard: "view",
    enquiries: "none",
    siteVisits: "none",
    siteReports: "full",
    drawings: "none",
    projects: "view",
    materials: "create",
    purchase: "none",
    finance: "none",
    reports: "partial",
    admin: "none",
  },
  CRM: {
    dashboard: "view",
    enquiries: "full",
    siteVisits: "full",
    siteReports: "view",
    drawings: "view",
    projects: "view",
    materials: "view",
    purchase: "view",
    finance: "view",
    reports: "partial",
    admin: "none",
  },
  PURCHASE: {
    dashboard: "view",
    enquiries: "none",
    siteVisits: "none",
    siteReports: "none",
    drawings: "none",
    projects: "view",
    materials: "full",
    purchase: "full",
    finance: "view",
    reports: "partial",
    admin: "none",
  },
  ACCOUNTS: {
    dashboard: "view",
    enquiries: "none",
    siteVisits: "none",
    siteReports: "none",
    drawings: "none",
    projects: "view",
    materials: "view",
    purchase: "view",
    finance: "full",
    reports: "partial",
    admin: "none",
  },
};

function levelAllowsAction(level: PermissionLevel, action: Action): boolean {
  if (level === "none") return false;
  if (level === "full") return true;
  if (level === "partial") return action === "view";
  if (level === "create") return action === "view" || action === "create";
  if (level === "view") return action === "view";
  return false;
}

export function can(role: Role, action: Action, module: Module): boolean {
  const level = rolePermissions[role][module];
  return levelAllowsAction(level, action);
}

export function canViewModule(role: Role, module: Module): boolean {
  return can(role, "view", module);
}

export function getModuleForPath(pathname: string): Module | null {
  if (pathname === "/" || pathname.startsWith("/unauthorized")) {
    return pathname === "/" ? "dashboard" : null;
  }

  const routeMap: Array<[string, Module]> = [
    ["/enquiries", "enquiries"],
    ["/site-visits", "siteVisits"],
    ["/site-reports", "siteReports"],
    ["/drawings", "drawings"],
    ["/projects", "projects"],
    ["/materials", "materials"],
    ["/purchase", "purchase"],
    ["/finance", "finance"],
    ["/reports", "reports"],
    ["/settings", "admin"],
  ];

  const match = routeMap.find(([prefix]) => pathname.startsWith(prefix));
  return match ? match[1] : null;
}

export function formatRole(role: Role): string {
  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
