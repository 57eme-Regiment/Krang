-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SMALL_ARMS', 'HEAVY_ARMS', 'HEAVY_AMMUNITION', 'UTILITY', 'MEDICAL', 'RESSOURCE', 'UNIFORM', 'VEHICLE', 'SHIPPABLE');

-- CreateEnum
CREATE TYPE "SuperClass" AS ENUM ('MATERIAL', 'MAGAZINE');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('REFINED_MATERIAL', 'RIFLE_AMMO');

-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('WARDEN', 'COLONIAL', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('STORAGE_DEPOT', 'SEAPORT');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "category" "Category" NOT NULL,
    "superClass" "SuperClass" NOT NULL,
    "class" "Class" NOT NULL,
    "faction" "Faction" NOT NULL DEFAULT 'NEUTRAL',
    "nbByCrate" INTEGER NOT NULL,
    "maxQuantity" INTEGER NOT NULL,
    "icon" TEXT,
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "faction" "Faction" NOT NULL,
    "iconType" INTEGER NOT NULL DEFAULT 0,
    "flags" INTEGER NOT NULL DEFAULT 0,
    "viewDirection" INTEGER NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "townId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gameRegionId" INTEGER,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Town" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_townId_type_key" ON "Location"("townId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_key" ON "Town"("name");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Town" ADD CONSTRAINT "Town_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
