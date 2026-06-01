-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "razorpayPaymentId" DROP NOT NULL,
ALTER COLUMN "razorpaySignature" DROP NOT NULL;
