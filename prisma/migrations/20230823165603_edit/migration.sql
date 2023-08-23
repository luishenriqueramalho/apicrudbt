/*
  Warnings:

  - You are about to drop the column `arena_id` on the `CatAtleta` table. All the data in the column will be lost.
  - Added the required column `categoriasId` to the `CatAtleta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CatAtleta" DROP CONSTRAINT "CatAtleta_arena_id_fkey";

-- AlterTable
ALTER TABLE "CatAtleta" DROP COLUMN "arena_id",
ADD COLUMN     "categoriasId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CatAtleta" ADD CONSTRAINT "CatAtleta_categoriasId_fkey" FOREIGN KEY ("categoriasId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
