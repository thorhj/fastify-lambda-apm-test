import { FastifyInstance, FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (instance: FastifyInstance) => {
  instance.get("/ok", {}, (_, res) => {
    return res.send({ foo: "bar" });
  });

  instance.get("/error", {}, () => {
    throw Error("woops");
  });
};

export default routes;
