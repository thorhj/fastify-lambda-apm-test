import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";

export const build = () => {
  const app: FastifyInstance = Fastify({
    logger: true,
    disableRequestLogging: false,
  });

  void app
    .register(cors, {
      origin: true,
    })
    .register(routes, { prefix: "/api-test" });

  return app;
};
