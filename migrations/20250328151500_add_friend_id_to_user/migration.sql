/*
  Warnings:

  - A unique constraint covering the columns `[friendID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "friendID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_friendID_key" ON "User"("friendID");
