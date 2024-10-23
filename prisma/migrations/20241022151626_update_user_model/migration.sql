/*
  Warnings:

  - Made the column `rent_number` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `rent_number` INTEGER NOT NULL DEFAULT 0;
