/*
  Warnings:

  - You are about to drop the column `inboxHash` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `recipientEncryptedText` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `senderEncryptedText` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `inboxes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `directHash` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OFFLINE', 'ONLINE', 'IDLE', 'BUSY');

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "inboxHash",
DROP COLUMN "recipientEncryptedText",
DROP COLUMN "senderEncryptedText",
ADD COLUMN     "directHash" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OFFLINE',
ALTER COLUMN "publicKey" DROP NOT NULL;

-- DropTable
DROP TABLE "inboxes";

-- CreateTable
CREATE TABLE "directs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "lastMessage" TEXT NOT NULL,
    "unseenNumber" INTEGER NOT NULL DEFAULT 0,
    "updated" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "directs_pkey" PRIMARY KEY ("id")
);
