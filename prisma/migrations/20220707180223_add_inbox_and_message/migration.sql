/*
  Warnings:

  - Added the required column `publicKey` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "publicKey" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "inboxes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "lastMessage" TEXT NOT NULL,
    "unseenNumber" INTEGER NOT NULL DEFAULT 0,
    "updated" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inboxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderEncryptedText" TEXT NOT NULL,
    "recipientEncryptedText" TEXT NOT NULL,
    "inboxHash" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
