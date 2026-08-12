import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatRole(role: string) {
  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Welcome, {user?.name ?? "User"}</CardTitle>
        <CardDescription>
          Signed in as {user?.email ?? "unknown user"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {user?.role ? formatRole(user.role) : "Unknown role"}
        </div>
        <p className="text-sm text-muted-foreground">
          Dashboard modules and role-based navigation will be added in Sprint
          2. You are authenticated and ready for Phase 0 completion testing.
        </p>
      </CardContent>
    </Card>
  );
}
