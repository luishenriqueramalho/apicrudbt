-- CreateTable
CREATE TABLE "Atleta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "maoDominante" TEXT NOT NULL,
    "raquete" TEXT NOT NULL,
    "arenaPrimaria" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atleta_pkey" PRIMARY KEY ("id")
);

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
    "categoriasId" TEXT NOT NULL,

    CONSTRAINT "CatAtleta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatAtleta" ADD CONSTRAINT "CatAtleta_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "Atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatAtleta" ADD CONSTRAINT "CatAtleta_categoriasId_fkey" FOREIGN KEY ("categoriasId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
