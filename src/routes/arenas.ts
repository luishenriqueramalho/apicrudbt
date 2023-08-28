import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";
import { z } from "zod";

export async function ArenasRoutes(app: FastifyInstance) {
  app.get("/api/arenas", async (req, reply) => {
    try {
      const arenas = await prisma.arena.findMany({
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      const data = {
        success: true,
        message: null,
        data: arenas,
      };
      return reply.code(200).send(data);
    } catch (error) {
      const data = {
        success: false,
        message: "Erro ao consultar as arenas",
        data: null,
      };
      return reply.code(500).send(data);
    }
  });

  app.post("/api/arenas", async (req, rep) => {
    try {
      const createArenaSchema = z.object({
        nome: z.string(),
        dataAbertura: z.string(),
        qntQuadras: z.string(),
        endereco: z.string(),
        bairro: z.string(),
        cidade: z.string(),
        estado: z.string(),
        status: z.boolean(),
      });
      const {
        nome,
        dataAbertura,
        qntQuadras,
        endereco,
        bairro,
        cidade,
        estado,
        status,
      } = createArenaSchema.parse(req.body);

      await prisma.arena.create({
        data: {
          nome,
          dataAbertura,
          qntQuadras,
          endereco,
          bairro,
          cidade,
          estado,
          status,
        },
      });
      return rep.status(201).send({
        success: true,
        message: "Arena criada com sucesso!",
      });
    } catch (error) {
      const data = {
        success: false,
        message: `Erro ao cadastrar a arena: + ${error}`,
        //erro: error
        data: null,
      };
      return rep.code(500).send(data);
    }
  });

  app.delete("/api/del-arenas/:id", async (req, rep) => {
    try {
      const deleteArenasSchema = z.object({
        id: z.string(),
      });
      const { id } = deleteArenasSchema.parse(req.params);
      const delArena = await prisma.arena.delete({
        where: {
          id: id,
        },
      });
      const data = {
        success: true,
        message: "Arena deletada com sucesso!",
        data: delArena,
      };
      return rep.code(200).send(data);
    } catch (error) {
      const data = {
        success: true,
        message:
          "Não foi possível deletar a arena, tente novamente mais tarde!",
        data: null,
      };
      return rep.code(500).send(data);
    }
  });
}
