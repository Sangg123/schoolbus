/*
  Warnings:

  - The primary key for the `ParentStudent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[parentId,studentId]` on the table `ParentStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ParentStudent" DROP CONSTRAINT "ParentStudent_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "relationship" TEXT,
ADD CONSTRAINT "ParentStudent_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ParentStudent_parentId_studentId_key" ON "ParentStudent"("parentId", "studentId");
