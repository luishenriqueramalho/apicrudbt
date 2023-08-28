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

  app.put("/api/atletas/:atletaId", async (req, rep) => {
    const bodySchema = z.object({
      id: string(),
      nome: string(),
      dataNascimento: string(),
      maoDominante: string(),
      raquete: string(),
      arenaPrimaria: string(),
      sexo: string(),
    });
    const paramsSchema = z.object({
      atletaId: string(),
    });

    const { atletaId } = paramsSchema.parse(req.params);
    const {
      id,
      nome,
      dataNascimento,
      maoDominante,
      raquete,
      arenaPrimaria,
      sexo,
    } = bodySchema.parse(req.body);

    console.log(atletaId);

    const searchAtleta = await prisma.atleta.findUnique({
      where: {
        id,
      },
    });

    if (!searchAtleta) return rep.status(404).send();

    if (atletaId !== searchAtleta.id) return rep.status(403).send();

    const updateAtleta = await prisma.atleta.update({
      where: {
        id,
      },
      data: {
        nome,
        dataNascimento,
        maoDominante,
        raquete,
        arenaPrimaria,
        sexo,
      },
    });
    return updateAtleta;
  });

  app.delete("/api/atletas/:id", async (req, rep) => {
    try {
      const atletaId = parseInt(req.params.id, 10);

      const existingAtleta = await prisma.atleta.findUnique({
        where: { id: atletaId },
      });

      if (!existingAtleta) {
        return rep.code(404).send({
          success: false,
          message: "Atleta não encontrado.",
        });
      }

      await prisma.atleta.delete({
        where: { id: atletaId },
      });

      return rep.code(200).send({
        success: true,
        message: "Atleta excluído com sucesso!",
      });
    } catch (error) {
      const data = {
        success: false,
        message: `Erro ao excluir o atleta: ${error}`,
        data: null,
      };
      return rep.code(500).send(data);
    }
  });
}
