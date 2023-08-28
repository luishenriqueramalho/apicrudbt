import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";
import { boolean, string, z } from "zod";

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
        error: error,
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

  app.delete("/api/del-atletas/:id", async (req, rep) => {
    try {
      const deleteAtletasSchema = z.object({
        id: z.string(),
      });
      const { id } = deleteAtletasSchema.parse(req.params);
      const delAtleta = await prisma.atleta.delete({
        where: {
          id: id,
        },
      });
      const data = {
        success: true,
        message: "Atleta deletado com sucesso!",
        data: delAtleta,
      };
      return rep.code(200).send(data);
    } catch (error) {
      const data = {
        success: true,
        message:
          "Não foi possível deletar o atleta, tente novamente mais tarde!",
        data: null,
      };
      return rep.code(500).send(data);
    }
  });
}
