-- CreateTable
CREATE TABLE "banner" (
    "bannerId" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "route" TEXT,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("bannerId")
);
