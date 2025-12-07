import fp from 'fastify-plugin';
import fastifyJWT from 'fastify-jwt';
import { FastifyInstance } from 'fastify';

export const registerCorePlugins = (app: FastifyInstance) => {
  app.register(
    fp(async (server) => {
      server.register(fastifyJWT, {
        secret: process.env.JWT_SECRET ?? 'development-secret'
      });
    })
  );
};
