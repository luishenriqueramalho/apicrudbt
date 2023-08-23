import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";
import { z } from "zod";

export async function AtletasRoutes(app: FastifyInstance) {
  app.get("/api/atletas", async (req, rep) => {
    try {
      const atletas = await prisma.atleta.findMany({
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      const data = {
        success: true,
        message: null,
        data: atletas,
      };
      return rep.code(200).send(data);
    } catch (error) {
      const data = {
        success: false,
        message: "Erro ao consultar os atletas",
        data: null,
      };
      return rep.code(500).send(data);
    }
  });

  app.post("/api/atletas", async (req, rep) => {
    try {
      const createAtletasSchema = z.object({
        nome: z.string(),
        dataNascimento: z.string(),
        maoDominante: z.string(),
        raquete: z.string(),
        arenaPrimaria: z.string(),
        sexo: z.string(),
      });
      const {
        nome,
        dataNascimento,
        maoDominante,
        raquete,
        arenaPrimaria,
        sexo,
      } = createAtletasSchema.parse(req.body);

      await prisma.atleta.create({
        data: {
          nome,
          dataNascimento,
          maoDominante,
          raquete,
          arenaPrimaria,
          sexo,
        },
      });
      return rep.status(201).send({
        success: true,
        message: "Atleta criado com sucesso!",
      });
    } catch (error) {
      const data = {
        success: false,
        message: `Erro ao cadastrar o atleta: + ${error}`,
        //erro: error
        data: null,
      };
      return rep.code(500).send(data);
    }
  });
}
