import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const DEV_ADMIN_PASSWORD = "admin123";

async function main() {
  const passwordHash = await hash(DEV_ADMIN_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: "admin@karmaarcs.dev" },
    update: {
      name: "Admin User",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      email: "admin@karmaarcs.dev",
      name: "Admin User",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
