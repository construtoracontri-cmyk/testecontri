import { FastifyInstance } from 'fastify';
import { usersRoutes } from './users/routes';

export const registerModules = (app: FastifyInstance) => {
  app.register(usersRoutes, { prefix: '/users' });
};
