-- CreateEnum
CREATE TYPE "ServerType" AS ENUM ('VDS', 'DEDICATED', 'HOSTING');

-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "serverName" TEXT NOT NULL,
    "serverType" "ServerType" NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);
