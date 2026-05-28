/*
  Warnings:

  - Added the required column `mapMarkerType` to the `Town` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MapMarkerType" AS ENUM ('MAJOR', 'MINOR');

-- AlterTable
ALTER TABLE "Town" ADD COLUMN     "mapMarkerType" "MapMarkerType" NOT NULL;
