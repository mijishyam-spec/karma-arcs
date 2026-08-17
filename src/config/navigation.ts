import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  FileText,
  HardHat,
  LayoutDashboard,
  Package,
  PenTool,
  Settings,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import type { Module } from "@/types";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  module: Module;
  phase?: number;
};

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    module: "dashboard",
  },
  {
    title: "Enquiries",
    href: "/enquiries",
    icon: ClipboardList,
    module: "enquiries",
    phase: 1,
  },
  {
    title: "Site Visits",
    href: "/site-visits",
    icon: Building2,
    module: "siteVisits",
    phase: 1,
  },
  {
    title: "Site Reports",
    href: "/site-reports",
    icon: HardHat,
    module: "siteReports",
    phase: 2,
  },
  {
    title: "Drawings",
    href: "/drawings",
    icon: PenTool,
    module: "drawings",
    phase: 3,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Building2,
    module: "projects",
    phase: 4,
  },
  {
    title: "Materials",
    href: "/materials",
    icon: Package,
    module: "materials",
    phase: 5,
  },
  {
    title: "Purchase",
    href: "/purchase",
    icon: ShoppingCart,
    module: "purchase",
    phase: 5,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: Wallet,
    module: "finance",
    phase: 6,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    module: "reports",
    phase: 7,
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    module: "admin",
  },
];
