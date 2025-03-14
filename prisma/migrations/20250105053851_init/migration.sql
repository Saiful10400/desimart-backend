/*
  Warnings:

  - Added the required column `updated` to the `banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banner" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;
