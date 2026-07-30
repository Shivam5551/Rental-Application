/*
  Warnings:

  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'India',
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Property_city_idx" ON "Property"("city");

-- CreateIndex
CREATE INDEX "Property_state_idx" ON "Property"("state");

-- CreateIndex
CREATE INDEX "Property_country_idx" ON "Property"("country");
