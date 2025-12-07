import { FastifyInstance } from 'fastify';
import { UsersController } from './controller';

export const usersRoutes = async (app: FastifyInstance) => {
  app.get('/', UsersController.list);
  app.post('/', UsersController.create);
};
