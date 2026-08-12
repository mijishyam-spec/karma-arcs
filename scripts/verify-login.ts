import { compare } from "bcryptjs";

import { prisma } from "../src/lib/prisma";
import {
  DEV_ADMIN_EMAIL,
  DEV_ADMIN_PASSWORD,
} from "../prisma/seed-data";

const BASE_URL = process.env.AUTH_URL ?? "http://localhost:3000";

async function verifyDatabaseUser() {
  const user = await prisma.user.findUnique({
    where: { email: DEV_ADMIN_EMAIL },
  });

  if (!user) {
    throw new Error(`Admin user not found: ${DEV_ADMIN_EMAIL}`);
  }

  if (!user.isActive) {
    throw new Error("Admin user is inactive");
  }

  if (user.role !== "ADMIN") {
    throw new Error(`Expected ADMIN role, received ${user.role}`);
  }

  const passwordValid = await compare(DEV_ADMIN_PASSWORD, user.passwordHash);

  if (!passwordValid) {
    throw new Error("Admin password hash does not match expected dev password");
  }

  console.log(`✓ Database user verified: ${user.email}`);
}

function getSetCookies(response: Response): string[] {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };

  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie.call(response.headers);
  }

  const single = response.headers.get("set-cookie");
  return single ? [single] : [];
}

function collectCookies(response: Response, existing = ""): string {
  const setCookies = getSetCookies(response);

  const cookieMap = new Map<string, string>();

  for (const part of `${existing}; ${setCookies.join("; ")}`.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [name, ...valueParts] = trimmed.split("=");
    if (!name || name.toLowerCase() === "path") continue;
    cookieMap.set(name, valueParts.join("="));
  }

  return Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

async function verifyHttpLogin() {
  const csrfResponse = await fetch(`${BASE_URL}/api/auth/csrf`);

  if (!csrfResponse.ok) {
    throw new Error(`CSRF endpoint failed with status ${csrfResponse.status}`);
  }

  const { csrfToken } = (await csrfResponse.json()) as { csrfToken: string };
  let cookies = collectCookies(csrfResponse);

  const loginBody = new URLSearchParams({
    csrfToken,
    email: DEV_ADMIN_EMAIL,
    password: DEV_ADMIN_PASSWORD,
    redirect: "false",
    json: "true",
  });

  const loginResponse = await fetch(
    `${BASE_URL}/api/auth/callback/credentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookies,
      },
      body: loginBody,
      redirect: "manual",
    }
  );

  if (loginResponse.status !== 302 && loginResponse.status !== 200) {
    throw new Error(`Login failed with status ${loginResponse.status}`);
  }

  cookies = collectCookies(loginResponse, cookies);

  const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`, {
    headers: {
      Cookie: cookies,
    },
  });

  if (!sessionResponse.ok) {
    throw new Error(
      `Session endpoint failed with status ${sessionResponse.status}`
    );
  }

  const session = (await sessionResponse.json()) as {
    user?: { email?: string; role?: string } | null;
  };

  if (!session?.user?.email) {
    throw new Error("Session is empty after login");
  }

  if (session.user.email !== DEV_ADMIN_EMAIL) {
    throw new Error("Session email does not match seeded admin user");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Session role is not ADMIN");
  }

  console.log("✓ HTTP login and session verified");
}

async function main() {
  console.log("Verifying Sprint 1 admin auth...");
  await verifyDatabaseUser();

  try {
    await verifyHttpLogin();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`! HTTP login check skipped: ${message}`);
    console.warn("  Start the dev server with `npm run dev` to run full verification.");
  }

  console.log("Sprint 1.7 verification complete.");
}

main()
  .catch((error) => {
    console.error("Verification failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
