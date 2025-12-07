import { UsersRepository } from './repository';
import { CreateUserInput } from './validator';

export const UsersService = {
  async createUser(input: CreateUserInput) {
    return UsersRepository.create(input);
  },
  async listUsers() {
    return UsersRepository.list();
  }
};
