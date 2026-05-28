/*
  Warnings:

  - A unique constraint covering the columns `[longitude,latitude]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `regionId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Location_townId_type_key";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "regionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_longitude_latitude_key" ON "Location"("longitude", "latitude");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
