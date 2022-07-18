/*
  Warnings:

  - A unique constraint covering the columns `[user_and_sender_id]` on the table `directs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_and_sender_id` to the `directs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "directs" ADD COLUMN     "user_and_sender_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "directs_user_and_sender_id_key" ON "directs"("user_and_sender_id");
