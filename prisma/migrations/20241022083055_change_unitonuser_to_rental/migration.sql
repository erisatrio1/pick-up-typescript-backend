/*
  Warnings:

  - You are about to drop the `unitonusers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `multiple_by` to the `units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `unitonusers` DROP FOREIGN KEY `UnitOnUsers_unitId_fkey`;

-- DropForeignKey
ALTER TABLE `unitonusers` DROP FOREIGN KEY `UnitOnUsers_userId_fkey`;

-- AlterTable
ALTER TABLE `units` ADD COLUMN `multiple_by` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- DropTable
DROP TABLE `unitonusers`;

-- CreateTable
CREATE TABLE `rentals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `unitId` INTEGER NOT NULL,
    `rent_start` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rent_end` DATETIME(3) NULL,
    `due_date` DATETIME(3) NOT NULL,
    `fine_per_day` INTEGER NOT NULL DEFAULT 50000,
    `total_fine` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
