-- CreateTable
CREATE TABLE "Atleta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atleta_pkey" PRIMARY KEY ("id")
);
