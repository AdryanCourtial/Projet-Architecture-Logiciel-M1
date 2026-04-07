/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Phone` DROP FOREIGN KEY `Phone_accountId_fkey`;

-- DropIndex
DROP INDEX `Phone_accountId_fkey` ON `Phone`;

-- AlterTable
ALTER TABLE `Phone` MODIFY `accountId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Phone_accountId_key` ON `Phone`(`accountId`);

-- AddForeignKey
ALTER TABLE `Phone` ADD CONSTRAINT `Phone_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
