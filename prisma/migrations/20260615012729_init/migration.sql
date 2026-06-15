-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PSW', 'NURSE', 'SUPERVISOR');

-- CreateEnum
CREATE TYPE "CareStatus" AS ENUM ('STABLE', 'ATTENTION', 'CRITICAL', 'COMPLETED', 'PENDING', 'MISSED');

-- CreateEnum
CREATE TYPE "MobilityLevel" AS ENUM ('INDEPENDENT', 'ASSISTED', 'DEPENDENT');

-- CreateEnum
CREATE TYPE "CareLogStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING_REVIEW', 'FLAGGED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PSW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "visitTime" TEXT NOT NULL,
    "status" "CareStatus" NOT NULL DEFAULT 'PENDING',
    "condition" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "lastCheck" TEXT NOT NULL,
    "nextVisit" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "medicalSummary" TEXT NOT NULL,
    "allergies" TEXT[],
    "mobilityLevel" "MobilityLevel" NOT NULL DEFAULT 'INDEPENDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedCaregiverId" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareLog" (
    "id" TEXT NOT NULL,
    "visitTime" TEXT NOT NULL,
    "medicationGiven" BOOLEAN NOT NULL DEFAULT false,
    "medicationTime" TEXT,
    "bloodPressure" TEXT NOT NULL DEFAULT '',
    "bloodSugar" TEXT NOT NULL DEFAULT '',
    "temperature" TEXT NOT NULL DEFAULT '',
    "mobilityNotes" TEXT NOT NULL DEFAULT '',
    "dietaryNotes" TEXT NOT NULL DEFAULT '',
    "careNotes" TEXT NOT NULL,
    "status" "CareLogStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "caregiverId" TEXT NOT NULL,

    CONSTRAINT "CareLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_assignedCaregiverId_fkey" FOREIGN KEY ("assignedCaregiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareLog" ADD CONSTRAINT "CareLog_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareLog" ADD CONSTRAINT "CareLog_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
