/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Token` table. All the data in the column will be lost.
  - Added the required column `refreshTokenHash` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "refreshToken",
ADD COLUMN     "refreshTokenHash" TEXT NOT NULL;
