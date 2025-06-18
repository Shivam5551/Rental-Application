/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,propertyId,startDate,orderId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpayOrderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Booking_userId_propertyId_startDate_key";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_orderId_key" ON "Booking"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_propertyId_startDate_orderId_key" ON "Booking"("userId", "propertyId", "startDate", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorpayOrderId_key" ON "Payment"("razorpayOrderId");
