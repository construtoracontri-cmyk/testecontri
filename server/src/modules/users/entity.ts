export type UserRole = 'ADMIN' | 'TECNICO' | 'FINANCEIRO' | 'SUPERVISOR';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  phone?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
