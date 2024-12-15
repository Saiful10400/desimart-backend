-- CreateTable
CREATE TABLE "order" (
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'Unpaid',
    "transectionId" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "productOrder" (
    "porductId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "productOrder_pkey" PRIMARY KEY ("porductId","orderId")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_porductId_fkey" FOREIGN KEY ("porductId") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
