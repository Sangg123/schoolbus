/*
  Warnings:

  - You are about to drop the column `tripType` on the `Schedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[routeId,dayOfWeek]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Schedule_routeId_dayOfWeek_tripType_key";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "tripType",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_routeId_dayOfWeek_key" ON "Schedule"("routeId", "dayOfWeek");
