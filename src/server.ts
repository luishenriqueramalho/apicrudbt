import fastify from "fastify";
import { ArenasRoutes } from "./routes/arenas";
import { AtletasRoutes } from "./routes/atletas";

const app = fastify();

app.register(ArenasRoutes);
app.register(AtletasRoutes);

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("Servidor ligado com sucesso!");
  });
