import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

import { DEV_ADMIN_EMAIL, DEV_ADMIN_PASSWORD } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash(DEV_ADMIN_PASSWORD, 12);

  const admin = await prisma.user.upsert({
    where: { email: DEV_ADMIN_EMAIL },
    update: {
      name: "Admin User",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      email: DEV_ADMIN_EMAIL,
      name: "Admin User",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log(`Seeded admin user: ${admin.email} (${admin.role})`);
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
