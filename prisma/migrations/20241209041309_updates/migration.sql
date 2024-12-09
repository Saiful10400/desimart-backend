/*
  Warnings:

  - The `status` column on the `shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shop" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'Active';
