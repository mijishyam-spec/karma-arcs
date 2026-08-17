import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    email: "admin@karmaarcs.dev",
    name: "Admin User",
    password: "admin123",
    role: Role.ADMIN,
  },
  {
    email: "architect@karmaarcs.dev",
    name: "Architect User",
    password: "dev123",
    role: Role.ARCHITECT,
  },
  {
    email: "supervisor@karmaarcs.dev",
    name: "Supervisor User",
    password: "dev123",
    role: Role.SUPERVISOR,
  },
  {
    email: "crm@karmaarcs.dev",
    name: "CRM User",
    password: "dev123",
    role: Role.CRM,
  },
  {
    email: "purchase@karmaarcs.dev",
    name: "Purchase User",
    password: "dev123",
    role: Role.PURCHASE,
  },
  {
    email: "accounts@karmaarcs.dev",
    name: "Accounts User",
    password: "dev123",
    role: Role.ACCOUNTS,
  },
] as const;

async function main() {
  for (const user of users) {
    const passwordHash = await hash(user.password, 12);
    const record = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        passwordHash,
        role: user.role,
        isActive: true,
      },
      create: {
        email: user.email,
        name: user.name,
        passwordHash,
        role: user.role,
        isActive: true,
      },
    });
    console.log(`Seeded: ${record.email} (${record.role})`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
