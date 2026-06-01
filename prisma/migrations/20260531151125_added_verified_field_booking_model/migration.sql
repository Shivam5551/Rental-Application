-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'CAPTURED';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
