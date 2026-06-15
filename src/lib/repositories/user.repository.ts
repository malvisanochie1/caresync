import { prisma } from "@/lib/db";

export async function findAllUsers() {
  return prisma.user.findMany({
    orderBy: { name: "asc" },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      assignedPatients: true,
      careLogs: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}
