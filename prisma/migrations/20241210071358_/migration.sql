-- CreateTable
CREATE TABLE "coupne" (
    "coupneId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "minimumExpence" INTEGER NOT NULL,
    "untill" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupne_pkey" PRIMARY KEY ("coupneId")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupne_shopId_key" ON "coupne"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "coupne_code_key" ON "coupne"("code");

-- AddForeignKey
ALTER TABLE "coupne" ADD CONSTRAINT "coupne_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("shopId") ON DELETE RESTRICT ON UPDATE CASCADE;
