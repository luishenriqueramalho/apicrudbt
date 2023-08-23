import fastify from "fastify";
import { ArenasRoutes } from "./routes/arenas";

const app = fastify();

app.register(ArenasRoutes);

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("Servidor ligado com sucesso!");
  });

/* import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import z from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get("/atletas", async () => {
  const atletas = await prisma.atleta.findMany();

  return { atletas };
});

app.post("/atletas", async (req, rep) => {
  const createAtletaSchema = z.object({
    nome: z.string(),
  });
  const { nome } = createAtletaSchema.parse(req.body);

  await prisma.atleta.create({
    data: {
      nome,
    },
  });

  return rep.status(201);
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("HTTP server initial running");
  }); */
