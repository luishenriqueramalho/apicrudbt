/*
  Warnings:

  - You are about to drop the column `arena` on the `Atleta` table. All the data in the column will be lost.
  - Added the required column `arenaPrimaria` to the `Atleta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Atleta" DROP COLUMN "arena",
ADD COLUMN     "arenaPrimaria" TEXT NOT NULL;
