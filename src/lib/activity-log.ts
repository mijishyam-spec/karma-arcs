import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type LogActivityInput = {
  userId: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
};

export async function logActivity(input: LogActivityInput) {
  return prisma.activityLog.create({
    data: {
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    },
  });
}
