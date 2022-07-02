-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nickname" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashedAt" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
