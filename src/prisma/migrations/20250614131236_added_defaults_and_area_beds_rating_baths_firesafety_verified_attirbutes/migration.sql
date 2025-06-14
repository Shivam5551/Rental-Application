/*
  Warnings:

  - Added the required column `area` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baths` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "area" INTEGER NOT NULL,
ADD COLUMN     "baths" INTEGER NOT NULL,
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "firesafety" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "booked" SET DEFAULT false,
ALTER COLUMN "petfriendly" SET DEFAULT false,
ALTER COLUMN "discount" SET DEFAULT 0;
