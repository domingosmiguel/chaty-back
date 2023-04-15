/*
  Warnings:

  - You are about to drop the column `recipientId` on the `group` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `pinnedConversation` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `recipient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[entityId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityId` to the `group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_from_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_to_fkey";

-- DropForeignKey
ALTER TABLE "pinnedConversation" DROP CONSTRAINT "pinnedConversation_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_recipientId_fkey";

-- DropIndex
DROP INDEX "user_recipientId_key";

-- AlterTable
ALTER TABLE "group" DROP COLUMN "recipientId",
ADD COLUMN     "entityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pinnedConversation" DROP COLUMN "recipientId",
ADD COLUMN     "entityId" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "recipientId",
ADD COLUMN     "entityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "recipient";

-- CreateTable
CREATE TABLE "entity" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_entityId_key" ON "user"("entityId");

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_fkey" FOREIGN KEY ("from") REFERENCES "entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_to_fkey" FOREIGN KEY ("to") REFERENCES "entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinnedConversation" ADD CONSTRAINT "pinnedConversation_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
