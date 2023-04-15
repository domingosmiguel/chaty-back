/*
  Warnings:

  - Made the column `from` on table `message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `to` on table `message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "message" ALTER COLUMN "from" SET NOT NULL,
ALTER COLUMN "to" SET NOT NULL;
