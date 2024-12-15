/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('Paid', 'Unpaid');

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_productId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- DropTable
DROP TABLE "order";
