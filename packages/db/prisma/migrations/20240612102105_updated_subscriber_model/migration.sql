/*
  Warnings:

  - Added the required column `appid` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "appid" TEXT NOT NULL;
