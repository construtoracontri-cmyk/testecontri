import { User } from './entity';
import { CreateUserInput } from './validator';

const users: User[] = [];

export const UsersRepository = {
  async create(input: CreateUserInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      passwordHash: `hash(${input.password})`,
      role: input.role,
      phone: input.phone,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(user);
    return user;
  },
  async list(): Promise<User[]> {
    return users;
  }
};
