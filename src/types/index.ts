import type { Role } from "@prisma/client";

export type { Role };

export type Action = "view" | "create" | "edit" | "approve" | "delete";

export type Module =
  | "dashboard"
  | "enquiries"
  | "siteVisits"
  | "siteReports"
  | "drawings"
  | "projects"
  | "materials"
  | "purchase"
  | "finance"
  | "reports"
  | "admin";
