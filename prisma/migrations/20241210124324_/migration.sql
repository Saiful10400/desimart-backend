-- CreateTable
CREATE TABLE "recentProducts" (
    "recentProductId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recentProducts_pkey" PRIMARY KEY ("recentProductId")
);

-- AddForeignKey
ALTER TABLE "recentProducts" ADD CONSTRAINT "recentProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recentProducts" ADD CONSTRAINT "recentProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
