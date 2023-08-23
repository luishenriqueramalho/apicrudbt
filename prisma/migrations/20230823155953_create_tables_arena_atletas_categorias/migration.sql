/*
  Warnings:

  - Added the required column `arena` to the `Atleta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `Atleta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maoDominante` to the `Atleta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raquete` to the `Atleta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Atleta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Atleta" ADD COLUMN     "arena" TEXT NOT NULL,
ADD COLUMN     "dataNascimento" TEXT NOT NULL,
ADD COLUMN     "maoDominante" TEXT NOT NULL,
ADD COLUMN     "raquete" TEXT NOT NULL,
ADD COLUMN     "sexo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Arena" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataAbertura" TEXT NOT NULL,
    "qntQuadras" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Arena_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatAtleta" (
    "id" TEXT NOT NULL,
    "atleta_id" TEXT NOT NULL,
    "arena_id" TEXT NOT NULL,

    CONSTRAINT "CatAtleta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatAtleta" ADD CONSTRAINT "CatAtleta_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "Atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatAtleta" ADD CONSTRAINT "CatAtleta_arena_id_fkey" FOREIGN KEY ("arena_id") REFERENCES "Arena"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
