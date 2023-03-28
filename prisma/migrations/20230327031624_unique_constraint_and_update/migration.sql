/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `groupConfig` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `login` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `userConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "groupConfig_groupId_key" ON "groupConfig"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "login_userId_key" ON "login"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userConfig_userId_key" ON "userConfig"("userId");
