/*
  Warnings:

  - You are about to drop the column `amount` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `toUserId` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `receiverUserId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUserId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_id_fkey";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "amount",
DROP COLUMN "toUserId",
ADD COLUMN     "receiverUserId" INTEGER NOT NULL,
ADD COLUMN     "senderUserId" INTEGER NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
