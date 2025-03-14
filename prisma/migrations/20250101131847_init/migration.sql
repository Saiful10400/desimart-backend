-- AlterTable
ALTER TABLE "product" ADD COLUMN     "brandId" TEXT NOT NULL DEFAULT '7d8dba7c-8de0-419a-b84c-6b90cb88f260';

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("brandId") ON DELETE RESTRICT ON UPDATE CASCADE;
