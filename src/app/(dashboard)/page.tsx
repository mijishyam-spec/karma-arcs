import { auth } from "@/lib/auth";
import { formatRole } from "@/lib/permissions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Role } from "@/types";

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user?.role as Role | undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your role</CardTitle>
            <CardDescription>Current access level</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {role ? formatRole(role) : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 0</CardTitle>
            <CardDescription>Foundation sprint</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Auth, RBAC, app shell, and placeholder modules are live. Feature
              modules arrive in Phases 1–7.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staging</CardTitle>
            <CardDescription>karma-arcs.vercel.app</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use the sidebar to explore modules available to your role. Restricted
              routes redirect to the unauthorized page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
