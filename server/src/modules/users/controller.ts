import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersService } from './service';
import { createUserSchema } from './validator';

export const UsersController = {
  async list(request: FastifyRequest, reply: FastifyReply) {
    const users = await UsersService.listUsers();
    reply.send(users);
  },
  async create(request: FastifyRequest, reply: FastifyReply) {
    const parsed = createUserSchema.parse(request.body);
    const user = await UsersService.createUser(parsed);
    reply.code(201).send(user);
  }
};
