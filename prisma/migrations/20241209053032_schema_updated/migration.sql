/*
  Warnings:

  - You are about to drop the column `shopId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_shopId_fkey";

-- DropIndex
DROP INDEX "order_shopId_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "shopId";

-- CreateTable
CREATE TABLE "shopUser" (
    "userId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "shopUser_pkey" PRIMARY KEY ("userId","shopId")
);

-- AddForeignKey
ALTER TABLE "shopUser" ADD CONSTRAINT "shopUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopUser" ADD CONSTRAINT "shopUser_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;
