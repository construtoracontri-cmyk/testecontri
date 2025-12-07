import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'TECNICO', 'FINANCEIRO', 'SUPERVISOR']),
  phone: z.string().optional()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
