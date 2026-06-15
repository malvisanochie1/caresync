import { prisma } from "@/lib/db";

export async function findAllPatients() {
  return prisma.patient.findMany({
    include: { assignedCaregiver: true },
    orderBy: { visitTime: "asc" },
  });
}

export async function findPatientById(id: string) {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      assignedCaregiver: true,
      careLogs: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function findPatientsByCaregiver(caregiverId: string) {
  return prisma.patient.findMany({
    where: { assignedCaregiverId: caregiverId },
    orderBy: { visitTime: "asc" },
  });
}
