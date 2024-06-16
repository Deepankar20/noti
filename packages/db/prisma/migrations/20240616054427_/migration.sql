/*
  Warnings:

  - Made the column `subscriberId` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_subscriberId_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "subsId" INTEGER,
ALTER COLUMN "subscriberId" SET NOT NULL,
ALTER COLUMN "subscriberId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_subsId_fkey" FOREIGN KEY ("subsId") REFERENCES "Subscriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
