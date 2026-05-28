/*
  Warnings:

  - A unique constraint covering the columns `[name,regionId]` on the table `Town` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Town_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_regionId_key" ON "Town"("name", "regionId");
