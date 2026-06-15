import { prisma } from "@/lib/db";

export async function findAllCareLogs() {
  return prisma.careLog.findMany({
    include: { patient: true, caregiver: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function findCareLogById(id: string) {
  return prisma.careLog.findUnique({
    where: { id },
    include: { patient: true, caregiver: true },
  });
}

export async function findCareLogsByPatient(patientId: string) {
  return prisma.careLog.findMany({
    where: { patientId },
    include: { caregiver: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function findCareLogsByCaregiver(caregiverId: string) {
  return prisma.careLog.findMany({
    where: { caregiverId },
    include: { patient: true },
    orderBy: { createdAt: "desc" },
  });
}
