-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE "buyer" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'Active';
